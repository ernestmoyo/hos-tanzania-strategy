import { execFileSync } from "node:child_process";
import ffmpeg from "ffmpeg-static";

const IN = "C:/Users/ernes/AppData/Local/Temp/tour.webm";
const OUT = "C:/Users/ernes/Documents/Projects/sandhealthcare_int/HOS_Tanzania_walkthrough.mp4";

execFileSync(
  ffmpeg,
  [
    "-y",
    "-i", IN,
    "-vf",
    "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=30,format=yuv420p",
    "-c:v", "libx264",
    "-crf", "21",
    "-preset", "medium",
    "-movflags", "+faststart",
    "-an",
    OUT,
  ],
  { stdio: "inherit" }
);
console.log("wrote", OUT);
