import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let isBypass = false;
    if (typeof window !== "undefined") {
      try {
        isBypass = localStorage.getItem("dev_bypass_auth") === "true";
      } catch (e) {
        console.warn("localStorage not available:", e);
      }
    }
    if (isBypass) {
      setUser({
        id: "guest-user",
        email: "guest@farmer.com",
        user_metadata: { full_name: "Guest Farmer" },
        app_metadata: {},
        aud: "authenticated",
        created_at: new Date().toISOString(),
      } as any);
      setReady(true);
      return;
    }

    const { data: sub } = supabase.auth.onAuthStateChange((_evt, s) => {
      setSession(s);
      setUser(s?.user ?? null);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("dev_bypass_auth");
      } catch (e) {
        console.warn("localStorage not available:", e);
      }
    }
    await supabase.auth.signOut();
  };

  return { session, user, ready, signOut };
}
