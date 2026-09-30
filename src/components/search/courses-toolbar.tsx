"use client";

import Image from "next/image";
import { useId } from "react";
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
};

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
    // Keep the URL in the same order as the options
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
          label={filterLabel}
          panelLabel={filterLabel}
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
          label={level.label}
          panelLabel={level.label}
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
          label={categoryLabel}
          panelLabel={categoryLabel}
          count={query.category ? 1 : 0}
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
        label={sortLabel}
        panelLabel="Sort courses"
        align="right"
        trailing={
          <Image
            src="/images/search/arrow-down.svg"
            alt=""
            width={20}
            height={20}
          />
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
                  // The default sort stays out of the URL
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
