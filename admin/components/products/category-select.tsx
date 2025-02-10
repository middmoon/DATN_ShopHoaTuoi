"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

type Category = {
  _id: number;
  name: string;
};

const categories: Category[] = [
  { _id: 1, name: "flower" },
  { _id: 2, name: "flower for lover" },
  { _id: 3, name: "gift" },
  // Add more categories as needed
];

type CategorySelectProps = {
  selectedCategories: Category[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};

export function CategorySelect({ selectedCategories, setSelectedCategories }: CategorySelectProps) {
  const [open, setOpen] = React.useState(false);

  const toggleCategory = (category: Category) => {
    setSelectedCategories((current) =>
      current.some((c) => c._id === category._id) ? current.filter((c) => c._id !== category._id) : [...current, category]
    );
  };

  const removeCategory = (categoryId: number) => {
    setSelectedCategories((current) => current.filter((c) => c._id !== categoryId));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {selectedCategories.map((category) => (
          <Badge key={category._id} variant="secondary" className="text-sm">
            {category.name}
            <button
              className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background"
              onClick={() => removeCategory(category._id)}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove {category.name}</span>
            </button>
          </Badge>
        ))}
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            {selectedCategories.length > 0 ? `${selectedCategories.length} danh mục đã chọn` : "Chọn danh mục..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0">
          <Command>
            <CommandInput placeholder="Tìm kiếm danh mục..." />
            <CommandList>
              <CommandEmpty>Không tìm thấy danh mục.</CommandEmpty>
              <CommandGroup>
                {categories.map((category) => (
                  <CommandItem key={category._id} onSelect={() => toggleCategory(category)}>
                    <Check className={cn("mr-2 h-4 w-4", selectedCategories.some((c) => c._id === category._id) ? "opacity-100" : "opacity-0")} />
                    {category.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

// {categories.map((category) => (
//   <CommandItem key={category._id} onSelect={() => toggleCategory(category)}>
//     {/* <Check className={cn("mr-2 h-4 w-4", selectedCategories.some((c) => c._id === category._id) ? "opacity-100" : "opacity-0")} /> */}
//     {category.name}
//   </CommandItem>
// ))}
