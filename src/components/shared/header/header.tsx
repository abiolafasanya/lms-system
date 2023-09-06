import React from "react";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";

const Header = () => {
  return (
    <div className="md:max-w-6xl flex items-center justify-between pt-5 mx-auto w-full">
      <h3 className="text-xl font-semibold">KodeInspire LMS</h3>
      <div className="flex gap-2 items-center">
      <UserButton afterSignOutUrl="/" />
      <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
