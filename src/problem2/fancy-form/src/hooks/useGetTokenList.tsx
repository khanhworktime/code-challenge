import { useQuery } from "@tanstack/react-query";
import { getTokenList } from "../api/token.api";

export const QUERY_KEY = "get_token_list";

export function useGetTokenList() {
  const queryReturn = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: getTokenList,
  });

  return { ...queryReturn, QUERY_KEY };
}
