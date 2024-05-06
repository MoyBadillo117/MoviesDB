import React from "react";
import { ProgressBarProps } from "./types";
import './ProgressBar.css'

const ProgressBar: React.FC<ProgressBarProps> = ({ voteAverage }) => {
  const getProgressBarColor = (voteAverage: number): string => {
    if (voteAverage >= 8.5) {
      return "bg-green-500";
    } else if (voteAverage >= 6) {
      return "bg-yellow-500";
    } else {
      return "bg-red-500";
    }
  };

  return (
    <div className="h-8 bg-gray-300 rounded-full overflow-hidden relative">
      <div
        className={`h-full absolute top-0 ${getProgressBarColor(
          voteAverage
        )}`}
        style={{ width: `${voteAverage * 10}%`}}
      >
        <div className="h-full bg-opacity-10 bg-white progress-bar-fill"></div>
      </div>
    </div>
  );
};

export default ProgressBar;

