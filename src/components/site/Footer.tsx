import { Leaf, Twitter, Instagram, Facebook, Youtube, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();

  const columns = [
    {
      title: t("footer.colPlatform"),
      links: [
        t("sidebar.cropRecommendation"),
        t("sidebar.diseaseDetection"),
        t("sidebar.weather"),
        t("sidebar.market"),
        t("sidebar.govtSchemes"),
      ],
    },
    {
      title: t("footer.colFarmers"),
      links: [
        t("sidebar.dashboard"),
        t("sidebar.profitCalculator"),
        t("sidebar.cropLifecycle"),
        t("sidebar.community"),
        t("sidebar.aiAssistant"),
      ],
    },
    {
      title: t("footer.colCompany"),
      links: ["About", "Careers", "Press", "Partners", "Contact"],
    },
    {
      title: t("footer.colResources"),
      links: ["Help Center", "Blog", "Research", "Privacy", "Terms"],
    },
  ];

  return (
    <footer className="relative mt-24 border-t border-border/60 bg-secondary/40">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-leaf text-primary-foreground shadow-glow">
                <Leaf className="h-5 w-5" />
              </span>
              <div className="flex flex-col leading-none">
                <span className="font-display text-xl font-semibold">{t("nav.title")}</span>
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  {t("nav.subtitle")}
                </span>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t("footer.desc")}
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[Twitter, Instagram, Facebook, Youtube, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-card/60 text-muted-foreground transition hover:border-primary/40 hover:text-primary hover:scale-105"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-semibold tracking-wide text-foreground">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition hover:text-foreground"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </p>
          <p className="text-xs text-muted-foreground">
            {t("footer.languages")}
          </p>
        </div>
      </div>
    </footer>
  );
}
