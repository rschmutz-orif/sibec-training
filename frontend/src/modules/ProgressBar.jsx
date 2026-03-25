import React from "react";

import { Progress } from "@/components/ui/progress";

function ProgressBar({ current, total }) {
  const value = (current / total) * 100;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>Progression</span>
        <span>
          Question {current} / {total}
        </span>
      </div>
      <Progress value={value} className="h-3 rounded-full" />
    </div>
  );
}

export default ProgressBar;