"use client";

import { useState } from "react";

interface FollowButtonProps {
  label: string;
  followingLabel: string;
}

// Design-only: following isn't persisted yet
export function FollowButton({ label, followingLabel }: FollowButtonProps) {
  const [following, setFollowing] = useState(false);

  return (
    <button
      type="button"
      aria-pressed={following}
      onClick={() => setFollowing(!following)}
      className="shrink-0 cursor-pointer rounded-[24px] bg-secondary px-6 py-3 text-lg leading-[1.2] font-medium text-mirage-950 transition-colors hover:bg-secondary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      {following ? followingLabel : label}
    </button>
  );
}
