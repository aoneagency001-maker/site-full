"use client";

import { useEffect, useState, useRef } from "react";
import { useTranslations } from "next-intl";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { TrendingDown, TrendingUp, Target, Users, DollarSign, Zap } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

// CPL optimization data over 4 weeks
const chartData = [
  { week: "Нед 1", cpl: 4500, leads: 12 },
  { week: "Нед 2", cpl: 3800, leads: 18 },
  { week: "Нед 3", cpl: 2900, leads: 28 },
  { week: "Нед 4", cpl: 2200, leads: 42 },
];

export function InteractiveDashboard() {
  const t = useTranslations("dashboard");
  const [isVisible, setIsVisible] = useState(false);
  const [animatedCPL, setAnimatedCPL] = useState(4500);
  const [animatedLeads, setAnimatedLeads] = useState(0);
  const [animatedSavings, setAnimatedSavings] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (headingRef.current) {
      gsap.effects.fadeUpOnScroll(headingRef.current, {
        start: "top 80%",
        duration: 0.8,
        markers: false,
      });
    }

    if (sectionRef.current) {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => setIsVisible(true),
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Animate numbers when visible
  useEffect(() => {
    if (!isVisible) return;

    const cplInterval = setInterval(() => {
      setAnimatedCPL((prev) => {
        if (prev <= 2200) {
          clearInterval(cplInterval);
          return 2200;
        }
        return prev - 50;
      });
    }, 30);

    const leadsInterval = setInterval(() => {
      setAnimatedLeads((prev) => {
        if (prev >= 42) {
          clearInterval(leadsInterval);
          return 42;
        }
        return prev + 1;
      });
    }, 50);

    const savingsInterval = setInterval(() => {
      setAnimatedSavings((prev) => {
        if (prev >= 150000) {
          clearInterval(savingsInterval);
          return 150000;
        }
        return prev + 3000;
      });
    }, 30);

    return () => {
      clearInterval(cplInterval);
      clearInterval(leadsInterval);
      clearInterval(savingsInterval);
    };
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      id="dashboard"
      className="py-12 sm:py-16 md:py-20 bg-background relative overflow-hidden"
      aria-labelledby="dashboard-heading"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-8 sm:mb-10">
          <div className="badge-tactical inline-block mb-4">
            {t("badge") || "Живая аналитика"}
          </div>
          <h2
            id="dashboard-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3"
          >
            {t("title") || "Результаты в реальном времени"}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            {t("description") || "Дашборд ИИ-Таргетолога с автоматическим обновлением данных"}
          </p>
        </div>

        {/* Single Dashboard Panel */}
        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 max-w-4xl mx-auto">
          {/* Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <div className="bg-surface border border-border rounded-lg p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">CPL</span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-white">
                {animatedCPL.toLocaleString()} ₸
              </div>
              <div className="flex items-center gap-1 text-xs text-green-400">
                <TrendingDown className="w-3 h-3" />
                -51%
              </div>
            </div>

            <div className="bg-surface border border-border rounded-lg p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">Заявки</span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-white">
                {animatedLeads}
              </div>
              <div className="flex items-center gap-1 text-xs text-green-400">
                <TrendingUp className="w-3 h-3" />
                +250%
              </div>
            </div>

            <div className="bg-surface border border-border rounded-lg p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">Экономия</span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-white">
                {animatedSavings.toLocaleString()} ₸
              </div>
              <div className="text-xs text-muted-foreground">в месяц</div>
            </div>

            <div className="bg-surface border border-border rounded-lg p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">Оптимизаций</span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-white">124</div>
              <div className="text-xs text-muted-foreground">за месяц</div>
            </div>
          </div>

          {/* Chart */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">
              {t("cplChartTitle") || "Снижение стоимости заявки"}
            </h3>
            <div className="h-[180px] sm:h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorCpl" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="week" stroke="#9ca3af" fontSize={11} />
                  <YAxis stroke="#9ca3af" fontSize={11} tickFormatter={(v) => `${v}₸`} />
                  <Area
                    type="monotone"
                    dataKey="cpl"
                    stroke="#10b981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorCpl)"
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bottom comparison */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
            <div className="text-center p-3 bg-surface rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">Без ИИ</div>
              <div className="text-lg font-bold text-gray-400">4 500 ₸</div>
            </div>
            <div className="text-center p-3 bg-primary/10 border border-primary/30 rounded-lg">
              <div className="text-xs text-primary mb-1">С ИИ-Таргетологом</div>
              <div className="text-lg font-bold text-primary">2 200 ₸</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <a
            href="#contact"
            className="btn-primary inline-block px-6 py-3 text-sm sm:text-base font-semibold"
          >
            {t("ctaButton") || "Получить демо-доступ"}
          </a>
        </div>
      </div>
    </section>
  );
}

export default InteractiveDashboard;
