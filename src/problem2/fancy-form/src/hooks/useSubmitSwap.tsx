import { MOCK_MAX_BALANCE } from "@/constants/mock.const";
import type { SwapRequire } from "@/types/Swap.interface";
import { sleep } from "@/utils/sleep";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const MUTATE_KEY_BASE = "submit_swap";
export const mutateKeyBuilder = (tokens: string[]) => [
  MUTATE_KEY_BASE,
  ...tokens,
];

interface SubmitSwapProps {
  tokens: string[];
}

export function useSubmitSwap({ tokens }: SubmitSwapProps) {
  const MUTATE_KEY = mutateKeyBuilder(tokens);
  const mutateReturn = useMutation({
    mutationKey: MUTATE_KEY,
    // Set payload with tokens to swap to notify the result
    mutationFn: async (payload: SwapRequire) => {
      await sleep(1000);
      //   Warning just demo for the failed situations
      if (payload.payAmount > MOCK_MAX_BALANCE)
        throw Error("Insufficient funds");

      return payload;
    },
    onSuccess: (data) => {
      toast.success("Successfully swapped", {
        description: `From ${data.payToken} ${data.payAmount} to ${data.receiveToken} ${data.receiveAmount}`,
      });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { ...mutateReturn, MUTATE_KEY };
}
