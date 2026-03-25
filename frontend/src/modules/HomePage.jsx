import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Play, Calculator } from "lucide-react";

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

export default HomePage;