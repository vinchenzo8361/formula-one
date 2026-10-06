"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Trophy, Timer, ChevronRight, RotateCcw, Home } from "lucide-react";

const ALL_QUESTIONS = [
  // Easy
  { id: 1, text: "Who won the 2021 F1 World Championship?", options: ["Lewis Hamilton", "Max Verstappen", "Charles Leclerc", "Sebastian Vettel"], answer: "Max Verstappen" },
  { id: 2, text: "Which team does Lando Norris drive for in 2024?", options: ["McLaren", "Ferrari", "Red Bull", "Mercedes"], answer: "McLaren" },
  { id: 3, text: "What color is the Ferrari F1 car?", options: ["Blue", "Red", "Silver", "Orange"], answer: "Red" },
  { id: 4, text: "Who holds the record for most World Championships (tied at 7)?", options: ["Senna & Prost", "Schumacher & Hamilton", "Vettel & Alonso", "Lauda & Piquet"], answer: "Schumacher & Hamilton" },
  { id: 5, text: "What does DRS stand for?", options: ["Drag Reduction System", "Direct Racing System", "Downforce Reduction Setup", "Driver Racing Strategy"], answer: "Drag Reduction System" },
  { id: 6, text: "Which tire compound is denoted by a red stripe?", options: ["Hard", "Medium", "Soft", "Intermediate"], answer: "Soft" },
  { id: 7, text: "Where is the Monaco Grand Prix held?", options: ["Italy", "Monaco", "France", "Spain"], answer: "Monaco" },
  { id: 8, text: "Who is known as the 'Honey Badger'?", options: ["Daniel Ricciardo", "Max Verstappen", "Valtteri Bottas", "Kevin Magnussen"], answer: "Daniel Ricciardo" },
  { id: 9, text: "What flag is waved to end a race?", options: ["Red Flag", "Yellow Flag", "Chequered Flag", "Green Flag"], answer: "Chequered Flag" },
  { id: 10, text: "Which constructor has won the most championships?", options: ["McLaren", "Mercedes", "Red Bull", "Ferrari"], answer: "Ferrari" },
  { id: 11, text: "What does 'DNF' mean?", options: ["Did Not Finish", "Drive Not Fast", "Done Now Finally", "Downforce Not Found"], answer: "Did Not Finish" },
  { id: 12, text: "Who won the 2007 F1 Championship?", options: ["Lewis Hamilton", "Kimi Raikkonen", "Fernando Alonso", "Felipe Massa"], answer: "Kimi Raikkonen" },
  { id: 13, text: "Which driver has the race number 44?", options: ["Lewis Hamilton", "Max Verstappen", "Sergio Perez", "Charles Leclerc"], answer: "Lewis Hamilton" },
  { id: 14, text: "What is the penalty for speeding in the pit lane?", options: ["Disqualification", "Stop-and-Go", "Grid Penalty", "Points Deduction"], answer: "Stop-and-Go" },
  { id: 15, text: "Who was Max Verstappen's teammate in 2023?", options: ["Daniel Ricciardo", "Sergio Perez", "Alex Albon", "Pierre Gasly"], answer: "Sergio Perez" },
  { id: 16, text: "How many drivers normally compete in an F1 race?", options: ["20", "22", "24", "18"], answer: "20" },
  { id: 17, text: "What city hosts the British Grand Prix?", options: ["London", "Silverstone", "Manchester", "Birmingham"], answer: "Silverstone" },
  { id: 18, text: "Who is the longest serving team principal at Red Bull?", options: ["Toto Wolff", "Christian Horner", "Mattia Binotto", "Guenther Steiner"], answer: "Christian Horner" },
  { id: 19, text: "Which driver is Spanish?", options: ["Charles Leclerc", "Carlos Sainz", "Pierre Gasly", "Lando Norris"], answer: "Carlos Sainz" },
  { id: 20, text: "What company supplies tires to all F1 teams currently?", options: ["Michelin", "Bridgestone", "Pirelli", "Goodyear"], answer: "Pirelli" },
  { id: 21, text: "What does a yellow flag mean?", options: ["Stop", "Caution / Danger ahead", "Let another car pass", "End of session"], answer: "Caution / Danger ahead" },
  { id: 22, text: "Who is the youngest F1 driver ever to start a race?", options: ["Lance Stroll", "Lando Norris", "Max Verstappen", "Sebastian Vettel"], answer: "Max Verstappen" },
  { id: 23, text: "Which animal is on the Ferrari logo?", options: ["Bull", "Horse", "Lion", "Panther"], answer: "Horse" },
  { id: 24, text: "How many points does a driver get for finishing 1st?", options: ["20", "25", "30", "15"], answer: "25" },
  { id: 25, text: "What does a blue flag indicate?", options: ["Oil on track", "Race suspended", "Let faster car pass", "Debris on track"], answer: "Let faster car pass" },
  // Medium
  { id: 26, text: "In what year did the V6 turbo hybrid era begin?", options: ["2012", "2014", "2016", "2010"], answer: "2014" },
  { id: 27, text: "Which team did Michael Schumacher win his first two championships with?", options: ["Ferrari", "Benetton", "Jordan", "Mercedes"], answer: "Benetton" },
  { id: 28, text: "Who holds the record for the most consecutive race wins?", options: ["Sebastian Vettel", "Alberto Ascari", "Max Verstappen", "Lewis Hamilton"], answer: "Max Verstappen" },
  { id: 29, text: "What is the name of the famous sequence of corners at Suzuka?", options: ["Maggotts and Becketts", "The Esses", "Eau Rouge", "Parabolica"], answer: "The Esses" },
  { id: 30, text: "Who was the first F1 World Champion in 1950?", options: ["Juan Manuel Fangio", "Giuseppe Farina", "Alberto Ascari", "Stirling Moss"], answer: "Giuseppe Farina" },
  { id: 31, text: "Which circuit is known as the 'Temple of Speed'?", options: ["Silverstone", "Spa-Francorchamps", "Monza", "Suzuka"], answer: "Monza" },
  { id: 32, text: "What does 'MGU-K' stand for?", options: ["Motor Generator Unit - Kinetic", "Mechanical Gear Unit - Kinetic", "Motor Gearbox Unit - KERS", "Main Generator Unit - Kinetic"], answer: "Motor Generator Unit - Kinetic" },
  { id: 33, text: "Who won the controversial 2005 United States Grand Prix?", options: ["Michael Schumacher", "Fernando Alonso", "Kimi Raikkonen", "Rubens Barrichello"], answer: "Michael Schumacher" },
  { id: 34, text: "How many gears does a modern F1 car have (excluding reverse)?", options: ["6", "7", "8", "9"], answer: "8" },
  { id: 35, text: "Which F1 driver was known as 'The Professor'?", options: ["Niki Lauda", "Alain Prost", "Ayrton Senna", "Jackie Stewart"], answer: "Alain Prost" },
  { id: 36, text: "In which city is the Yas Marina Circuit located?", options: ["Dubai", "Jeddah", "Abu Dhabi", "Doha"], answer: "Abu Dhabi" },
  { id: 37, text: "Who is the only driver to win a World Championship posthumously?", options: ["Gilles Villeneuve", "Jim Clark", "Jochen Rindt", "Ayrton Senna"], answer: "Jochen Rindt" },
  { id: 38, text: "What was the first year of the night race in Singapore?", options: ["2007", "2008", "2009", "2010"], answer: "2008" },
  { id: 39, text: "Which team introduced the 'F-Duct' in 2010?", options: ["Red Bull", "Ferrari", "McLaren", "Brawn GP"], answer: "McLaren" },
  { id: 40, text: "Who was the only driver to win a race in the six-wheeled Tyrrell P34?", options: ["Jackie Stewart", "Jody Scheckter", "Patrick Depailler", "Ronnie Peterson"], answer: "Jody Scheckter" },
  // Hard
  { id: 41, text: "Which driver has the most Grand Prix starts without a win?", options: ["Nico Hulkenberg", "Nick Heidfeld", "Martin Brundle", "Romain Grosjean"], answer: "Nico Hulkenberg" },
  { id: 42, text: "What is the minimum weight of an F1 car (without fuel) in 2024?", options: ["750 kg", "798 kg", "720 kg", "820 kg"], answer: "798 kg" },
  { id: 43, text: "Who was the last driver to win a race for Team Lotus (in 1987)?", options: ["Ayrton Senna", "Nelson Piquet", "Nigel Mansell", "Elio de Angelis"], answer: "Ayrton Senna" },
  { id: 44, text: "Which circuit hosted the only Moroccan Grand Prix in F1 history?", options: ["Ain-Diab", "Pedralbes", "Boavista", "Montjuïc"], answer: "Ain-Diab" },
  { id: 45, text: "How many points did Brawn GP score in their one and only season (2009)?", options: ["172", "150", "161", "185"], answer: "172" },
  { id: 46, text: "Who scored the first ever World Championship points for Williams?", options: ["Alan Jones", "Clay Regazzoni", "Jacques Laffite", "Carlos Reutemann"], answer: "Jacques Laffite" },
  { id: 47, text: "What engine was in the back of the 1995 Championship-winning Benetton B195?", options: ["Ford V8", "Renault V10", "Ferrari V12", "Honda V10"], answer: "Renault V10" },
  { id: 48, text: "Who holds the record for the most fastest laps in a single season?", options: ["Michael Schumacher", "Kimi Raikkonen", "Max Verstappen", "Lewis Hamilton"], answer: "Michael Schumacher" },
  { id: 49, text: "Which driver won the 1982 World Championship with only one race win that season?", options: ["Keke Rosberg", "John Watson", "Didier Pironi", "Niki Lauda"], answer: "Keke Rosberg" },
  { id: 50, text: "What is the longest circuit on the current F1 calendar?", options: ["Spa-Francorchamps", "Baku City Circuit", "Jeddah Corniche", "Las Vegas Strip"], answer: "Spa-Francorchamps" }
];

const TOTAL_QUESTIONS = 20;

export default function QuizPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    startQuiz();
  }, []);

  useEffect(() => {
    let interval: any;
    if (!isFinished && questions.length > 0) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isFinished, startTime, questions]);

  const startQuiz = () => {
    const shuffled = [...ALL_QUESTIONS].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, TOTAL_QUESTIONS));
    setCurrentIdx(0);
    setScore(0);
    setIsFinished(false);
    setStartTime(Date.now());
    setElapsedTime(0);
  };

  const handleAnswer = (option: string) => {
    if (option === questions[currentIdx].answer) {
      setScore(s => s + 1);
    }
    if (currentIdx + 1 < TOTAL_QUESTIONS) {
      setCurrentIdx(i => i + 1);
    } else {
      setIsFinished(true);
    }
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (questions.length === 0) return null;

  return (
    <div className="flex-1 p-8 text-foreground min-h-screen">
      <div className="max-w-3xl mx-auto space-y-8 relative z-10">
        <header className="mb-10 bg-panel/80 backdrop-blur p-8 rounded-3xl shadow-sm border border-gray-200/20 flex flex-col items-center justify-center text-center">
          <Trophy className="w-16 h-16 text-f1-red mb-4" />
          <h1 className="text-4xl font-extrabold tracking-tight mb-2 uppercase italic text-f1-red">F1 Ultimate Quiz</h1>
          <p className="text-text-muted text-lg font-medium">Test your Formula 1 knowledge.</p>
        </header>

        {!isFinished ? (
          <section className="bg-panel rounded-3xl p-8 shadow-sm border border-gray-200/20">
            <div className="flex items-center justify-between mb-8">
              <div className="text-sm font-bold uppercase tracking-widest text-text-muted">
                Question {currentIdx + 1} of {TOTAL_QUESTIONS}
              </div>
              <div className="flex items-center gap-2 text-f1-red font-mono font-bold bg-background px-4 py-2 rounded-full border border-gray-200/20">
                <Timer className="w-4 h-4" />
                {formatTime(elapsedTime)}
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-8 text-foreground leading-snug">
              {questions[currentIdx].text}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questions[currentIdx].options.map((opt: string) => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  className="p-6 text-left rounded-2xl bg-background border border-gray-200/20 hover:border-f1-red hover:bg-f1-red/5 transition-all text-lg font-semibold text-foreground flex items-center justify-between group"
                >
                  {opt}
                  <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-f1-red transition-colors" />
                </button>
              ))}
            </div>
          </section>
        ) : (
          <section className="bg-panel rounded-3xl p-12 shadow-sm border border-gray-200/20 text-center flex flex-col items-center">
            <Trophy className="w-20 h-20 text-f1-red mb-6" />
            <h2 className="text-5xl font-extrabold mb-4 uppercase italic tracking-tighter text-foreground">Quiz Complete!</h2>
            
            <div className="flex gap-8 my-8">
              <div className="bg-background p-6 rounded-2xl border border-gray-200/20 min-w-[150px]">
                <div className="text-sm uppercase tracking-widest font-bold text-text-muted mb-2">Final Score</div>
                <div className="text-4xl font-black text-f1-red">{score} / {TOTAL_QUESTIONS}</div>
              </div>
              <div className="bg-background p-6 rounded-2xl border border-gray-200/20 min-w-[150px]">
                <div className="text-sm uppercase tracking-widest font-bold text-text-muted mb-2">Time Taken</div>
                <div className="text-4xl font-black text-foreground font-mono">{formatTime(elapsedTime)}</div>
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <button onClick={startQuiz} className="flex items-center gap-2 bg-background hover:bg-gray-100 dark:hover:bg-gray-800 text-foreground px-8 py-4 rounded-xl font-bold transition-colors border border-gray-200/20">
                <RotateCcw className="w-5 h-5" />
                Try Again
              </button>
              <Link href="/" className="flex items-center gap-2 bg-f1-red hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold transition-colors">
                <Home className="w-5 h-5" />
                Back to Home
              </Link>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
