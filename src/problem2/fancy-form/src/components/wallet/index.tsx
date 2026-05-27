import { useGetWallet } from "../../hooks/useGetWallet";
import { motion } from "motion/react";
export function WalletDisplay() {
  const { data, isFetching, refetch } = useGetWallet();

  if (isFetching) {
    return (
      <motion.div
        exit={{ opacity: 0 }}
        className="w-22 h-6 rounded-xs bg-white/20 animate-pulse"
      />
    );
  }

  if (!data.isConnected) {
    return <span>Connect</span>;
  }

  return (
    <span
      className="flex gap-1 items-center font-display"
      onClick={() => refetch()}
    >
      ${data.balance.toLocaleString()}
    </span>
  );
}
