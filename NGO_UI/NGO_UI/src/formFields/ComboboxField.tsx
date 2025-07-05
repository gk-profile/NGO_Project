import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { CommandLoading } from "cmdk";

interface Props {
    name: string;
    options?: string[];
    label?: string;
    placeholder?: string;
    loading?: boolean;
    className?: string
}

const ComboboxField = ({ name, options, label, placeholder, loading, className }: Props) => {
    const { watch, setValue, formState: { errors } } = useFormContext();
    const value = watch(name);
    const [open, setOpen] = useState(false);
    const selected = options && options.find((opt) => opt === value);

    return (
        <div className={cn("", className)}>
            {label && <div className="flex flex-row">
                <Label htmlFor="combobox" className="text-sm font-semibold">{label}</Label>
                <span className="pl-0.5 text-destructive">*</span>
            </div>
            }
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            "w-full border rounded-md py-2 text-left flex justify-between items-center",
                            !selected && "text-muted-foreground"
                        )}
                    >
                        {selected ? selected : placeholder || "Select"}
                        <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command className="max-h-64 max-w-[196] overflow-y-auto overflow-x-auto ">
                        <CommandInput placeholder="Search..." />
                        <CommandEmpty>No result found</CommandEmpty>
                        {loading ? <CommandLoading>Loading</CommandLoading> :
                            <CommandGroup>
                                {options && options.map((option) => (
                                    <CommandItem
                                        className={option === value ? 'bg-accent' : ''}
                                        key={option}
                                        onSelect={(currentValue) => {
                                            setValue(name, currentValue === selected ? "" : option);
                                            setOpen(false);
                                        }}
                                    >
                                        {option}
                                        {option === value && <Check className="ml-auto h-4 w-4" />}
                                    </CommandItem>
                                ))}
                            </CommandGroup>}
                    </Command>
                </PopoverContent>
            </Popover>

            {errors[name] && <p className="text-destructive text-[12px]">{errors[name].message as string}</p>}
        </div>
    );
};


export default ComboboxField