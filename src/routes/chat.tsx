import { createFileRoute, useNavigate, Link, Outlet, useLocation } from "@tanstack/react-router";
import { DashboardShell } from "@/components/app/DashboardShell";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot, Send, Plus, User, Trash2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { askKrishiMitraGemini } from "@/lib/gemini.functions";
import { toast } from "sonner";
import { safeRandomUUID } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "AI Assistant — KrishiMitra AI" }] }),
  component: ChatLayout,
});

type Msg = { id: string; role: "user" | "assistant"; text: string };
type Thread = { id: string; title: string; updatedAt: number; messages: Msg[] };

const STORAGE = "km_chat_threads_v1";
let memoryThreads: Thread[] = [];

function loadThreads(): Thread[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE);
    const parsed = JSON.parse(data || "[]");
    if (!Array.isArray(parsed)) return memoryThreads;
    return parsed.filter(
      (t: any) =>
        t &&
        typeof t === "object" &&
        typeof t.id === "string" &&
        Array.isArray(t.messages)
    );
  } catch (e) {
    console.warn("Failed to load threads from localStorage:", e);
    return memoryThreads;
  }
}
function saveThreads(t: Thread[]) {
  memoryThreads = t;
  try {
    localStorage.setItem(STORAGE, JSON.stringify(t));
  } catch (e) {
    console.warn("Failed to save threads to localStorage:", e);
  }
}

function ChatLayout() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/chat" || location.pathname === "/chat/") {
      const t = loadThreads();
      if (t.length === 0) {
        const id = safeRandomUUID();
        const fresh: Thread = { id, title: "New conversation", updatedAt: Date.now(), messages: [] };
        saveThreads([fresh]);
        nav({ to: "/chat/$threadId", params: { threadId: id }, replace: true });
      } else {
        nav({ to: "/chat/$threadId", params: { threadId: t[0].id }, replace: true });
      }
    }
  }, [location.pathname, nav]);

  if (location.pathname === "/chat" || location.pathname === "/chat/") {
    return <DashboardShell title={t("chat.title")}><p className="text-muted-foreground">{t("common.loading")}</p></DashboardShell>;
  }

  return <Outlet />;
}

export function ChatThreadView({ threadId }: { threadId: string }) {
  const { t, i18n } = useTranslation();
  const [threads, setThreads] = useState<Thread[]>(() => loadThreads());
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const nav = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const active = threads.find((t) => t.id === threadId);

  useEffect(() => { inputRef.current?.focus(); }, [threadId]);
  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight }); }, [active?.messages.length, sending]);

  if (!active) {
    return (
      <DashboardShell title={t("chat.title")}>
        <p className="text-muted-foreground">{t("chat.notFound")}</p>
        <Button asChild className="mt-4"><Link to="/chat">{t("chat.backToChats")}</Link></Button>
      </DashboardShell>
    );
  }

  const updateThreads = (next: Thread[]) => { setThreads(next); saveThreads(next); };

  const newThread = () => {
    const id = safeRandomUUID();
    const tFresh: Thread = { id, title: t("chat.newConversation"), updatedAt: Date.now(), messages: [] };
    const next = [tFresh, ...threads];
    updateThreads(next);
    nav({ to: "/chat/$threadId", params: { threadId: id } });
  };

  const deleteThread = (id: string) => {
    const next = threads.filter((t) => t.id !== id);
    updateThreads(next);
    if (id === threadId) {
      if (next[0]) nav({ to: "/chat/$threadId", params: { threadId: next[0].id }, replace: true });
      else nav({ to: "/chat", replace: true });
    }
  };

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || sending) return;
    const userMsg: Msg = { id: safeRandomUUID(), role: "user", text: trimmed };
    const withUser: Thread = {
      ...active,
      title: active.messages.length === 0 ? trimmed.slice(0, 40) : active.title,
      updatedAt: Date.now(),
      messages: [...active.messages, userMsg],
    };
    let next = threads.map((t) => (t.id === threadId ? withUser : t));
    updateThreads(next);
    setInput("");
    setSending(true);
    try {
      const history = withUser.messages.map((m) => ({
        role: m.role,
        content: m.text,
      }));
      const res = await askKrishiMitraGemini({
        data: {
          messages: history,
          lang: (i18n.language || "en").split("-")[0],
        }
      });
      const replyText = res.ok ? res.reply : `⚠️ ${res.error}`;
      if (!res.ok) toast.error(res.error);
      const reply: Msg = { id: safeRandomUUID(), role: "assistant", text: replyText };
      const updated: Thread = { ...withUser, messages: [...withUser.messages, reply], updatedAt: Date.now() };
      next = next.map((t) => (t.id === threadId ? updated : t));
      updateThreads(next);
    } catch (e) {
      const reply: Msg = { id: safeRandomUUID(), role: "assistant", text: "⚠️ Could not reach the AI. Please try again." };
      const updated: Thread = { ...withUser, messages: [...withUser.messages, reply], updatedAt: Date.now() };
      next = next.map((t) => (t.id === threadId ? updated : t));
      updateThreads(next);
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  };

  const suggestions = [
    t("chat.sugg1"),
    t("chat.sugg2"),
    t("chat.sugg3"),
    t("chat.sugg4"),
  ];

  const [threadsOpen, setThreadsOpen] = useState(false);

  return (
    <DashboardShell title={t("chat.title")}>
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        {/* Mobile threads toggle */}
        <div className="lg:hidden flex items-center justify-between">
          <button
            onClick={() => setThreadsOpen((o) => !o)}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium"
          >
            {threadsOpen ? t("chat.hide") : t("chat.show")} chats ({threads.length})
          </button>
          <Button onClick={newThread} size="sm" className="bg-gradient-leaf text-primary-foreground"><Plus className="mr-1.5 h-4 w-4"/>{t("chat.newChat")}</Button>
        </div>

        <aside className={`${threadsOpen ? "block" : "hidden"} lg:block rounded-2xl border border-border bg-card p-3 shadow-soft h-fit`}>
          <Button onClick={newThread} className="hidden lg:flex w-full bg-gradient-leaf text-primary-foreground"><Plus className="mr-2 h-4 w-4"/>{t("chat.newChat")}</Button>
          <div className="lg:mt-3 space-y-1 max-h-[40vh] lg:max-h-[60vh] overflow-y-auto">
            {threads.map((t) => (
              <div key={t.id} className={`flex items-center gap-1 rounded-lg ${t.id===threadId ? "bg-secondary" : ""}`}>
                <Link
                  to="/chat/$threadId" params={{ threadId: t.id }}
                  onClick={() => setThreadsOpen(false)}
                  className="flex-1 truncate rounded-lg px-3 py-2 text-sm hover:bg-secondary/60"
                >
                  {t.title || t("chat.newConversation")}
                </Link>
                <button
                  onClick={() => deleteThread(t.id)}
                  className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:text-terracotta hover:bg-secondary/60"
                  aria-label="Delete chat"
                ><Trash2 className="h-3.5 w-3.5"/></button>
              </div>
            ))}
          </div>
        </aside>

        <div className="flex flex-col rounded-3xl border border-border bg-card shadow-soft overflow-hidden h-[calc(100dvh-220px)] min-h-[420px] lg:h-[calc(100dvh-260px)]">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {active.messages.length === 0 ? (
              <div className="grid place-items-center h-full text-center">
                <div className="max-w-md">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-leaf text-primary-foreground"><Bot className="h-6 w-6"/></div>
                  <h3 className="mt-4 font-display text-2xl font-semibold">{t("chat.howCanIHelp")}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t("chat.suggestionsLabel")}</p>
                  <div className="mt-6 grid gap-2 sm:grid-cols-2">
                    {suggestions.map((s) => (
                      <button key={s} onClick={() => send(s)} className="rounded-xl border border-border bg-secondary/40 p-3 text-left text-sm hover:bg-secondary">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              active.messages.map((m) => (
                <motion.div
                  key={m.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role === "assistant" && <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-leaf text-primary-foreground"><Bot className="h-4 w-4"/></div>}
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    m.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary/60"
                  }`}>{m.text}</div>
                  {m.role === "user" && <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-wheat/40 text-soil"><User className="h-4 w-4"/></div>}
                </motion.div>
              ))
            )}
            {sending && (
              <div className="flex gap-3 justify-start">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-leaf text-primary-foreground"><Bot className="h-4 w-4"/></div>
                <div className="rounded-2xl bg-secondary/60 px-4 py-3 text-sm text-muted-foreground flex items-center gap-2">
                  <Loader2 className="h-3.5 w-3.5 animate-spin"/> {t("chat.thinking")}
                </div>
              </div>
            )}
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="border-t border-border p-3 flex items-end gap-2 bg-card"
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
              rows={1}
              disabled={sending}
              placeholder={sending ? t("chat.waiting") : t("chat.inputPlaceholder")}
              className="flex-1 resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 max-h-32 disabled:opacity-60"
            />
            <Button type="submit" size="icon" disabled={sending || !input.trim()} className="bg-gradient-leaf text-primary-foreground shrink-0">
              {sending ? <Loader2 className="h-4 w-4 animate-spin"/> : <Send className="h-4 w-4"/>}
            </Button>
          </form>
        </div>
      </div>
    </DashboardShell>
  );
}
