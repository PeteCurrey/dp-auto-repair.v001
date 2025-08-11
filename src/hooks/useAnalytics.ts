
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageview } from "@/lib/analytics";

/**
 * Automatically logs a pageview on route changes.
 * Safe to call with undefined profileId (it will be stored as null).
 */
export const useAnalytics = (profileId?: string | null) => {
  const location = useLocation();

  useEffect(() => {
    console.log("[Analytics] Tracking pageview for", location.pathname);
    trackPageview({ profileId: profileId ?? null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
};
