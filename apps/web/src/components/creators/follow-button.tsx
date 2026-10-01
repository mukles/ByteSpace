"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface FollowButtonProps {
  label: string;
  followingLabel: string;
}

export function FollowButton({ label, followingLabel }: FollowButtonProps) {
  const [following, setFollowing] = useState(false);

  return (
    <Button
      aria-pressed={following}
      onClick={() => setFollowing(!following)}
      className="focus-visible:outline-white"
    >
      {following ? followingLabel : label}
    </Button>
  );
}
