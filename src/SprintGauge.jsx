import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function SprintGauge({ percentage }) {
  let warning = "";
  let color = "#00C49F";

  if (percentage > 1.25) {
    warning = `🚨 Overcommitted by ${Math.round((percentage - 1) * 100)}%`;
    color = "#FF5F6D";
  } else if (percentage > 1.1) {
    warning = `🟠 Overcommitted by ${Math.round((percentage - 1) * 100)}%`;
    color = "#FF8C00";
  } else if (percentage > 1) {
    warning = `⚠️ Overcommitted by ${Math.round((percentage - 1) * 100)}%`;
    color = "#FDC830";
  }

  const clamped = Math.min(percentage, 1.5);

  return (
    <div className="my-8 text-center">
      <h2 className="text-xl font-bold text-[#5271ff] mb-2">
        Commitment Load
      </h2>
      <div style={{ width: 220, height: 120, margin: "0 auto" }}>
        <CircularProgressbarWithChildren
          value={clamped}
          maxValue={1.5}
          circleRatio={0.5}
          styles={buildStyles({
            rotation: 0.75,
            strokeLinecap: "round",
            pathColor: color,
            trailColor: "#eee",
            pathTransitionDuration: 0.5,
          })}
        >
          <div className="text-black text-xl font-bold mt-4">
            {Math.round(clamped * 100)}%
          </div>
        </CircularProgressbarWithChildren>
      </div>
      {warning && (
        <p className="mt-6 font-semibold text-[#ff5f5f]">{warning}</p>
      )}
    </div>
  );
}


