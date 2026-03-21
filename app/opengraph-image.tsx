import { ImageResponse } from "next/og";

export const alt = "Baan met CAO";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#1a1a1a",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          fontSize: 72,
          fontWeight: "bold",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        Baan met CAO
      </div>
      <div
        style={{
          fontSize: 32,
          color: "#F1592A",
          marginTop: 20,
          fontFamily: "Arial, sans-serif",
        }}
      >
        Vacatures met eerlijke arbeidsvoorwaarden
      </div>
      <div
        style={{
          width: 200,
          height: 8,
          background: "#F1592A",
          borderRadius: 4,
          marginTop: 60,
        }}
      />
    </div>,
    { ...size },
  );
}
