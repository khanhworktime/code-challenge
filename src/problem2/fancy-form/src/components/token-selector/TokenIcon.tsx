import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TokenIconProps {
  currency: string;
  className?: string;
}

export function TokenIcon({ currency, ...props }: TokenIconProps) {
  return (
    <Avatar {...props}>
      <AvatarImage
        src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currency}.svg`}
      />
      <AvatarFallback>?</AvatarFallback>
    </Avatar>
  );
}
