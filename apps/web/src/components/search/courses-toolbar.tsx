"use client";

import Image from "next/image";
import { useId, type ReactNode } from "react";
import type { CoursesPageData } from "@/types/content";
import {
  OptionRow,
  PanelFooter,
  PanelHeading,
  ToolbarDropdown,
} from "./toolbar-dropdown";
import { useCourseSearch } from "./search-state";

type CoursesToolbarProps = Pick<
  CoursesPageData,
  | "filterLabel"
  | "price"
  | "rating"
  | "level"
  | "categoryLabel"
  | "allCategoriesLabel"
  | "sortOptions"
  | "clearLabel"
> & {
  categories: string[];
  icons?: Partial<Record<"filter" | "level" | "category" | "sort", string>>;
  buttonClassName?: string;
};

function withIcon(label: ReactNode, icon?: string) {
  if (!icon) return label;
  return (
    <>
      <Image src={icon} alt="" width={24} height={24} />
      {label}
    </>
  );
}

const clearClass =
  "cursor-pointer text-sm leading-[1.2] font-medium text-primary hover:underline disabled:cursor-default disabled:text-shuttle-gray-300 disabled:no-underline";

export function CoursesToolbar({
  filterLabel,
  price,
  rating,
  level,
  categoryLabel,
  allCategoriesLabel,
  sortOptions,
  clearLabel,
  categories,
  icons = {},
  buttonClassName,
}: CoursesToolbarProps) {
  const { query, update } = useCourseSearch();
  const id = useId();

  const rating_ = query.minRating === null ? "" : String(query.minRating);
  const filterCount = Number(Boolean(query.price)) + Number(Boolean(rating_));
  const [defaultSort] = sortOptions;
  const sortLabel =
    sortOptions.find((option) => option.value === query.sort)?.label ??
    defaultSort.label;

  const toggleLevel = (value: string) => {
    const levels = query.levels.includes(value)
      ? query.levels.filter((l) => l !== value)
      : [...query.levels, value];
    const ordered = level.options
      .map((option) => option.value)
      .filter((v) => levels.includes(v));
    update({ level: ordered.join(",") || null });
  };

  return (
    <div className="relative flex flex-wrap items-center justify-between gap-4">
      <div
        role="group"
        aria-label="Filter courses"
        className="flex flex-wrap gap-4"
      >
        <ToolbarDropdown
          label={withIcon(filterLabel, icons.filter)}
          panelLabel={filterLabel}
          buttonClassName={buttonClassName}
          count={filterCount}
        >
          {() => (
            <>
              <fieldset>
                <PanelHeading>{price.heading}</PanelHeading>
                {[{ value: "", label: price.anyLabel }, ...price.options].map(
                  (option) => (
                    <OptionRow
                      key={option.value || "any"}
                      type="radio"
                      name={`${id}-price`}
                      label={option.label}
                      checked={(query.price ?? "") === option.value}
                      onChange={() => update({ price: option.value || null })}
                    />
                  ),
                )}
              </fieldset>
              <fieldset className="mt-2">
                <PanelHeading>{rating.heading}</PanelHeading>
                {[{ value: "", label: rating.anyLabel }, ...rating.options].map(
                  (option) => (
                    <OptionRow
                      key={option.value || "any"}
                      type="radio"
                      name={`${id}-rating`}
                      label={option.label}
                      checked={
                        option.value === ""
                          ? rating_ === ""
                          : Number(option.value) === query.minRating
                      }
                      onChange={() => update({ rating: option.value || null })}
                    />
                  ),
                )}
              </fieldset>
              <PanelFooter>
                <button
                  type="button"
                  disabled={filterCount === 0}
                  onClick={() => update({ price: null, rating: null })}
                  className={clearClass}
                >
                  {clearLabel}
                </button>
              </PanelFooter>
            </>
          )}
        </ToolbarDropdown>

        <ToolbarDropdown
          label={withIcon(level.label, icons.level)}
          panelLabel={level.label}
          buttonClassName={buttonClassName}
          count={query.levels.length}
        >
          {() => (
            <>
              <fieldset>
                <legend className="sr-only">{level.label}</legend>
                {level.options.map((option) => (
                  <OptionRow
                    key={option.value}
                    type="checkbox"
                    name={`${id}-level`}
                    label={option.label}
                    checked={query.levels.includes(option.value)}
                    onChange={() => toggleLevel(option.value)}
                  />
                ))}
              </fieldset>
              <PanelFooter>
                <button
                  type="button"
                  disabled={query.levels.length === 0}
                  onClick={() => update({ level: null })}
                  className={clearClass}
                >
                  {clearLabel}
                </button>
              </PanelFooter>
            </>
          )}
        </ToolbarDropdown>

        <ToolbarDropdown
          label={withIcon(
            query.category ? (
              <>
                <span className="sr-only">{categoryLabel}: </span>
                <span className="max-w-60 truncate">{query.category}</span>
              </>
            ) : (
              categoryLabel
            ),
            icons.category,
          )}
          panelLabel={categoryLabel}
          buttonClassName={buttonClassName}
          active={Boolean(query.category)}
        >
          {(close) => (
            <fieldset className="max-h-80 overflow-y-auto">
              <legend className="sr-only">{categoryLabel}</legend>
              {[allCategoriesLabel, ...categories].map((category, i) => (
                <OptionRow
                  key={category}
                  type="radio"
                  name={`${id}-category`}
                  label={category}
                  checked={
                    i === 0 ? !query.category : query.category === category
                  }
                  onChange={() => {
                    update({ category: i === 0 ? null : category });
                    close();
                  }}
                />
              ))}
            </fieldset>
          )}
        </ToolbarDropdown>
      </div>

      <ToolbarDropdown
        label={withIcon(sortLabel, icons.sort)}
        panelLabel="Sort courses"
        align="right"
        buttonClassName={buttonClassName}
        trailing={
          !icons.sort && (
            <Image
              src="/images/search/arrow-down.svg"
              alt=""
              width={20}
              height={20}
            />
          )
        }
      >
        {(close) => (
          <fieldset>
            <legend className="sr-only">Sort by</legend>
            {sortOptions.map((option) => (
              <OptionRow
                key={option.value}
                type="radio"
                name={`${id}-sort`}
                label={option.label}
                checked={query.sort === option.value}
                onChange={() => {
                  update({
                    sort:
                      option.value === defaultSort.value ? null : option.value,
                  });
                  close();
                }}
              />
            ))}
          </fieldset>
        )}
      </ToolbarDropdown>
    </div>
  );
}
