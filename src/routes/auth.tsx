import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { Leaf, Mail, Lock, User as UserIcon, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in — KrishiMitra AI" }] }),
  component: AuthPage,
});

const emailSchema = z.string().trim().email("Enter a valid email").max(255);
const passSchema = z
  .string()
  .min(8, "At least 8 characters")
  .max(72)
  .regex(/[A-Z]/, "One uppercase letter")
  .regex(/[a-z]/, "One lowercase letter")
  .regex(/[0-9]/, "One number");
const nameSchema = z.string().trim().min(2, "Enter your full name").max(100);

const passwordRules = [
  { test: (s: string) => s.length >= 8, label: "At least 8 characters" },
  { test: (s: string) => /[A-Z]/.test(s), label: "One uppercase letter" },
  { test: (s: string) => /[a-z]/.test(s), label: "One lowercase letter" },
  { test: (s: string) => /[0-9]/.test(s), label: "One number" },
];

function AuthPage() {
  const nav = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) nav({ to: "/dashboard", replace: true });
    });
  }, [nav]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const cleanEmail = emailSchema.parse(email);
      passSchema.parse(password);
      if (mode === "signup") nameSchema.parse(name);
    } catch (err) {
      if (err instanceof z.ZodError) toast.error(err.issues[0]?.message ?? "Invalid input");
      return;
    }
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: cleanEmailNormalize(email),
          password,
          options: {
            emailRedirectTo: window.location.origin + "/dashboard",
            data: { full_name: name },
          },
        });
        if (error) throw error;
        toast.success("Account created. You can sign in now.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: cleanEmailNormalize(email),
          password,
        });
        if (error) throw error;
        toast.success("Welcome back!");
        nav({ to: "/dashboard", replace: true });
      }
    } catch (err: any) {
      toast.error(err?.message ?? "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const onGoogle = async () => {
    setOauthLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin + "/dashboard",
        },
      });
      if (error) throw error;
    } catch (e: any) {
      toast.error(e?.message ?? "Google sign-in failed");
      setOauthLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-[1.1fr_1fr] bg-gradient-hero">
      {/* Left brand panel */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute -left-20 top-20 h-80 w-80 rounded-full bg-leaf/20 blur-3xl animate-blob" />
          <div className="absolute right-10 bottom-20 h-96 w-96 rounded-full bg-wheat/30 blur-3xl animate-blob" style={{animationDelay:"-6s"}}/>
        </div>
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-leaf text-primary-foreground shadow-glow">
            <Leaf className="h-5 w-5"/>
          </span>
          <span className="font-display text-xl font-semibold">KrishiMitra <span className="text-muted-foreground">AI</span></span>
        </Link>
        <div>
          <h2 className="font-display text-5xl font-semibold leading-tight tracking-tight">
            Your personal<br/>farm intelligence.
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Create your free account to unlock crop recommendations, weather alerts, market prices, and your own AI farming assistant — all saved to your account.
          </p>
          <div className="mt-8 flex flex-wrap gap-2 text-xs">
            {["Free forever","Voice in 12 languages","Works offline","Your data stays private"].map(t=>(
              <span key={t} className="rounded-full border border-border bg-card/60 px-3 py-1.5">{t}</span>
            ))}
          </div>
        </div>
        <p className="text-xs text-muted-foreground">© KrishiMitra AI · Built for Bharat</p>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <motion.div
          initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}
          className="w-full max-w-md rounded-3xl border border-border bg-card/90 backdrop-blur p-7 sm:p-9 shadow-glow"
        >
          <div className="flex items-center gap-2 lg:hidden mb-6">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-leaf text-primary-foreground"><Leaf className="h-4 w-4"/></span>
            <span className="font-display text-lg font-semibold">KrishiMitra AI</span>
          </div>

          <h1 className="font-display text-3xl font-semibold tracking-tight">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {mode === "signin" ? "Sign in to your farm dashboard." : "Join 50,000+ Indian farmers."}
          </p>

          {/* Tabs */}
          <div className="mt-6 grid grid-cols-2 rounded-xl border border-border bg-secondary/40 p-1 text-sm font-medium">
            <button onClick={()=>setMode("signin")} className={`rounded-lg py-2 transition ${mode==="signin"?"bg-card shadow-soft":"text-muted-foreground"}`}>Sign in</button>
            <button onClick={()=>setMode("signup")} className={`rounded-lg py-2 transition ${mode==="signup"?"bg-card shadow-soft":"text-muted-foreground"}`}>Sign up</button>
          </div>

          {/* Google */}
          <Button
            type="button"
            onClick={onGoogle}
            disabled={oauthLoading}
            variant="outline"
            className="mt-6 w-full rounded-xl border-border bg-background gap-2 hover:bg-secondary"
          >
            {oauthLoading ? <Loader2 className="h-4 w-4 animate-spin"/> : <GoogleIcon/>}
            Continue with Google
          </Button>

          <Button
            type="button"
            onClick={() => {
              try {
                localStorage.setItem("dev_bypass_auth", "true");
              } catch (e) {
                console.warn("localStorage not available:", e);
              }
              nav({ to: "/dashboard", replace: true });
            }}
            variant="ghost"
            className="mt-2 w-full rounded-xl text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/40"
          >
            Skip Login (Bypass Auth for Dev Mode)
          </Button>

          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={onSubmit} className="space-y-3">
            {mode === "signup" && (
              <Field icon={<UserIcon className="h-4 w-4"/>} placeholder="Full name" value={name} onChange={setName} type="text"/>
            )}
            <Field icon={<Mail className="h-4 w-4"/>} placeholder="you@farm.in" value={email} onChange={setEmail} type="email"/>
            <Field icon={<Lock className="h-4 w-4"/>} placeholder="Password" value={password} onChange={setPassword} type="password"/>
            {mode === "signup" && (
              <ul className="space-y-1 px-1 pt-1 text-xs">
                {passwordRules.map((r) => {
                  const ok = r.test(password);
                  return (
                    <li key={r.label} className={ok ? "text-leaf" : "text-terracotta"}>
                      {ok ? "✓" : "✗"} {r.label}
                    </li>
                  );
                })}
              </ul>
            )}


            <Button type="submit" disabled={loading} size="lg" className="w-full rounded-xl bg-gradient-leaf text-primary-foreground shadow-glow hover:opacity-95">
              {loading ? <Loader2 className="h-4 w-4 animate-spin"/> : (
                <>{mode === "signin" ? "Sign in" : "Create account"} <ArrowRight className="ml-1.5 h-4 w-4"/></>
              )}
            </Button>
          </form>

          <p className="mt-5 text-center text-xs text-muted-foreground">
            By continuing you agree to our terms and privacy policy.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function cleanEmailNormalize(s: string){ return s.trim().toLowerCase(); }

function Field({icon, placeholder, value, onChange, type}:{icon:React.ReactNode;placeholder:string;value:string;onChange:(v:string)=>void;type:string}){
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>
      <input
        type={type}
        value={value}
        onChange={(e)=>onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
        required
      />
    </div>
  );
}

function GoogleIcon(){
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.6 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.5 14.6 2.5 12 2.5 6.8 2.5 2.6 6.7 2.6 12s4.2 9.5 9.4 9.5c5.4 0 9-3.8 9-9.2 0-.6-.1-1.1-.2-1.6H12z"/>
    </svg>
  );
}
