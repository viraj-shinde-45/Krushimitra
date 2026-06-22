import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Sprout, CloudSun, LineChart, Camera, CalendarDays, ShieldCheck,
  TrendingUp, Bot, ArrowRight, Check, MapPin, Phone, Mail, Sparkles, Wheat, Droplets, Sun,
} from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import platformCalendar from "@/assets/platform-calendar.jpg";
import platformMarket from "@/assets/platform-market.jpg";
import platformWeather from "@/assets/platform-weather.jpg";
import platformSoil from "@/assets/platform-soil.jpg";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CountUp } from "@/components/site/CountUp";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KrishiMitra AI — Smart Farming for Bharat" },
      {
        name: "description",
        content:
          "AI-powered crop advice, disease detection, weather, and market intelligence for Indian farmers — in 12 languages.",
      },
      { property: "og:title", content: "KrishiMitra AI — Smart Farming for Bharat" },
      {
        property: "og:description",
        content: "AI-powered AgriTech platform for Indian farmers. Soil to market, in your language.",
      },
    ],
  }),
  component: LandingPage,
});

import type { Variants } from "framer-motion";
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] } },
};

function Section({
  id, children, className = "",
}: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      className={`relative mx-auto max-w-7xl px-4 py-24 sm:py-28 ${className}`}
    >
      {children}
    </motion.section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={fadeUp}
      className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-primary"
    >
      <Sparkles className="h-3 w-3" />
      {children}
    </motion.div>
  );
}

/* ============================= HERO ============================= */
function Hero() {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <div ref={ref} className="relative overflow-hidden bg-gradient-hero pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Animated blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-leaf/20 blur-3xl animate-blob" />
        <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-wheat/25 blur-3xl animate-blob" style={{ animationDelay: "-6s" }} />
        <div className="absolute left-1/3 bottom-0 h-80 w-80 rounded-full bg-sky/20 blur-3xl animate-blob" style={{ animationDelay: "-12s" }} />
      </div>

      <motion.div style={{ y, opacity }} className="relative mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/60 backdrop-blur px-3.5 py-1.5 text-xs font-semibold text-primary shadow-soft"
            >
              <span className="grid h-4 w-4 place-items-center rounded-full bg-primary text-primary-foreground text-[8px]">★</span>
              {t("landing.tag")}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 text-balance font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[0.95] tracking-tight"
            >
              {t("landing.heroTitle1")}
              <span className="relative whitespace-nowrap">
                <span className="bg-gradient-to-br from-leaf via-primary to-soil bg-clip-text text-transparent">
                  {t("landing.heroTitleHighlight")}
                </span>
                <svg viewBox="0 0 286 22" className="absolute -bottom-3 left-0 h-3 w-full text-wheat" fill="none">
                  <path d="M2 18C50 6 130 2 284 14" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>{" "}
              {t("landing.heroTitle2")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground"
            >
              {t("landing.heroDesc")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button asChild size="lg" className="bg-gradient-leaf text-primary-foreground shadow-glow hover:opacity-95 group rounded-xl px-6">
                <Link to="/dashboard">
                  {t("landing.heroBtnStart")}
                  <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-xl border-foreground/15 bg-card/60 backdrop-blur">
                <Link to="/chat"><Bot className="mr-2 h-4 w-4" /> {t("landing.heroBtnAssistant")}</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground"
            >
              <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-leaf" /> {t("landing.heroCheck1")}</span>
              <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-leaf" /> {t("landing.heroCheck2")}</span>
              <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-leaf" /> {t("landing.heroCheck3")}</span>
            </motion.div>
          </div>

          {/* Hero illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative"
          >
            <div className="relative animate-float">
              <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-leaf opacity-20 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card shadow-glow">
                <img
                  src={heroImage}
                  alt="Indian farmer using KrishiMitra AI in lush green fields"
                  width={1536} height={1280}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Floating stat cards */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: 10 }} animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="absolute -left-2 sm:-left-6 top-10 glass rounded-2xl p-3.5 shadow-soft"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-leaf/15 text-leaf">
                  <Sprout className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("dashboard.farmHealth")}</div>
                  <div className="font-display text-xl font-semibold text-leaf">92<span className="text-xs">/100</span></div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30, y: 10 }} animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="absolute -right-2 sm:-right-4 bottom-16 glass rounded-2xl p-3.5 shadow-soft"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-terracotta/15 text-terracotta">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("dashboard.wheatPrice")}</div>
                  <div className="font-display text-xl font-semibold">2,420 <span className="text-xs text-leaf">+4.2%</span></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

/* ============================= STATS ============================= */
function Stats() {
  const { t } = useTranslation();
  const items = [
    { value: 50000, suffix: "+", label: t("landing.statsFarmers") },
    { value: 18, suffix: "", label: t("landing.statsStates") },
    { value: 98, suffix: "%", label: t("landing.statsVerified") },
    { value: 32, suffix: "%", label: t("common.expectedYield") + " +" },
  ];
  return (
    <section className="border-y border-border/60 bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {items.map((it) => (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center sm:text-left"
            >
              <div className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-foreground">
                <CountUp to={it.value} suffix={it.suffix} />
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{it.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================= FEATURES ============================= */
function Features() {
  const { t } = useTranslation();

  const localFeatures = [
    { icon: Sprout, color: "leaf", title: t("cropRec.title"), desc: t("cropRec.desc"), tag: "AI", to: "/crop-recommendation" as const },
    { icon: Camera, color: "terracotta", title: t("disease.title"), desc: t("disease.desc"), tag: "Vision", to: "/disease-detection" as const },
    { icon: CloudSun, color: "sky", title: t("weather.title"), desc: t("weather.desc"), tag: "Live", to: "/weather" as const },
    { icon: LineChart, color: "wheat", title: t("market.title"), desc: t("market.desc"), tag: "Mandi", to: "/market" as const },
    { icon: ShieldCheck, color: "primary", title: t("schemes.title"), desc: t("schemes.desc"), tag: "Yojana", to: "/schemes" as const },
    { icon: CalendarDays, color: "soil", title: t("calendar.title"), desc: t("calendar.desc"), tag: "New", to: "/calendar" as const },
  ];

  return (
    <Section id="features">
      <div className="max-w-2xl">
        <Eyebrow>{t("nav.features")}</Eyebrow>
        <motion.h2 variants={fadeUp} className="mt-4 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-balance">
          {t("landing.featuresTitle")}
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 text-lg text-muted-foreground text-balance">
          {t("landing.featuresDesc")}
        </motion.p>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {localFeatures.map((f) => (
          <motion.div
            key={f.title} variants={fadeUp}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <Link
              to={f.to}
              className="group relative block h-full overflow-hidden rounded-3xl border border-border/70 bg-card p-7 shadow-soft transition-shadow hover:shadow-glow"
            >
              <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-25 bg-${f.color}`} />
              <div className="relative flex items-start justify-between">
                <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-${f.color}/15 text-${f.color}`}>
                  <f.icon className="h-6 w-6" />
                </div>
                <span className="rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {f.tag}
                </span>
              </div>
              <h3 className="relative mt-6 font-display text-xl font-semibold">{f.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              <div className="relative mt-5 flex items-center gap-1.5 text-sm font-medium text-primary transition-transform group-hover:translate-x-0.5">
                {t("landing.learnMore")} <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ============================= ABOUT / PLATFORM ============================= */
function About() {
  const { t } = useTranslation();
  const pillars = [
    { icon: Wheat, title: t("landing.pillars.builtForBharat.title"), desc: t("landing.pillars.builtForBharat.desc") },
    { icon: Droplets, title: t("landing.pillars.soilToMandi.title"), desc: t("landing.pillars.soilToMandi.desc") },
    { icon: Sun, title: t("landing.pillars.worksLowData.title"), desc: t("landing.pillars.worksLowData.desc") },
  ];
  return (
    <Section id="about">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <motion.div variants={fadeUp} className="relative">
          <div className="absolute -inset-8 rounded-[2.5rem] bg-gradient-wheat opacity-25 blur-3xl" />
          <div className="relative grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="overflow-hidden aspect-[3/4] rounded-3xl shadow-glow">
                <img src={platformCalendar} alt="Smart crop calendar in farmer's hand" loading="lazy" width={1024} height={1024} className="h-full w-full object-cover"/>
              </div>
              <div className="overflow-hidden aspect-square rounded-3xl border border-border/60">
                <img src={platformWeather} alt="Hyperlocal weather for farmers" loading="lazy" width={1024} height={1024} className="h-full w-full object-cover"/>
              </div>
            </div>
            <div className="mt-12 space-y-4">
              <div className="overflow-hidden aspect-square rounded-3xl border border-border/60">
                <img src={platformMarket} alt="Mandi market prices on phone" loading="lazy" width={1024} height={1024} className="h-full w-full object-cover"/>
              </div>
              <div className="overflow-hidden aspect-[3/4] rounded-3xl border border-border/60">
                <img src={platformSoil} alt="Healthy soil and seedlings" loading="lazy" width={1024} height={1024} className="h-full w-full object-cover"/>
              </div>
            </div>
          </div>
        </motion.div>

        <div>
          <Eyebrow>{t("landing.whyKrishiMitra")}</Eyebrow>
          <motion.h2 variants={fadeUp} className="mt-4 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-balance">
            {t("landing.platformRespects")}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-lg text-muted-foreground text-balance">
            {t("landing.platformDesc")}
          </motion.p>

          <div className="mt-10 space-y-5">
            {pillars.map((p) => (
              <motion.div
                key={p.title} variants={fadeUp}
                className="flex gap-4 rounded-2xl border border-border/60 bg-card/50 p-5"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-leaf text-primary-foreground">
                  <p.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ============================= FAQ ============================= */
function FAQ() {
  const { t } = useTranslation();
  const faqs = [
    { q: t("landing.faqs.q1.q"), a: t("landing.faqs.q1.a") },
    { q: t("landing.faqs.q2.q"), a: t("landing.faqs.q2.a") },
    { q: t("landing.faqs.q3.q"), a: t("landing.faqs.q3.a") },
    { q: t("landing.faqs.q4.q"), a: t("landing.faqs.q4.a") },
    { q: t("landing.faqs.q5.q"), a: t("landing.faqs.q5.a") },
    { q: t("landing.faqs.q6.q"), a: t("landing.faqs.q6.a") },
  ];
  return (
    <Section id="faq">
      <div className="text-center max-w-2xl mx-auto">
        <Eyebrow>{t("landing.questions")}</Eyebrow>
        <motion.h2 variants={fadeUp} className="mt-4 font-display text-4xl sm:text-6xl font-semibold tracking-tight text-balance">
          {t("landing.faqSubtitle")}
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 text-lg text-muted-foreground">
          {t("landing.faqContactDesc")}
        </motion.p>
      </div>

      <motion.div variants={fadeUp} className="mx-auto mt-12 max-w-3xl">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i} value={`item-${i}`}
              className="rounded-2xl border border-border/70 bg-card px-5 shadow-soft data-[state=open]:shadow-glow data-[state=open]:border-primary/30"
            >
              <AccordionTrigger className="py-5 text-left font-display text-base sm:text-lg font-semibold hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-muted-foreground leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </Section>
  );
}

/* ============================= CONTACT ============================= */
import { toast } from "sonner";
import { z } from "zod";

const WHATSAPP_NUMBER = "919876543210"; // India support line (placeholder)

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  phone: z.string().trim().max(40).optional(),
  message: z.string().trim().min(1, "Message is required").max(4000),
});

function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const update = (k: keyof typeof form) => (v: string) => setForm((p) => ({ ...p, [k]: v }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    const text =
      `Namaste KrishiMitra team!\n\n` +
      `Name: ${parsed.data.name}\n` +
      (parsed.data.phone ? `Phone: ${parsed.data.phone}\n` : "") +
      `\nMessage:\n${parsed.data.message}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("Opening WhatsApp…");
    setSent(true);
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <Section id="contact">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-border/70 bg-gradient-hero p-8 sm:p-14 shadow-soft">
        <div aria-hidden className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-leaf/20 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-wheat/30 blur-3xl" />

        <div className="relative grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <Eyebrow>{t("landing.getInTouch")}</Eyebrow>
            <motion.h2 variants={fadeUp} className="mt-4 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-balance">
              {t("landing.growTogether")}
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-muted-foreground text-balance">
              {t("landing.contactDesc")}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 space-y-4">
              {[
                { icon: MapPin, label: t("landing.contactVisit"), value: "ICAR-NAARM Campus, Hyderabad 500030" },
                { icon: Phone, label: t("landing.contactCall"), value: "1800-180-1551 (toll-free, 6am – 10pm)" },
                { icon: Mail, label: t("landing.contactWhatsApp"), value: `+${WHATSAPP_NUMBER}` },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-card border border-border">
                    <c.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
                    <div className="text-sm font-medium">{c.value}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.form
            variants={fadeUp}
            onSubmit={onSubmit}
            className="rounded-3xl border border-border/70 bg-card/80 backdrop-blur p-6 sm:p-8 shadow-soft space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <FloatField label={t("landing.yourName")} id="name" value={form.name} onChange={update("name")} />
              <FloatField label={t("landing.phoneOptional")} id="phone" value={form.phone} onChange={update("phone")} />
            </div>
            <FloatField label={t("landing.messagePlaceholder")} id="msg" textarea value={form.message} onChange={update("message")} />
            <Button type="submit" size="lg" className="w-full bg-gradient-leaf text-primary-foreground shadow-glow hover:opacity-95">
              {sent ? <><Check className="mr-2 h-4 w-4" /> {t("landing.sentSuccess")}</> : <>{t("landing.sendWhatsApp")} <ArrowRight className="ml-2 h-4 w-4" /></>}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              {t("landing.whatsappDisclaimer")}
            </p>
          </motion.form>
        </div>
      </div>
    </Section>
  );
}

function FloatField({
  label, id, type = "text", textarea = false, value, onChange,
}: { label: string; id: string; type?: string; textarea?: boolean; value: string; onChange: (v: string) => void }) {
  const [focus, setFocus] = useState(false);
  const active = focus || value.length > 0;
  const common = `peer w-full rounded-xl border bg-background/60 px-4 pt-6 pb-2 text-sm outline-none transition-all ${
    focus ? "border-primary ring-4 ring-primary/15" : "border-border"
  }`;
  return (
    <div className="relative">
      {textarea ? (
        <textarea id={id} value={value} rows={4}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          className={common + " resize-none"} />
      ) : (
        <input id={id} type={type} value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          className={common} />
      )}
      <label htmlFor={id}
        className={`pointer-events-none absolute left-4 transition-all ${
          active
            ? "top-1.5 text-[10px] font-semibold uppercase tracking-wider text-primary"
            : "top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
        } ${textarea && !active ? "top-5 translate-y-0" : ""}`}>
        {label}
      </label>
    </div>
  );
}

/* ============================= CTA ============================= */
function FinalCTA() {
  const { t } = useTranslation();
  return (
    <Section>
      <motion.div
        variants={fadeUp}
        className="relative overflow-hidden rounded-[2.5rem] bg-gradient-leaf p-10 sm:p-16 text-center text-primary-foreground shadow-glow"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-balance">
            {t("landing.nextHarvest")}
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/85 text-balance">
            {t("landing.freeForever")}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90 rounded-xl px-6">
              <Link to="/auth">{t("nav.getStarted")} <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-xl border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
              <a href="#contact">{t("landing.talkTeam")}</a>
            </Button>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

/* ============================= PAGE ============================= */
function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <About />
        
        <FAQ />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
