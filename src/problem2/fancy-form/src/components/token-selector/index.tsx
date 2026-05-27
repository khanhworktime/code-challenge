import { cn } from "@/lib/utils";
import { useGetTokenList } from "../../hooks/useGetTokenList";
import type { Token } from "../../types/Token.interface";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/selector";
import { TokenIcon } from "./TokenIcon";

interface TokenSelectorProps {
  name: string;
  value: Token["currency"];
  onChange: (value: Token["currency"]) => void;
  excluded?: Token["currency"] | null;
  isError?: boolean;
}

export function TokenSelector({
  name,
  value,
  onChange,
  excluded,
  isError = false,
}: TokenSelectorProps) {
  const { data, isPending } = useGetTokenList();

  if (isPending) {
    return null;
  }

  //  Filter and remove the duplicate
  const displayList = data
    ?.filter((d) => d.currency !== excluded)
    .filter(
      (val, index, arr) =>
        arr.findIndex((v) => v.currency === val.currency) === index,
    );

  return (
    <Select
      value={value}
      onValueChange={(value) => onChange(value as Token["currency"])}
    >
      <SelectTrigger
        className={cn(
          "grow text-xl font-medium !h-10 transition-colors",
          isError ? "!bg-orange-900" : "bg-unset",
        )}
      >
        {value && <TokenIcon currency={value} />}
        <SelectValue placeholder="-" />
      </SelectTrigger>
      <SelectContent>
        {displayList?.map((item) => (
          <SelectItem
            key={`${name}_${item.currency}`}
            value={item.currency}
            className={"h-8"}
          >
            {item.currency}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
