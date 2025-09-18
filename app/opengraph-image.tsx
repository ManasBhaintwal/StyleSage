import { ImageResponse } from "next/og";
import { siteConfig } from "../lib/seo";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
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
          background: "linear-gradient(135deg, #0b0b0c 0%, #1f2937 100%)",
          color: "white",
        }}
      >
        <div
          style={{
            fontSize: 44,
            fontWeight: 800,
            letterSpacing: -0.5,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 28,
            opacity: 0.9,
          }}
        >
          Premium Custom T-Shirts
        </div>
        <div
          style={{
            marginTop: 6,
            fontSize: 22,
            opacity: 0.8,
          }}
        >
          Anime • Meme • Personalized
        </div>

        <div
          style={{
            marginTop: 28,
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 16px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.1)",
            fontSize: 18,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: "#22c55e",
            }}
          />
          {new URL(siteConfig.url).host}
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
          © {new Date().getFullYear()} {siteConfig.name}
        </div>
      </div>
    ),
    { ...size }
  );
}
