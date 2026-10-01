"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import type { SelectOption } from "@/types/content";
import { OptionRow, ToolbarDropdown } from "./toolbar-dropdown";

interface ScopeSelectProps {
  name: string;
  options: SelectOption[];
  defaultValue?: string;
}

export function ScopeSelect({ name, options, defaultValue }: ScopeSelectProps) {
  const [value, setValue] = useState(defaultValue ?? options[0].value);
  const input = useRef<HTMLInputElement>(null);
  const id = useId();
  const selected =
    options.find((option) => option.value === value) ?? options[0];
  const isDefault = selected.value === options[0].value;

  const choose = (next: string) => {
    setValue(next);
    const form = input.current?.form;
    const hasQuery = Boolean(
      form?.querySelector<HTMLInputElement>('input[name="q"]')?.value.trim(),
    );
    if (form && hasQuery) requestAnimationFrame(() => form.requestSubmit());
  };

  return (
    <>
      <input
        ref={input}
        type="hidden"
        name={name}
        value={selected.value}
        disabled={isDefault}
      />
      <ToolbarDropdown
        label={selected.label}
        panelLabel="Search in"
        align="right"
        buttonClassName="h-[52px] gap-2 border-0 bg-secondary px-6 text-shuttle-gray-950 hover:bg-secondary-hover focus-visible:outline-secondary sm:text-lg"
        trailing={
          <Image
            src="/images/search/arrow-down.svg"
            alt=""
            width={24}
            height={24}
          />
        }
      >
        {(close) => (
          <fieldset>
            <legend className="sr-only">Search in</legend>
            {options.map((option) => (
              <OptionRow
                key={option.value}
                type="radio"
                name={`${id}-scope`}
                label={option.label}
                checked={option.value === selected.value}
                onChange={() => {
                  choose(option.value);
                  close();
                }}
              />
            ))}
          </fieldset>
        )}
      </ToolbarDropdown>
    </>
  );
}
