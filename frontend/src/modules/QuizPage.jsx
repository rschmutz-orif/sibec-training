import React from "react";
import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";

import Timer from "./Timer";

function QuizPage({
  questions,
  currentIndex,
  answer,
  setAnswer,
  onSubmit,
  elapsedSeconds,
  feedback,
}) {
  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3 flex-1">
            <ProgressBar current={currentIndex + 1} total={questions.length} />
          </div>
          <Timer seconds={elapsedSeconds} />
        </div>

        <QuestionCard
          question={currentQuestion}
          answer={answer}
          setAnswer={setAnswer}
          onSubmit={onSubmit}
          feedback={feedback}
        />
      </div>
    </div>
  );
}

export default QuizPage;