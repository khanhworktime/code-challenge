interface WalletBalance {
  currency: string;
  amount: number;
  //   Assume a blockchain props that for the name of the chain
  blockchain: string;
}
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}
enum EPriority {
  HIGH = 100,
  MED_HIGH = 75,
  MEDIUM = 50,
  MED_LOW = 20,
  LOW = 0,
  DEFAULT = -99,
}

const getPriority = (blockchain: string): number => {
  switch (blockchain) {
    case "Osmosis":
      return EPriority.HIGH;
    case "Ethereum":
      return EPriority.MED_HIGH;
    case "Arbitrum":
      return EPriority.MEDIUM;
    case "Zilliqa":
      return EPriority.MED_LOW;
    case "Neo":
      return EPriority.MED_LOW;
    default:
      return EPriority.DEFAULT;
  }
};

// Transformation logic: Raw -> Filter -> Sort -> Add format amount
const transformBalance = (
  rawBalances: WalletBalance[],
): FormattedWalletBalance[] => {
  const filteredBalance = rawBalances.filter((balance: WalletBalance) => {
    const balancePriority = getPriority(balance.blockchain);
    if (balancePriority <= EPriority.DEFAULT || balance.amount <= 0)
      return false;
    return true;
  });
  const sortedBalance = filteredBalance.sort(
    (lhs: WalletBalance, rhs: WalletBalance) => {
      const leftPriority = getPriority(lhs.blockchain);
      const rightPriority = getPriority(rhs.blockchain);
      if (leftPriority > rightPriority) return -1;
      return 1;
    },
  );
  const formattedBalance = sortedBalance.map((balance: WalletBalance) => ({
    ...balance,
    formatted: balance.amount.toFixed(),
  }));

  return formattedBalance;
};

type Props = Omit<BoxProps, "children">;

const WalletPage: React.FC<Props> = (props: Props) => {
  // Data hooks
  const balances: WalletBalance[] = useWalletBalance();
  const prices = usePrices();

  // Data transforms
  const balancesJsonify = JSON.stringify(
    balances.map((balance) => balance.blockchain),
  );

  const displayBalance: FormattedWalletBalance[] = useMemo(() => {
    return transformBalance(balances);
  }, [balancesJsonify]);

  const rows = useMemo(
    displayBalance.map((balance: FormattedWalletBalance) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={`${balance.blockchain}`}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }),
    [balancesJsonify],
  );

  return <div {...props}>{rows}</div>;
};

export default WalletPage;
