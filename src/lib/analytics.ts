
import { supabase } from "@/integrations/supabase/client";

type LogEventOptions = {
  profileId?: string | null;
};

export const getSessionId = (): string => {
  const key = "analytics_session_id";
  let sid = localStorage.getItem(key);
  if (!sid) {
    sid = (typeof crypto !== "undefined" && "randomUUID" in crypto)
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(key, sid);
  }
  return sid;
};

export const parseUtm = (search: string) => {
  const params = new URLSearchParams(search || "");
  return {
    utm_source: params.get("utm_source") || undefined,
    utm_medium: params.get("utm_medium") || undefined,
    utm_campaign: params.get("utm_campaign") || undefined,
    utm_term: params.get("utm_term") || undefined,
    utm_content: params.get("utm_content") || undefined,
  };
};

export const trackPageview = async (opts?: { profileId?: string | null }) => {
  const path = window.location.pathname + window.location.search;
  const referrer = document.referrer || undefined;
  const user_agent = typeof navigator !== "undefined" ? navigator.userAgent : undefined;
  const session_id = getSessionId();
  const screen_width = typeof window !== "undefined" ? window.screen.width : undefined;
  const screen_height = typeof window !== "undefined" ? window.screen.height : undefined;
  const utm = parseUtm(window.location.search);

  const insert = {
    path,
    referrer,
    user_agent,
    session_id,
    screen_width,
    screen_height,
    profile_id: opts?.profileId || null,
    ...utm,
  };

  const { error } = await supabase.from("web_pageviews").insert([insert]);
  if (error) {
    console.warn("Failed to log pageview", error);
  } else {
    console.log("Pageview logged:", insert);
  }
};

export const logEvent = async (
  name: string,
  metadata?: Record<string, any>,
  options?: LogEventOptions
) => {
  const path = window.location.pathname + window.location.search;
  const referrer = document.referrer || undefined;
  const user_agent = typeof navigator !== "undefined" ? navigator.userAgent : undefined;
  const session_id = getSessionId();
  const utm = parseUtm(window.location.search);

  const insert = {
    name,
    path,
    referrer,
    user_agent,
    session_id,
    profile_id: options?.profileId || null,
    metadata: metadata || {},
    ...utm,
  };

  const { error } = await supabase.from("web_events").insert([insert]);
  if (error) {
    console.warn("Failed to log event", name, error);
  } else {
    console.log("Event logged:", insert);
  }
};
