import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function QuestionCard({ question, answer, setAnswer, onSubmit, feedback }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [question.id]);

  return (
    <Card className="rounded-3xl border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-lg text-slate-500">Résous le calcul</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center text-5xl font-extrabold tracking-tight md:text-6xl">
          {question.multiplicand} × {question.multiplier} = ?
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="mx-auto flex max-w-md flex-col gap-4"
        >
          <Input
            ref={inputRef}
            type="number"
            inputMode="numeric"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Ta réponse"
            className="h-14 rounded-2xl text-center text-2xl font-bold"
          />
          <Button type="submit" className="h-12 rounded-2xl text-base">
            Valider
          </Button>
        </form>

        {feedback && (
          <div
            className={`rounded-2xl p-4 text-center text-sm font-medium ${
              feedback.correct
                ? "bg-emerald-50 text-emerald-700"
                : "bg-rose-50 text-rose-700"
            }`}
          >
            {feedback.correct
              ? "Bonne réponse !"
              : `Incorrect. La bonne réponse était ${feedback.correctAnswer}.`}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default QuestionCard;