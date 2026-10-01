"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const toolbarButtonClass =
  "flex min-h-12 shrink-0 cursor-pointer items-center gap-1 rounded-[24px] border border-shuttle-gray-200 bg-white px-4 py-3 text-base leading-[1.2] font-medium whitespace-nowrap text-shuttle-gray-950 transition-colors hover:bg-shuttle-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

interface ToolbarDropdownProps {
  label: ReactNode;
  panelLabel: string;
  count?: number;
  active?: boolean;
  align?: "left" | "right";
  buttonClassName?: string;
  trailing?: ReactNode;
  children: (close: () => void) => ReactNode;
}

export function ToolbarDropdown({
  label,
  panelLabel,
  count = 0,
  active = count > 0,
  align = "left",
  buttonClassName,
  trailing,
  children,
}: ToolbarDropdownProps) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const id = useId();
  const panelId = `${id}-panel`;
  const buttonId = `${id}-button`;

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    document.getElementById(buttonId)?.focus();
  };

  return (
    <div ref={root} className="sm:relative">
      <button
        ref={button}
        id={buttonId}
        type="button"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen(!open)}
        className={cn(
          toolbarButtonClass,
          active && "border-primary bg-primary/5 hover:bg-primary/10",
          buttonClassName,
        )}
      >
        {label}
        {count > 0 && (
          <span className="ml-1 grid size-5 place-items-center rounded-full bg-secondary text-xs leading-none text-shuttle-gray-950">
            {count}
            <span className="sr-only"> selected</span>
          </span>
        )}
        {trailing}
      </button>

      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label={panelLabel}
          className={cn(
            "absolute inset-x-0 top-full z-30 mt-2 rounded-2xl border border-shuttle-gray-200 bg-white p-2 text-left shadow-card",
            "sm:inset-x-auto sm:w-72",
            align === "right" ? "sm:right-0" : "sm:left-0",
          )}
        >
          {children(close)}
        </div>
      )}
    </div>
  );
}

interface OptionRowProps {
  type: "radio" | "checkbox";
  name: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}

export function OptionRow({
  type,
  name,
  label,
  checked,
  onChange,
}: OptionRowProps) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-base leading-[1.2] text-shuttle-gray-950 hover:bg-shuttle-gray-50 has-focus-visible:outline-2 has-focus-visible:outline-primary">
      <input
        type={type}
        name={name}
        checked={checked}
        onChange={onChange}
        className="size-4 shrink-0 cursor-pointer accent-primary focus-visible:outline-none"
      />
      {label}
    </label>
  );
}

export function PanelHeading({ children }: { children: ReactNode }) {
  return (
    <legend className="px-3 pt-2 pb-1 text-sm leading-[1.2] font-medium text-shuttle-gray-400">
      {children}
    </legend>
  );
}

export function PanelFooter({ children }: { children: ReactNode }) {
  return (
    <div className="mt-1 flex justify-end border-t border-shuttle-gray-100 px-3 pt-2 pb-1">
      {children}
    </div>
  );
}
