// small viz helpers: hex colour interpolation + number formatting
import { format } from "d3-format";
import { interpolateViridis, interpolateInferno } from "d3-scale-chromatic";

export const fmtInt = format(",.0f");
export const fmtPct = format(".0%");
export const fmt1 = format(",.1f");

function hexToRgb(h: string): [number, number, number] {
  const n = parseInt(h.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function rgbToHex(r: number, g: number, b: number) {
  const c = (x: number) => Math.round(x).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

/** build a 0..1 -> hex interpolator across a list of stops */
export function ramp(stops: string[]) {
  const rgb = stops.map(hexToRgb);
  return (t: number) => {
    const x = Math.max(0, Math.min(1, t)) * (rgb.length - 1);
    const i = Math.floor(x);
    const f = x - i;
    const a = rgb[i];
    const b = rgb[Math.min(i + 1, rgb.length - 1)];
    return rgbToHex(
      a[0] + (b[0] - a[0]) * f,
      a[1] + (b[1] - a[1]) * f,
      a[2] + (b[2] - a[2]) * f
    );
  };
}

// multi-hue perceptual ramps — far clearer district-to-district separation
// on a dark ground than a monochrome scale.
export const scoreRamp = (t: number) =>
  interpolateViridis(Math.max(0, Math.min(1, t)));
export const popRamp = (t: number) =>
  interpolateInferno(0.08 + 0.84 * Math.max(0, Math.min(1, t)));

// CSS gradient strings that mirror the ramps (for legends)
export const scoreGradientCss =
  "linear-gradient(90deg,#440154,#414487,#2a788e,#22a884,#7ad151,#fde725)";
export const popGradientCss =
  "linear-gradient(90deg,#160b39,#51127c,#b6377a,#fb8861,#fcfdbf)";
