import Form from "next/form";
import Image from "next/image";
import { ScopeSelect } from "@/components/search/scope-select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SelectOption } from "@/types/content";

interface SearchBarProps {
  placeholder: string;
  label?: string;
  scopes?: SelectOption[];
  scopeValue?: string;
  defaultValue?: string;
  hiddenFields?: Record<string, string>;
  className?: string;
}

export function SearchBar({
  placeholder,
  label,
  scopes,
  scopeValue,
  defaultValue,
  hiddenFields = {},
  className,
}: SearchBarProps) {
  return (
    <Form
      action="/courses"
      role="search"
      className={cn(
        "relative flex w-full max-w-[581px] items-center gap-3 sm:gap-4",
        className,
      )}
    >
      {Object.entries(hiddenFields).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      <label className="flex h-[52px] min-w-0 flex-1 items-center gap-2 rounded-[24px] bg-white px-6 focus-within:ring-2 focus-within:ring-secondary">
        <Image src="/images/hero/search.svg" alt="" width={24} height={24} />
        <span className="sr-only">Search courses</span>
        <input
          type="search"
          name="q"
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="w-full min-w-0 bg-transparent text-base leading-[1.6] text-shuttle-gray-950 outline-none placeholder:text-shuttle-gray-400 sm:text-lg"
        />
      </label>
      {scopes ? (
        <ScopeSelect name="scope" options={scopes} defaultValue={scopeValue} />
      ) : (
        <Button
          type="submit"
          className="h-[52px] py-0 text-base focus-visible:outline-secondary sm:text-lg"
        >
          {label}
        </Button>
      )}
    </Form>
  );
}
