import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackPageview } from "@/lib/analytics";

/**
 * Automatically logs a pageview on route changes.
 * Safe to call with undefined profileId (it will be stored as null).
 */
export const useAnalytics = (profileId?: string | null) => {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      console.log("[Analytics] Tracking pageview for", pathname);
      trackPageview({ profileId: profileId ?? null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, profileId]);
};

