import { WalletIcon } from "lucide-react";
import { WalletDisplay } from "../components/wallet";
import { motion } from "motion/react";
import { ThemeTogglerButton } from "../components/animate-ui/components/buttons/theme-toggler";

export function Header() {
  return (
    <header className={"sticky top-0 p-2 flex gap-2 justify-end items-center"}>
      {/* Wallet Button */}

      <motion.button
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        className="h-10 px-4 rounded-sm bg-muted flex gap-2 items-center"
      >
        <WalletIcon size={18} />
        <WalletDisplay />
      </motion.button>
      <ThemeTogglerButton className="bg-muted !text-foreground size-10 h-10 p-2.5 rounded-sm bg-muted flex gap-2 items-center" />
    </header>
  );
}
