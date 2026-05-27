import {
  MOCK_MAX_BALANCE,
  MOCK_NET_FEE,
  MOCK_PLATFORM_FEE,
  MOCK_SLIPPAGE_PERCENT,
} from "@/constants/mock.const";
import { mutateKeyBuilder } from "@/hooks/useSubmitSwap";
import type { SwapRequire } from "@/types/Swap.interface";
import { calculateRate, calculateReceiveAmount } from "@/utils/swap-calculation";
import { useForm } from "@tanstack/react-form";
import { useIsMutating } from "@tanstack/react-query";
import { ArrowDown, LucideLoaderPinwheel } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useBoolean } from "usehooks-ts";
import { useGetTokenList } from "../../hooks/useGetTokenList";
import { Button } from "../animate-ui/components/buttons/button";
import BorderGlow from "../BorderGlow";
import { TokenSelector } from "../token-selector";
import { SwapAlertModal } from "./swap-alert";

interface SwapFormInputs {
  payToken: string | null;
  payAmount: string | null;
  receiveToken: string | null;
  receiveAmount: number | null;
}

export function SwapForm() {
  // Token List data get
  const { data } = useGetTokenList();

  //   Helper functions
  const getTokenMetadata = (token?: string | null) =>
    data?.find((t) => t.currency === token);

  const form = useForm({
    defaultValues: {
      payToken: null,
      payAmount: "",

      receiveToken: null,
      receiveAmount: 0,
    } as SwapFormInputs,
    onSubmit: async ({ value }) => {
      // Do something with form data
      //   Transform the real swap receive data

      const payTokenMetadata = getTokenMetadata(value.payToken);
      const receiveTokenMetadata = getTokenMetadata(value.receiveToken);
      const rate = calculateRate(
        payTokenMetadata?.price,
        receiveTokenMetadata?.price,
      );

      if (!value.payToken || !value.receiveToken) return;
      const final: SwapRequire = {
        payToken: value.payToken,
        payAmount: Number(value.payAmount) || 0,

        receiveToken: value.receiveToken,
        receiveAmount: calculateReceiveAmount(Number(value.payAmount), rate),

        rate,
      };

      if (final.payToken && final.receiveToken) {
        setSwapData(final);
        alertDisclosue.setTrue();
      }
    },
  });

  //   Alert control
  const alertDisclosue = useBoolean(false);
  const [swapData, setSwapData] = useState<SwapRequire>();
  const isSwapping =
    useIsMutating({
      mutationKey: mutateKeyBuilder([
        swapData?.payToken || "",
        swapData?.receiveToken || "",
      ]),
      exact: true,
    }) > 0;

  // Action control
  const setMax = () => {
    form.setFieldValue("payAmount", MOCK_MAX_BALANCE.toString());
  };

  const switchDirection = () => {
    const payToken = form.getFieldValue("payToken");
    const receiveToken = form.getFieldValue("receiveToken");

    form.reset();

    form.setFieldValue("payToken", receiveToken);
    form.setFieldValue("receiveToken", payToken);
  };

  return (
    <form
      className="w-full flex flex-col"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <BorderGlow
        edgeSensitivity={30}
        glowColor="40 80 80"
        borderRadius={12}
        glowRadius={40}
        glowIntensity={1}
        coneSpread={25}
        animated={true}
        colors={["#c084fc", "#f472b6", "#38bdf8"]}
        className="outline outline-muted"
      >
        <div className="overflow-hidden rounded-[13px]">
          {/* Pay */}
          <div className="w-full py-4 pl-4 pr-2 bg-card text-card-foreground space-y-4">
            <h2 className="text-xs text-muted-foreground">You pay</h2>

            <div className="flex gap-2 items-center justify-between">
              <form.Field
                name={"payAmount"}
                validators={{
                  onChange: ({ value }) =>
                    !Number(value)
                      ? "Token amount must greater than 0"
                      : undefined,
                  onChangeAsyncDebounceMs: 500,
                }}
              >
                {(field) => (
                  <div className="flex flex-col w-2/3">
                    <input
                      name={field.name}
                      placeholder="1.82"
                      className="text-3xl"
                      value={field.state.value?.replaceAll(",", ".") || ""}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(e.target.value.replaceAll(",", ""))
                      }
                      type="number"
                      inputMode="decimal"
                      pattern="[0-9.]*"
                    />
                    <>
                      {field.state.meta.isTouched &&
                      !field.state.meta.isValid ? (
                        <motion.span
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-xs text-red-600"
                        >
                          {field.state.meta.errors.join(",")}
                        </motion.span>
                      ) : null}
                    </>
                  </div>
                )}
              </form.Field>
              <form.Field
                name={"payToken"}
                validators={{
                  onChange: ({ value }) =>
                    !value ? "Missing pay token" : undefined,
                  onChangeAsyncDebounceMs: 500,
                }}
              >
                {(field) => (
                  <TokenSelector
                    name={field.name}
                    value={field.state.value ?? ""}
                    onChange={(value: string) => {
                      field.handleChange(value);
                    }}
                    isError={!field.getMeta().isValid}
                    excluded={form.state.values.receiveToken}
                  />
                )}
              </form.Field>
            </div>
            <div className="flex gap-2 items-center justify-between">
              <span className="text-sm text-muted-foreground font-display">
                <form.Subscribe>
                  {({ values: { payToken } }) => {
                    const payTokenMetadata = getTokenMetadata(payToken);

                    return <>${payTokenMetadata?.price}</>;
                  }}
                </form.Subscribe>
              </span>
              <div className="text-sm pr-2 text-muted-foreground flex gap-1 font-display">
                Bal: {MOCK_MAX_BALANCE}
                <button
                  type="button"
                  className="text-foreground underline"
                  onClick={setMax}
                >
                  Max
                </button>
              </div>
            </div>
          </div>

          {/* Seperator */}
          <div className="relative">
            <hr className="text-border" />
            <motion.button
              type="button"
              onClick={switchDirection}
              className="group absolute z-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background/75 p-2 rounded-sm"
            >
              <div className="group-hover:rotate-180 transition-all">
                <ArrowDown />
              </div>
            </motion.button>
          </div>

          {/* Receive */}

          <div className="w-full py-4 pl-4 pr-2 bg-card text-card-foreground space-y-4">
            <h2 className="text-xs text-muted-foreground">You receive</h2>
            <div className="flex gap-2 items-center justify-between">
              <form.Subscribe>
                {({ values: { payToken, payAmount, receiveToken } }) => {
                  const payTokenMetadata = getTokenMetadata(payToken);
                  const receiveTokenMetadata = getTokenMetadata(receiveToken);
                  const rate = calculateRate(
                    payTokenMetadata?.price,
                    receiveTokenMetadata?.price,
                  );
                  return (
                    <input
                      name={"receiveToken"}
                      placeholder="0.0"
                      className="text-3xl w-2/3"
                      value={calculateReceiveAmount(Number(payAmount), rate)}
                      disabled
                    />
                  );
                }}
              </form.Subscribe>
              <form.Field
                name={"receiveToken"}
                validators={{
                  onChange: ({ value }) =>
                    !value ? "Missing receive token" : undefined,
                  onChangeAsyncDebounceMs: 500,
                }}
              >
                {(field) => (
                  <TokenSelector
                    name={field.name}
                    value={field.state.value ?? ""}
                    onChange={(value: string) => {
                      field.handleChange(value);
                    }}
                    excluded={form.state.values.payToken}
                    isError={!field.getMeta().isValid}
                  />
                )}
              </form.Field>
            </div>
            <div className="flex gap-2 items-center justify-between">
              <span className="text-sm text-muted-foreground font-display">
                <form.Subscribe>
                  {({ values: { receiveToken } }) => {
                    const receiveTokenMetadata = getTokenMetadata(receiveToken);

                    return <>${receiveTokenMetadata?.price}</>;
                  }}
                </form.Subscribe>
              </span>
              <div className="text-sm pr-2 text-muted-foreground flex gap-1 font-display">
                <form.Subscribe>
                  {({ values: { receiveToken } }) => {
                    const receiveTokenMetadata = getTokenMetadata(receiveToken);
                    if (!receiveTokenMetadata) return null;
                    return <>Bal: {10}</>;
                  }}
                </form.Subscribe>
              </div>
            </div>
          </div>
        </div>
      </BorderGlow>
      {/* Caption */}
      <div className="py-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground text-sm">Rate</span>
          <form.Subscribe>
            {({ values: { payToken, receiveToken } }) => {
              const payTokenMetadata = getTokenMetadata(payToken);
              const receiveTokenMetadata = getTokenMetadata(receiveToken);
              const rate = calculateRate(
                payTokenMetadata?.price,
                receiveTokenMetadata?.price,
              );

              if (rate === 0) return "-";

              return (
                <span className="font-display text-white">
                  {" "}
                  1 {payTokenMetadata?.currency} = {rate}{" "}
                  {receiveTokenMetadata?.currency}
                </span>
              );
            }}
          </form.Subscribe>
        </div>
        <div className="flex justify-between mb-3">
          <span className="text-muted-foreground text-sm">Max slippage</span>
          <span className="text-sm font-display text-white">
            {MOCK_SLIPPAGE_PERCENT ? `${MOCK_SLIPPAGE_PERCENT} %` : "Free"}
          </span>
        </div>
        <div className="flex justify-between mb-3">
          <span className="text-muted-foreground text-sm">Network fee</span>
          <span className="text-sm font-display text-white">
            {MOCK_NET_FEE ? `$${MOCK_NET_FEE}` : "Free"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground text-sm">Platform fee</span>
          <span className="text-sm font-display text-white">
            {MOCK_PLATFORM_FEE ? `$${MOCK_PLATFORM_FEE}` : "Free"}
          </span>
        </div>
      </div>
      {/* Actions */}
      <Button
        type="submit"
        className="h-12 font-display bg-primary-500 text-white rounded-sm"
        disabled={isSwapping}
      >
        {!isSwapping ? "REVIEW" : "SWAPPING"}
        {isSwapping && <LucideLoaderPinwheel className="animate-spin" />}
      </Button>
      {/* Alert Dialog */}

      {swapData && (
        <SwapAlertModal data={swapData} disclosure={alertDisclosue} />
      )}
    </form>
  );
}
