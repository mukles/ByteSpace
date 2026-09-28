import Image from "next/image";

interface SearchBarProps {
  placeholder: string;
  label: string;
}

export function SearchBar({ placeholder, label }: SearchBarProps) {
  return (
    <form
      action="/courses"
      role="search"
      className="flex w-full max-w-[581px] items-center gap-3 sm:gap-4"
    >
      <label className="flex h-[52px] min-w-0 flex-1 items-center gap-2 rounded-[24px] bg-white px-6 focus-within:ring-2 focus-within:ring-secondary">
        <Image src="/images/hero/search.svg" alt="" width={24} height={24} />
        <span className="sr-only">Search courses</span>
        <input
          type="search"
          name="q"
          placeholder={placeholder}
          className="w-full min-w-0 bg-transparent text-base leading-[1.6] text-shuttle-gray-950 outline-none placeholder:text-shuttle-gray-400 sm:text-lg"
        />
      </label>
      <button
        type="submit"
        className="h-[52px] shrink-0 cursor-pointer rounded-[24px] bg-secondary px-6 text-base leading-[1.2] font-medium text-shuttle-gray-950 transition-colors hover:bg-secondary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary sm:text-lg"
      >
        {label}
      </button>
    </form>
  );
}
