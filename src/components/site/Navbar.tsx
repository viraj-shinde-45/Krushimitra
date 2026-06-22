import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Menu, X, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const langs = [
  { code: "en", label: "EN" },
  { code: "hi", label: "हि" },
  { code: "mr", label: "मरा" },
];

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState("en");
  const [langOpen, setLangOpen] = useState(false);

  const navItems = [
    { label: t("nav.features"), href: "/#features" },
    { label: t("nav.platform"), href: "/#about" },
    { label: t("nav.faq"), href: "/#faq" },
    { label: t("nav.contact"), href: "/#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("km_lang") || "en";
    setLang(saved);
  }, []);

  const selectLang = (code: string) => {
    setLang(code);
    localStorage.setItem("km_lang", code);
    setLangOpen(false);
    i18n.changeLanguage(code);
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className={`flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3 transition-all duration-300 ${
          scrolled ? "glass shadow-soft" : "bg-transparent"
        }`}>
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-leaf text-primary-foreground shadow-glow">
              <Leaf className="h-5 w-5" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-semibold tracking-tight">{t("nav.title")}</span>
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {t("nav.subtitle")}
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}
                className="relative px-3 py-2 text-sm font-medium text-foreground/75 hover:text-foreground transition-colors"
              >{item.label}</a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setLangOpen((o) => !o)}
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition"
              >
                <Globe className="h-3.5 w-3.5" />
                {langs.find((l) => l.code === lang)?.label || "EN"}
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                    className="absolute right-0 top-full mt-2 w-36 rounded-xl border border-border bg-card p-1 shadow-glow"
                  >
                    {langs.map((l) => (
                      <button key={l.code} onClick={() => selectLang(l.code)}
                        className={`block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-secondary ${lang===l.code ? "text-primary font-semibold" : ""}`}>
                        {l.label === "EN" ? "English" : l.label === "हि" ? "हिन्दी" : "मराठी"}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link to="/auth">{t("nav.signin")}</Link>
            </Button>
            <Button asChild size="sm" className="bg-gradient-leaf text-primary-foreground shadow-glow hover:opacity-95">
              <Link to="/auth">{t("nav.getStarted")}</Link>
            </Button>
          </div>

          <button onClick={() => setOpen(!open)} className="lg:hidden grid h-10 w-10 place-items-center rounded-xl border border-border/50 bg-card/60" aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="lg:hidden mt-2 glass rounded-2xl p-4 shadow-soft">
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <a key={item.href} href={item.href} onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-secondary/60">{item.label}</a>
                ))}
                <div className="mt-2 grid grid-cols-3 gap-1">
                  {langs.map((l) => (
                    <button key={l.code} onClick={() => selectLang(l.code)}
                      className={`rounded-lg border border-border px-2 py-1.5 text-xs ${lang===l.code ? "bg-gradient-leaf text-primary-foreground" : ""}`}>
                      {l.label}
                    </button>
                  ))}
                </div>
                <div className="mt-3 flex gap-2">
                  <Button asChild variant="outline" className="flex-1"><Link to="/auth" onClick={()=>setOpen(false)}>{t("nav.signin")}</Link></Button>
                  <Button asChild className="flex-1 bg-gradient-leaf text-primary-foreground">
                    <Link to="/auth" onClick={()=>setOpen(false)}>{t("nav.getStarted")}</Link>
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
