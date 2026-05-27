import { useSubmitSwap } from "@/hooks/useSubmitSwap";
import type { SwapRequire } from "@/types/Swap.interface";
import { formatWithTilde } from "@/utils/rouding-display";
import { ArrowDown } from "lucide-react";
import { motion } from "motion/react";
import { useBoolean } from "usehooks-ts";
import {
  Tooltip,
  TooltipPanel,
  TooltipTrigger,
} from "../animate-ui/components/base/tooltip";
import { Button } from "../animate-ui/components/buttons/button";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogClose,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogPortal,
  AlertDialogTitle,
} from "../animate-ui/primitives/base/alert-dialog";
import { TooltipProvider } from "../animate-ui/primitives/base/tooltip";
import { TokenIcon } from "../token-selector/TokenIcon";
import {
  MOCK_NET_FEE,
  MOCK_PLATFORM_FEE,
  MOCK_SLIPPAGE_PERCENT,
} from "@/constants/mock.const";

interface SwapAlertModalProps {
  data: SwapRequire;
  disclosure: ReturnType<typeof useBoolean>;
}

export function SwapAlertModal({ data, disclosure }: SwapAlertModalProps) {
  const { mutateAsync, isPending } = useSubmitSwap({
    tokens: [data.payToken, data.receiveToken],
  });

  return (
    <AlertDialog open={disclosure.value} onOpenChange={disclosure.setValue}>
      <AlertDialogPortal>
        <AlertDialogBackdrop />
        <AlertDialogPopup>
          <AlertDialogHeader>
            <AlertDialogTitle>You are swapping</AlertDialogTitle>
          </AlertDialogHeader>
          {/* Receipt content */}
          <div className="space-y-2">
            {/* Swap from */}
            <TooltipProvider>
              <div className="flex flex-col justify-between items-center w-full">
                <Tooltip followCursor={"y"}>
                  <TooltipTrigger
                    render={
                      <div className="flex w-full gap-3 items-center">
                        <TokenIcon
                          className="size-14"
                          currency={data.payToken}
                        />
                        <div className="grow">
                          <p className="font-display text-right text-4xl">
                            {formatWithTilde(data.payAmount)}
                          </p>
                          <p className="text-xl text-right text-muted-foreground">
                            {data.payToken}
                          </p>
                        </div>
                      </div>
                    }
                  />
                  <TooltipPanel side={"top"} sideOffset={2}>
                    <p>
                      {data.payAmount} {data.payToken}
                    </p>
                  </TooltipPanel>
                </Tooltip>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4"
                >
                  <ArrowDown />
                </motion.div>
                <Tooltip followCursor={"y"}>
                  <TooltipTrigger
                    render={
                      <div className="flex w-full gap-3 items-center">
                        <TokenIcon
                          className="size-14"
                          currency={data.receiveToken}
                        />
                        <div className="grow">
                          <p className="font-display text-right text-4xl">
                            {formatWithTilde(data.receiveAmount)}
                          </p>
                          <p className="text-xl text-right text-muted-foreground">
                            {data.receiveToken}
                          </p>
                        </div>
                      </div>
                    }
                  />
                  <TooltipPanel side={"top"} sideOffset={2}>
                    <p>
                      {data.receiveAmount} {data.receiveToken}
                    </p>
                  </TooltipPanel>
                </Tooltip>
              </div>
            </TooltipProvider>

            <div className="space-y-1">
              <div className="py-4 space-y-4">
                <div className="flex justify-between items-center">
                  {" "}
                  <span className="text-muted-foreground text-sm">Rate</span>
                  <span className="font-display">
                    {" "}
                    1 {data?.payToken} = {data?.rate} {data?.receiveToken}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">
                    Max slippage
                  </span>
                  <span className="text-sm font-display">
                    {MOCK_SLIPPAGE_PERCENT
                      ? `${MOCK_SLIPPAGE_PERCENT} %`
                      : "Free"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">
                    Network fee
                  </span>
                  <span className="text-sm font-display">
                    {MOCK_NET_FEE ? `$${MOCK_NET_FEE}` : "Free"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">
                    Platform fee
                  </span>
                  <span className="text-sm font-display">
                    {MOCK_PLATFORM_FEE ? `$${MOCK_PLATFORM_FEE}` : "Free"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogClose
              render={
                <Button type="button" variant="outline" className=" h-12">
                  Cancel
                </Button>
              }
            />
            <Button
              type="button"
              disabled={isPending}
              onClick={() => {
                mutateAsync(data);
                disclosure.setFalse();
              }}
              className="grow h-12 bg-primary-700 text-white font-semibold font-display"
            >
              SWAP
            </Button>
          </AlertDialogFooter>
        </AlertDialogPopup>
      </AlertDialogPortal>
    </AlertDialog>
  );
}
