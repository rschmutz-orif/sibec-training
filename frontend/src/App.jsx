import React, { useEffect, useMemo, useState } from "react";

import { generateQuestions } from "@/lib/questions"

import HomePage from "@/modules/HomePage";
import QuizPage from "@/modules/QuizPage";
import ResultPage from "@/modules/ResultPage";

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
