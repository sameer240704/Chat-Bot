import React from "react";
import { LuLoader } from "react-icons/lu";

export default function Loading() {
  return (
    <div className="h-screen bg-[#E6E2FE] flex flex-col items-center justify-center gap-10">
      <LuLoader className="h-48 w-48 animate-spin text-[#8776f3]" />
      <div className="text-xl font-bold">
        Sit tight as we load your avatars. Almost there!
      </div>
    </div>
  );
}
