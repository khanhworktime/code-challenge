import { useQuery } from "@tanstack/react-query";
import { sleep } from "../utils/sleep";
import type { Wallet } from "../types/Wallet.interface";

export const QUERY_KEY = "get_wallet";

// Sleeping for 2 seconds
export const MOCK_PENDING = 2_000;
const MOCK_BALANCE = 12_523;

export function useGetWallet() {
  const queryReturn = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: async (): Promise<Wallet> => {
      await sleep(MOCK_PENDING);
      return {
        balance: MOCK_BALANCE,
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
