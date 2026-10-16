import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Clock3, RotateCcw, Trophy, XCircle } from 'lucide-react';
import preguntas from '../data/preguntas.json';
import { getCurrentUser, updateUserProfile } from '../services/authService';

const DIFFICULTIES = {
  easy: { label: 'Fácil', questions: 5, points: 10, time: 20, color: 'emerald' },
  medium: { label: 'Medio', questions: 10, points: 20, time: 15, color: 'amber' },
  hard: { label: 'Experto', questions: 20, points: 30, time: 12, color: 'rose' },
};

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

export default function Trivia() {
  // Añadimos el estado del usuario
  const [user, setUser] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const settings = difficulty ? DIFFICULTIES[difficulty] : null;
  const currentQuestion = questions[currentIndex];
  const hasAnswered = selectedAnswer !== null;
  const progress = settings ? ((currentIndex + (hasAnswered ? 1 : 0)) / settings.questions) * 100 : 0;

  const difficultyCards = useMemo(
    () => [
      { id: 'easy', title: 'Fácil', description: 'Para empezar a calentar', colors: 'border-emerald-200 bg-emerald-50 hover:border-emerald-400 hover:bg-emerald-100' },
      { id: 'medium', title: 'Medio', description: 'Demuestra lo que sabes', colors: 'border-amber-200 bg-amber-50 hover:border-amber-400 hover:bg-amber-100' },
      { id: 'hard', title: 'Experto', description: 'Solo para expertos', colors: 'border-rose-200 bg-rose-50 hover:border-rose-400 hover:bg-rose-100' },
    ],
    [],
  );

  useEffect(() => {
    if (!difficulty || finished || hasAnswered) return undefined;

    const timer = window.setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          window.clearInterval(timer);
          setSelectedAnswer('__timeout__');
          return 0;
        }
        return time - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [difficulty, finished, hasAnswered, currentIndex]);

  const startTrivia = (selectedDifficulty) => {
    const selectedSettings = DIFFICULTIES[selectedDifficulty];
    setDifficulty(selectedDifficulty);
    setQuestions(shuffle(preguntas).slice(0, selectedSettings.questions));
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setTimeLeft(selectedSettings.time);
    setFinished(false);
  };

  const selectAnswer = (answer) => {
    if (hasAnswered) return;
    setSelectedAnswer(answer);
    if (answer === currentQuestion.correcta) {
      setScore((currentScore) => currentScore + settings.points);
    }
  };

  const goToNextQuestion = () => {
    if (currentIndex === questions.length - 1) {
      if (user) {
        const updatedUser = updateUserProfile({ points: (user.points || 0) + score });
        setUser(updatedUser);
      }
      setFinished(true);
      return;
    }
    setCurrentIndex((index) => index + 1);
    setSelectedAnswer(null);
    setTimeLeft(settings.time);
  };

  if (!difficulty) {
    return (
      <div className="min-h-full bg-slate-50 px-4 pb-6 font-sans">
        <header className="rounded-b-3xl bg-[#0047AB] px-5 pb-8 pt-8 text-center text-white shadow-md">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-blue-200">JONRÓN</p>
          <h1 className="mt-1 text-3xl font-black">Trivia MLB</h1>
          <p className="mx-auto mt-2 max-w-xs text-sm text-blue-100">
            Responde antes de que se acabe el tiempo y demuestra cuánto sabes de béisbol.
          </p>
        </header>

        <section className="mx-auto max-w-sm py-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-700">Elige tu nivel</h2>
            <span className="text-xs font-semibold text-slate-400">100 preguntas disponibles</span>
          </div>
          <div className="space-y-3">
            {difficultyCards.map((card) => {
              const cardSettings = DIFFICULTIES[card.id];
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => startTrivia(card.id)}
                  className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${card.colors}`}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-base font-black text-slate-800">{card.title}</span>
                    <span className="mt-0.5 block text-xs text-slate-500">{card.description}</span>
                  </span>
                  <span className="text-right">
                    <span className="block text-sm font-black text-slate-700">{cardSettings.questions} preguntas</span>
                    <span className="block text-[11px] font-semibold text-slate-400">
                      {cardSettings.points} punto{cardSettings.points > 1 ? 's' : ''} c/u
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mt-5 rounded-2xl bg-blue-50 p-4 text-center text-xs font-medium text-blue-800">
            Tienes entre {DIFFICULTIES.hard.time} y {DIFFICULTIES.easy.time} segundos para responder cada pregunta.
          </div>
        </section>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="min-h-full bg-slate-50 px-4 pb-6 font-sans">
        <section className="mx-auto flex min-h-[700px] max-w-sm flex-col items-center justify-center text-center">
          <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-amber-100 text-5xl shadow-inner">
            <Trophy className="text-amber-500" size={50} />
          </div>
          <p className="text-xs font-black uppercase tracking-[0.25em] text-blue-600">Trivia terminada</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">¡Buen juego!</h1>
          <p className="mt-2 text-sm text-slate-500">Completaste el nivel {settings.label}.</p>
          <div className="my-7 w-full rounded-3xl bg-[#0047AB] p-6 text-white shadow-lg">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200">Puntos ganados</span>
            <strong className="mt-1 block text-6xl font-black">{score}</strong>
            <span className="text-xs text-blue-200">de {settings.questions * settings.points} posibles</span>
          </div>
          {/* Mostramos una alerta si el usuario jugó sin sesión iniciada */}
          {!user && (
            <p className="text-xs text-rose-500 font-bold mb-4">Inicia sesión en tu perfil para guardar estos puntos.</p>
          )}
          <button
            type="button"
            onClick={() => startTrivia(difficulty)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-3 text-sm font-black text-slate-950 shadow-sm transition hover:bg-amber-300"
          >
            <RotateCcw size={17} /> Jugar de nuevo
          </button>
          <button
            type="button"
            onClick={() => setDifficulty(null)}
            className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
          >
            Cambiar dificultad
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-slate-50 px-4 pb-6 font-sans">
      <section className="mx-auto max-w-sm pt-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Trivia MLB</p>
            <h1 className="text-xl font-black text-slate-900">Nivel {settings.label}</h1>
          </div>
          <div className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-black ${timeLeft <= 5 ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-700'}`}>
            <Clock3 size={16} />
            {timeLeft}s
          </div>
        </div>

        <div className="mb-5 h-2 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-amber-400 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        <div className="mb-3 flex items-center justify-between text-xs font-bold text-slate-400">
          <span>Pregunta {currentIndex + 1} de {questions.length}</span>
          <span className="text-blue-600">{score} puntos</span>
        </div>

        <article className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-lg font-black leading-snug text-slate-900">{currentQuestion.pregunta}</h2>
          <div className="mt-5 space-y-2.5">
            {currentQuestion.opciones.map((answer) => {
              const isCorrect = answer === currentQuestion.correcta;
              const isSelected = answer === selectedAnswer;
              let answerClass = 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50';
              if (hasAnswered && isCorrect) answerClass = 'border-emerald-500 bg-emerald-50 text-emerald-800';
              else if (hasAnswered && isSelected) answerClass = 'border-rose-500 bg-rose-50 text-rose-800';

              return (
                <button
                  key={answer}
                  type="button"
                  disabled={hasAnswered}
                  onClick={() => selectAnswer(answer)}
                  className={`flex w-full items-center justify-between rounded-xl border p-3.5 text-left text-sm font-bold transition ${answerClass}`}
                >
                  <span>{answer}</span>
                  {hasAnswered && isCorrect && <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />}
                  {hasAnswered && isSelected && !isCorrect && <XCircle size={18} className="shrink-0 text-rose-600" />}
                </button>
              );
            })}
          </div>
        </article>

        {hasAnswered && (
          <div className={`mt-4 rounded-2xl p-4 text-center text-sm font-bold ${selectedAnswer === '__timeout__' ? 'bg-amber-50 text-amber-800' : selectedAnswer === currentQuestion.correcta ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
            {selectedAnswer === '__timeout__'
              ? 'Se acabó el tiempo. La respuesta correcta está marcada en verde.'
              : selectedAnswer === currentQuestion.correcta
                ? `¡Correcto! +${settings.points} punto${settings.points > 1 ? 's' : ''}.`
                : currentQuestion.explicacion}
          </div>
        )}

        <button
          type="button"
          disabled={!hasAnswered}
          onClick={goToNextQuestion}
          className="mt-4 w-full rounded-xl bg-[#0047AB] px-4 py-3.5 text-sm font-black text-white shadow-sm transition enabled:hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {currentIndex === questions.length - 1 ? 'Ver resultado' : 'Siguiente pregunta'}
        </button>
      </section>
    </div>
  );
}
