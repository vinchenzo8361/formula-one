'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trophy, Timer, ChevronRight, RotateCcw, Home, CheckCircle2, XCircle } from 'lucide-react';

const ALL_QUESTIONS = [
  // Easy
  { id: 1, text: "Who won the 2021 F1 World Championship?", options: ["Lewis Hamilton", "Max Verstappen", "Charles Leclerc", "Sebastian Vettel"], answer: "Max Verstappen" },
  { id: 2, text: "Which team is known as the 'Silver Arrows'?", options: ["Mercedes", "McLaren", "Aston Martin", "Red Bull"], answer: "Mercedes" },
  { id: 3, text: "What does DRS stand for?", options: ["Direct Racing System", "Drag Reduction System", "Driver Reaction Speed", "Downforce Reduction System"], answer: "Drag Reduction System" },
  { id: 4, text: "Which flag is waved to signify the end of a race?", options: ["Red Flag", "Yellow Flag", "Chequered Flag", "Blue Flag"], answer: "Chequered Flag" },
  { id: 5, text: "Who holds the record for the most World Championships (tied at 7)?", options: ["Senna & Prost", "Schumacher & Hamilton", "Vettel & Fangio", "Alonso & Verstappen"], answer: "Schumacher & Hamilton" },
  { id: 6, text: "What color are Pirelli's soft compound tires usually marked with?", options: ["White", "Yellow", "Red", "Green"], answer: "Red" },
  { id: 7, text: "Which driver uses the race number 44?", options: ["Fernando Alonso", "Lando Norris", "Lewis Hamilton", "Sergio Perez"], answer: "Lewis Hamilton" },
  { id: 8, text: "What is the term for a pit stop that takes less than 2 seconds?", options: ["Hyper stop", "Sub-two stop", "Speed stop", "Flash stop"], answer: "Sub-two stop" },
  { id: 9, text: "Which track is famous for the 'Eau Rouge' corner?", options: ["Monza", "Silverstone", "Spa-Francorchamps", "Suzuka"], answer: "Spa-Francorchamps" },
  { id: 10, text: "What team did Sebastian Vettel win his 4 championships with?", options: ["Ferrari", "Mercedes", "Red Bull", "Toro Rosso"], answer: "Red Bull" },
  { id: 11, text: "Which circuit hosts the British Grand Prix?", options: ["Brands Hatch", "Donington Park", "Silverstone", "Goodwood"], answer: "Silverstone" },
  { id: 12, text: "Who is the Team Principal of Red Bull Racing (as of 2024)?", options: ["Toto Wolff", "Christian Horner", "Zak Brown", "Fred Vasseur"], answer: "Christian Horner" },
  { id: 13, text: "What does 'DNF' stand for?", options: ["Did Not Finish", "Do Not Follow", "Drive Normal Fast", "Did Not Fit"], answer: "Did Not Finish" },
  { id: 14, text: "Which country does Charles Leclerc race under?", options: ["France", "Italy", "Monaco", "Switzerland"], answer: "Monaco" },
  { id: 15, text: "What is the maximum number of cars allowed on the F1 grid?", options: ["20", "22", "24", "26"], answer: "26" },
  { id: 16, text: "Which driver is known as the 'Smooth Operator'?", options: ["Charles Leclerc", "Carlos Sainz", "George Russell", "Lando Norris"], answer: "Carlos Sainz" },
  { id: 17, text: "What part of the car produces the most downforce?", options: ["Front Wing", "Rear Wing", "The Floor", "Sidepods"], answer: "The Floor" },
  { id: 18, text: "Which driver won the 2007 World Championship by 1 point?", options: ["Lewis Hamilton", "Fernando Alonso", "Kimi Raikkonen", "Felipe Massa"], answer: "Kimi Raikkonen" },
  { id: 19, text: "What is the street circuit in Azerbaijan called?", options: ["Baku City Circuit", "Marina Bay", "Jeddah Corniche", "Albert Park"], answer: "Baku City Circuit" },
  { id: 20, text: "Which team uses a Prancing Horse as its logo?", options: ["Porsche", "Red Bull", "Ferrari", "Alfa Romeo"], answer: "Ferrari" },
  { id: 21, text: "Who is the youngest ever F1 race winner?", options: ["Sebastian Vettel", "Max Verstappen", "Charles Leclerc", "Lando Norris"], answer: "Max Verstappen" },
  { id: 22, text: "How many points are awarded for 1st place in a standard Grand Prix?", options: ["20", "25", "30", "15"], answer: "25" },
  { id: 23, text: "Which driver famously yelled 'Bwoah'?", options: ["Valtteri Bottas", "Kimi Raikkonen", "Mika Hakkinen", "Marcus Ericsson"], answer: "Kimi Raikkonen" },
  { id: 24, text: "What color flag warns a driver they are about to be lapped?", options: ["Yellow", "Black", "Blue", "White"], answer: "Blue" },
  { id: 25, text: "Which track is known as the 'Temple of Speed'?", options: ["Silverstone", "Monza", "Spa-Francorchamps", "Las Vegas"], answer: "Monza" },
  // Medium
  { id: 26, text: "Who was the first F1 World Champion in 1950?", options: ["Juan Manuel Fangio", "Alberto Ascari", "Giuseppe Farina", "Stirling Moss"], answer: "Giuseppe Farina" },
  { id: 27, text: "Which F1 circuit has the most corners?", options: ["Suzuka", "Singapore", "Jeddah", "Spa-Francorchamps"], answer: "Jeddah" },
  { id: 28, text: "What does 'MGU-K' stand for?", options: ["Motor Generator Unit - Kinetic", "Motor Generating Utility - Kinetic", "Manual Gear Unit - Kinetic", "Motor Generator Unit - Kilowatt"], answer: "Motor Generator Unit - Kinetic" },
  { id: 29, text: "Which driver holds the record for most consecutive race wins (10)?", options: ["Sebastian Vettel", "Lewis Hamilton", "Max Verstappen", "Michael Schumacher"], answer: "Max Verstappen" },
  { id: 30, text: "In what year did the 'Halo' become mandatory?", options: ["2016", "2017", "2018", "2019"], answer: "2018" },
  { id: 31, text: "Which track features a corner called 'Parabolica'?", options: ["Imola", "Mugello", "Monza", "Suzuka"], answer: "Monza" },
  { id: 32, text: "Who is the only driver to win a World Championship with a team bearing their own name?", options: ["Bruce McLaren", "Enzo Ferrari", "Jack Brabham", "Frank Williams"], answer: "Jack Brabham" },
  { id: 33, text: "What is the term for when a driver pits early to pass a rival ahead of them?", options: ["Overcut", "Undercut", "Slipstream", "Drafting"], answer: "Undercut" },
  { id: 34, text: "Which engine manufacturer powered Red Bull during their 2010-2013 championship run?", options: ["Mercedes", "Ferrari", "Renault", "Honda"], answer: "Renault" },
  { id: 35, text: "How long does a driver have to serve a 5-second time penalty during a pit stop?", options: ["Mechanics cannot touch the car for 5s", "They must wait 5s before entering the pits", "They must exit 5s slower", "It is added at the end of the race only"], answer: "Mechanics cannot touch the car for 5s" },
  { id: 36, text: "Which driver famously collided with Michael Schumacher at Jerez in 1997?", options: ["Damon Hill", "Jacques Villeneuve", "Mika Hakkinen", "David Coulthard"], answer: "Jacques Villeneuve" },
  { id: 37, text: "Who is the only driver to win a World Championship posthumously?", options: ["Gilles Villeneuve", "Jim Clark", "Jochen Rindt", "Ayrton Senna"], answer: "Jochen Rindt" },
  { id: 38, text: "What was the first year of the night race in Singapore?", options: ["2007", "2008", "2009", "2010"], answer: "2008" },
  { id: 39, text: "Which team introduced the 'F-Duct' in 2010?", options: ["Red Bull", "Ferrari", "McLaren", "Brawn GP"], answer: "McLaren" },
  { id: 40, text: "Who was the only driver to win a race in the six-wheeled Tyrrell P34?", options: ["Jackie Stewart", "Jody Scheckter", "Patrick Depailler", "Ronnie Peterson"], answer: "Jody Scheckter" },
  // Hard
  { id: 41, text: "Which driver has the most Grand Prix starts without a win?", options: ["Nico Hulkenberg", "Nick Heidfeld", "Martin Brundle", "Romain Grosjean"], answer: "Nico Hulkenberg" },
  { id: 42, text: "What is the minimum weight of an F1 car (without fuel) in 2024?", options: ["750 kg", "798 kg", "720 kg", "820 kg"], answer: "798 kg" },
  { id: 43, text: "Who was the last driver to win a race for Team Lotus (in 1987)?", options: ["Ayrton Senna", "Nelson Piquet", "Nigel Mansell", "Elio de Angelis"], answer: "Ayrton Senna" },
  { id: 44, text: "Which circuit hosted the only Moroccan Grand Prix in F1 history?", options: ["Ain-Diab", "Pedralbes", "Boavista", "Montju�c"], answer: "Ain-Diab" },
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
  
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showReview, setShowReview] = useState(false);

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
    setUserAnswers([]);
    setShowReview(false);
  };

  const handleAnswer = (option: string) => {
    setUserAnswers(prev => [...prev, option]);
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
    return m + ':' + s.toString().padStart(2, '0');
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
        ) : showReview ? (
          <section className="bg-panel rounded-3xl p-8 shadow-sm border border-gray-200/20 space-y-6">
             <div className="flex justify-between items-center mb-6">
               <h2 className="text-2xl font-bold">Review Answers</h2>
               <button onClick={() => setShowReview(false)} className="text-f1-red hover:underline font-semibold">
                 Back to Results
               </button>
             </div>
             
             <div className="space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar pr-4">
               {questions.map((q: any, i: number) => {
                 const isCorrect = userAnswers[i] === q.answer;
                 return (
                   <div key={i} className="p-4 rounded-xl border border-gray-200/20 bg-background">
                     <p className="font-semibold mb-3">Q{i+1}: {q.text}</p>
                     <div className="space-y-2">
                       <div className={"flex items-center gap-2 p-2 rounded-lg " + (isCorrect ? "bg-green-500/10 text-green-700 dark:text-green-400" : "bg-red-500/10 text-red-700 dark:text-red-400")}>
                         {isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                         <span className="font-medium">You chose: {userAnswers[i]}</span>
                       </div>
                       {!isCorrect && (
                         <div className="flex items-center gap-2 p-2 rounded-lg bg-green-500/10 text-green-700 dark:text-green-400">
                           <CheckCircle2 className="w-5 h-5" />
                           <span className="font-medium">Correct answer: {q.answer}</span>
                         </div>
                       )}
                     </div>
                   </div>
                 );
               })}
             </div>
          </section>
        ) : (
          <section className="bg-panel rounded-3xl p-12 shadow-sm border border-gray-200/20 text-center flex flex-col items-center">
            <Trophy className="w-20 h-20 text-f1-red mb-6" />
            <h2 className="text-5xl font-extrabold mb-4 uppercase italic tracking-tighter text-foreground">Quiz Complete!</h2>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 my-8">
              <div className="bg-background p-6 rounded-2xl border border-gray-200/20 min-w-[150px]">
                <div className="text-sm uppercase tracking-widest font-bold text-text-muted mb-2">Final Score</div>
                <div className="text-4xl font-black text-f1-red">{score} / {TOTAL_QUESTIONS}</div>
              </div>
              <div className="bg-background p-6 rounded-2xl border border-gray-200/20 min-w-[150px]">
                <div className="text-sm uppercase tracking-widest font-bold text-text-muted mb-2">Time Taken</div>
                <div className="text-4xl font-black text-foreground font-mono">{formatTime(elapsedTime)}</div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <button onClick={() => setShowReview(true)} className="flex items-center justify-center gap-2 bg-background hover:bg-gray-100 dark:hover:bg-gray-800 text-foreground px-8 py-4 rounded-xl font-bold transition-colors border border-gray-200/20 w-full md:w-auto">
                <CheckCircle2 className="w-5 h-5" />
                Review Answers
              </button>
              <button onClick={startQuiz} className="flex items-center justify-center gap-2 bg-background hover:bg-gray-100 dark:hover:bg-gray-800 text-foreground px-8 py-4 rounded-xl font-bold transition-colors border border-gray-200/20 w-full md:w-auto">
                <RotateCcw className="w-5 h-5" />
                Try Again
              </button>
              <Link href="/" className="flex items-center justify-center gap-2 bg-f1-red hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold transition-colors w-full md:w-auto">
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
