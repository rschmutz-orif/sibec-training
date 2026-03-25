import React from "react";
import { Clock3 } from "lucide-react";

import { formatDuration } from "@/lib/questions"

function Timer({ seconds }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
      <Clock3 className="h-4 w-4" />
      {formatDuration(seconds)}
    </div>
  );
}

export default Timer;