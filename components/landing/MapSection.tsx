"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

export function MapSection() {
  const t = useTranslations("map");

  // Google Maps embed URL for A-One Agency office in Almaty
  // Using simple query-based embed that works without API key
  const mapEmbedUrl = "https://www.google.com/maps?q=A-One+Agency,+Almaty,+Kazakhstan&output=embed";

  return (
    <section className="py-16 bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="badge-tactical inline-block mb-4">
            {t("badge")}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden border border-border">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="A-One Agency Office Location"
                className="transition-all duration-500"
              />
              {/* Overlay with tactical grid */}
              <div className="absolute inset-0 pointer-events-none opacity-10" style={{
                backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }} />
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Address Card */}
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{t("addressTitle")}</h3>
                  <p className="text-muted-foreground text-sm">
                    {t("addressLine1")}<br />
                    {t("addressLine2")}
                  </p>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{t("phoneTitle")}</h3>
                  <a
                    href="tel:+77473854493"
                    className="text-data text-lg font-mono hover:underline"
                  >
                    +7 747 385 4493
                  </a>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{t("emailTitle")}</h3>
                  <a
                    href="mailto:info@aoneagency.kz"
                    className="text-data hover:underline"
                  >
                    info@aoneagency.kz
                  </a>
                </div>
              </div>
            </div>

            {/* Working Hours Card */}
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{t("hoursTitle")}</h3>
                  <p className="text-muted-foreground text-sm">
                    {t("hoursWeekdays")}<br />
                    {t("hoursWeekend")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MapSection;
