interface TokenIconProps {
  currency: string;
  className?: string;
}

export function TokenIcon({ currency, ...props }: TokenIconProps) {
  return (
    <img
      src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currency}.svg`}
      {...props}
    />
  );
}
