import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import type React from "react";

export type SearchSelectOption = {
  value: number;
  label: string;
  subLabel?: string;
};

type SearchSelectProps = {
  value?: number;
  options: SearchSelectOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  onChange: (value: number) => void;
  className?: string;
};

export function SearchSelect({
  value,
  options,
  placeholder = "Select option",
  searchPlaceholder = "Search...",
  onChange,
  className,
}: SearchSelectProps) {
  const selected = options.find((o) => o.value === value);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-full justify-between",
            !value && "text-muted-foreground",
            className!
          )}
        >
          {selected ? (
            <div className="flex flex-col items-start text-left">
              <span className="font-medium">{selected.label}</span>
              {selected.subLabel && (
                <span className="text-xs text-muted-foreground">
                  {selected.subLabel}
                </span>
              )}
            </div>
          ) : (
            placeholder
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 w-[--radix-popover-trigger-width]">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={`${option.label} ${option.subLabel ?? ""}`}
                onSelect={() => onChange(option.value)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    option.value === value ? "opacity-100" : "opacity-0"
                  )}
                />
                <div className="flex flex-col">
                  <span>{option.label}</span>
                  {option.subLabel && (
                    <span className="text-xs text-muted-foreground">
                      {option.subLabel}
                    </span>
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
