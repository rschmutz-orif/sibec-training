import React, { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Play, Calculator, Trophy, Clock3 } from "lucide-react";

function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function generateQuestions(table, count = 10, maxMultiplier = 10) {
  const base = Array.from({ length: maxMultiplier + 1 }, (_, i) => ({
    multiplicand: table,
    multiplier: i,
    answer: table * i,
    id: `${table}-${i}`,
  }));

  const shuffled = shuffleArray(base);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

function formatDuration(seconds) {
  const min = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const sec = (seconds % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}

function HomePage({ selectedTable, questionCount, onTableChange, onQuestionCountChange, onStart }) {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-3xl border-0 shadow-lg">
          <CardHeader className="space-y-3 pb-2">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Calculator className="h-4 w-4" />
              Entraînement aux tables de multiplication
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight md:text-4xl">
              Révise un livret en séries de 10 questions
            </CardTitle>
            <p className="max-w-xl text-sm leading-6 text-slate-600 md:text-base">
              Choisis un livret, lance une série, réponds question par question et consulte ton score à la fin.
            </p>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <div className="space-y-3">
              <Label className="text-base font-semibold">Choisis un livret</Label>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
                {Array.from({ length: 12 }, (_, i) => i + 1).map((table) => {
                  const active = selectedTable === table;
                  return (
                    <button
                      key={table}
                      type="button"
                      onClick={() => onTableChange(table)}
                      className={`rounded-2xl border p-4 text-center text-lg font-bold transition hover:scale-[1.02] ${
                        active
                          ? "border-slate-900 bg-slate-900 text-white shadow-md"
                          : "border-slate-200 bg-white text-slate-900"
                      }`}
                    >
                      {table}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="questionCount" className="text-base font-semibold">
                Nombre de questions
              </Label>
              <div className="flex items-center gap-3">
                <Input
                  id="questionCount"
                  type="number"
                  min={1}
                  max={11}
                  value={questionCount}
                  onChange={(e) => onQuestionCountChange(Number(e.target.value))}
                  className="max-w-32 rounded-2xl"
                />
                <span className="text-sm text-slate-500">Recommandé : 10</span>
              </div>
            </div>

            <Button onClick={onStart} className="h-12 rounded-2xl px-6 text-base">
              <Play className="mr-2 h-4 w-4" />
              Commencer
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Aperçu de la session</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-600">
            <div className="flex items-center justify-between rounded-2xl bg-slate-100 p-4">
              <span>Livret choisi</span>
              <Badge variant="secondary" className="rounded-full px-3 py-1 text-sm">
                {selectedTable}
              </Badge>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-slate-100 p-4">
              <span>Questions</span>
              <Badge variant="secondary" className="rounded-full px-3 py-1 text-sm">
                {questionCount}
              </Badge>
            </div>
            <div className="rounded-2xl bg-slate-100 p-4">
              <p className="font-medium text-slate-800">Exemple</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{selectedTable} × 7 = ?</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

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

function Timer({ seconds }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
      <Clock3 className="h-4 w-4" />
      {formatDuration(seconds)}
    </div>
  );
}

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

function ResultPage({ score, total, mistakes, elapsedSeconds, selectedTable, onRestart, onBackHome }) {
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <Card className="rounded-3xl border-0 shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white">
              <Trophy className="h-6 w-6" />
            </div>
            <CardTitle className="text-3xl font-bold">Résultats</CardTitle>
            <p className="text-slate-500">Livret de {selectedTable}</p>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-100 p-5 text-center">
              <p className="text-sm text-slate-500">Score</p>
              <p className="mt-2 text-3xl font-extrabold text-slate-900">
                {score}/{total}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-100 p-5 text-center">
              <p className="text-sm text-slate-500">Réussite</p>
              <p className="mt-2 text-3xl font-extrabold text-slate-900">{percentage}%</p>
            </div>
            <div className="rounded-2xl bg-slate-100 p-5 text-center">
              <p className="text-sm text-slate-500">Temps</p>
              <p className="mt-2 text-3xl font-extrabold text-slate-900">
                {formatDuration(elapsedSeconds)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Corrections</CardTitle>
          </CardHeader>
          <CardContent>
            {mistakes.length === 0 ? (
              <div className="rounded-2xl bg-emerald-50 p-4 text-emerald-700">
                Parfait, aucune erreur sur cette série.
              </div>
            ) : (
              <div className="space-y-3">
                {mistakes.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col justify-between gap-2 rounded-2xl border border-slate-200 p-4 md:flex-row md:items-center"
                  >
                    <div className="font-semibold text-slate-900">
                      {item.multiplicand} × {item.multiplier}
                    </div>
                    <div className="text-sm text-slate-600">
                      Ta réponse : <span className="font-semibold text-rose-600">{item.userAnswer}</span>
                    </div>
                    <div className="text-sm text-slate-600">
                      Bonne réponse : <span className="font-semibold text-emerald-700">{item.answer}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button onClick={onRestart} className="h-12 rounded-2xl px-6">
                <RotateCcw className="mr-2 h-4 w-4" />
                Rejouer
              </Button>
              <Button variant="outline" onClick={onBackHome} className="h-12 rounded-2xl px-6">
                Changer de livret
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function LivretsApp() {
  const [screen, setScreen] = useState("home");
  const [selectedTable, setSelectedTable] = useState(6);
  const [questionCount, setQuestionCount] = useState(10);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState([]);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (screen !== "quiz") return undefined;

    const timer = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [screen]);

  const safeQuestionCount = useMemo(() => {
    if (!Number.isFinite(questionCount) || questionCount < 1) return 10;
    return Math.min(questionCount, 11);
  }, [questionCount]);

  function startQuiz() {
    const nextQuestions = generateQuestions(selectedTable, safeQuestionCount);
    setQuestions(nextQuestions);
    setCurrentIndex(0);
    setAnswer("");
    setScore(0);
    setMistakes([]);
    setElapsedSeconds(0);
    setFeedback(null);
    setScreen("quiz");
  }

  function submitAnswer() {
    const currentQuestion = questions[currentIndex];
    const parsed = Number(answer);
    const isCorrect = parsed === currentQuestion.answer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    } else {
      setMistakes((prev) => [
        ...prev,
        {
          ...currentQuestion,
          userAnswer: answer === "" ? "vide" : parsed,
        },
      ]);
    }

    setFeedback({
      correct: isCorrect,
      correctAnswer: currentQuestion.answer,
    });

    window.setTimeout(() => {
      const isLast = currentIndex >= questions.length - 1;
      setFeedback(null);
      setAnswer("");

      if (isLast) {
        setScreen("result");
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 700);
  }

  function resetToHome() {
    setScreen("home");
    setFeedback(null);
    setAnswer("");
  }

  if (screen === "home") {
    return (
      <HomePage
        selectedTable={selectedTable}
        questionCount={safeQuestionCount}
        onTableChange={setSelectedTable}
        onQuestionCountChange={setQuestionCount}
        onStart={startQuiz}
      />
    );
  }

  if (screen === "quiz") {
    return (
      <QuizPage
        questions={questions}
        currentIndex={currentIndex}
        answer={answer}
        setAnswer={setAnswer}
        onSubmit={submitAnswer}
        elapsedSeconds={elapsedSeconds}
        feedback={feedback}
      />
    );
  }

  return (
    <ResultPage
      score={score}
      total={questions.length}
      mistakes={mistakes}
      elapsedSeconds={elapsedSeconds}
      selectedTable={selectedTable}
      onRestart={startQuiz}
      onBackHome={resetToHome}
    />
  );
}
