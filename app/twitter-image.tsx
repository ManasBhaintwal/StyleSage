import { ImageResponse } from "next/og";
import { siteConfig } from "../lib/seo";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 64,
          background: "linear-gradient(135deg, #111827 0%, #0b0b0c 100%)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: -0.5 }}>
          {siteConfig.name}
        </div>
        <div style={{ marginTop: 12, fontSize: 26, opacity: 0.9 }}>
          Premium Organic Cotton • XS–5XL
        </div>
        <div style={{ marginTop: 6, fontSize: 22, opacity: 0.8 }}>
          Fast shipping across India
        </div>
        <div
          style={{
            position: "absolute",
            right: 40,
            bottom: 30,
            fontSize: 18,
            opacity: 0.5,
          }}
        >
          {new URL(siteConfig.url).host}
        </div>
      </div>
    ),
    { ...size }
  );
}
