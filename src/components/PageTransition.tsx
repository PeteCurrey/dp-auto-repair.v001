"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionState, setTransitionState] = useState<"enter" | "exit">("enter");

  useEffect(() => {
    if (children !== displayChildren) {
      setTransitionState("exit");
      const timeout = setTimeout(() => {
        setDisplayChildren(children);
        setTransitionState("enter");
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [children, pathname]);

  return (
    <div
      className={`transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        transitionState === "enter"
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2"
      }`}
    >
      {displayChildren}
    </div>
  );
};

export default PageTransition;
