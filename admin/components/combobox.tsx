"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export type ComboboxItem = {
  value: string;
  label: string;
};

interface ComboboxProps {
  items: ComboboxItem[];
  selectedItems: string[];
  onSelectedItemsChange: (selectedItems: string[]) => void;
  placeholder?: string;
  multiple?: boolean;
}

export function Combobox({ items, selectedItems, onSelectedItemsChange, placeholder = "Select item", multiple = false }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (currentValue: string) => {
    if (multiple) {
      onSelectedItemsChange(
        selectedItems.includes(currentValue) ? selectedItems.filter((item) => item !== currentValue) : [...selectedItems, currentValue]
      );
    } else {
      onSelectedItemsChange([currentValue]);
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {selectedItems.length > 0 ? `${selectedItems.length} selected` : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem key={item.value} value={item.value} onSelect={() => handleSelect(item.value)}>
                  <Check className={cn("mr-2 h-4 w-4", selectedItems.includes(item.value) ? "opacity-100" : "opacity-0")} />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
