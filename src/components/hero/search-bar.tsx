import Form from "next/form";
import Image from "next/image";
import { ScopeSelect } from "@/components/search/scope-select";
import { cn } from "@/lib/utils";
import type { SelectOption } from "@/types/content";

interface SearchBarProps {
  placeholder: string;
  /** Submit button text; unused when `scopes` turns the button into a scope dropdown */
  label?: string;
  /** Renders a "search in" dropdown instead of a submit button (Enter submits) */
  scopes?: SelectOption[];
  scopeValue?: string;
  /** Prefills the input, e.g. with the current query */
  defaultValue?: string;
  /** Other params to carry over, so a new search keeps the active filters */
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
        <button
          type="submit"
          className="flex h-[52px] shrink-0 cursor-pointer items-center gap-2 rounded-[24px] bg-secondary px-6 text-base leading-[1.2] font-medium text-shuttle-gray-950 transition-colors hover:bg-secondary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary sm:text-lg"
        >
          {label}
        </button>
      )}
    </Form>
  );
}
