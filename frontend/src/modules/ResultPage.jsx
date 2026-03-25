import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, Trophy } from "lucide-react";

import { formatDuration } from "@/lib/questions"

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

export default ResultPage;