import { useQuery } from "@tanstack/react-query";
import { sleep } from "../utils/sleep";
import type { Wallet } from "../types/Wallet.interface";

export const QUERY_KEY = "get_wallet";

// Sleeping for 2 seconds
export const mockPending = 2_000;

export function useGetWallet() {
  const queryReturn = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: async (): Promise<Wallet> => {
      await sleep(mockPending);
      return {
        balance: 12_000_123,
        isConnected: true,
      };
    },
    initialData: {
      balance: 0,
      isConnected: false,
    },
  });

  return { ...queryReturn, QUERY_KEY };
}
