import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} - Premium construction and interiors`;
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background:
            "linear-gradient(135deg, #0f172a 0%, #1d4ed8 48%, #2563eb 100%)",
          color: "#ffffff",
          position: "relative",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "48px",
            border: "1px solid rgba(255,255,255,0.16)",
            borderRadius: "32px",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
          }}
        >
          <div
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "24px",
              background: "rgba(255,255,255,0.14)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "30px",
              fontWeight: 800,
            }}
          >
            B
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ fontSize: "28px", fontWeight: 800, letterSpacing: "0.24em" }}>
              {siteConfig.name.toUpperCase()}
            </div>
            <div style={{ fontSize: "18px", opacity: 0.9 }}>
              Premium construction, interiors & project delivery
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "820px" }}>
          <div style={{ fontSize: "70px", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.06em" }}>
            Build spaces that feel confident, modern, and lasting.
          </div>
          <div style={{ fontSize: "28px", lineHeight: 1.4, opacity: 0.92 }}>
            Residential homes, commercial projects, interiors, renovations, and site planning in Bhopal.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "32px",
            fontSize: "20px",
            opacity: 0.95,
          }}
        >
          <div>{siteConfig.contact.address}</div>
          <div>{siteConfig.contact.phone}</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
