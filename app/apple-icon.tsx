import { ImageResponse } from "next/og";

// iOS kezdőképernyő-ikon: ugyanaz a jel, mint az app/icon.svg (a sarkokat az iOS maga kerekíti).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const k = 180 / 64;
const tile = (x: number, y: number) => ({
  position: "absolute" as const,
  left: x * k,
  top: y * k,
  width: 16 * k,
  height: 16 * k,
  borderRadius: 4.5 * k,
  background: "#ffffff",
});

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "linear-gradient(135deg, #a596ff, #4a36e8)" }}>
        <div style={tile(13, 13)} />
        <div style={tile(35, 13)} />
        <div style={tile(13, 35)} />
        <div
          style={{
            position: "absolute",
            left: (43 - 8.5) * k,
            top: (43 - 8.5) * k,
            width: 17 * k,
            height: 17 * k,
            borderRadius: 999,
            background: "#45e3c4",
          }}
        />
      </div>
    ),
    size,
  );
}
