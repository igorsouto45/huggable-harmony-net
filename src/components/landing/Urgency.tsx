import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

export const Urgency = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 22, seconds: 54 });
  const [remainingTickets, setRemainingTickets] = useState(87);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-10 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <div className="space-y-2">
            <h3 className="text-xl font-bold uppercase tracking-widest text-secondary">Sorteio Hoje!</h3>
            <div className="flex gap-4 justify-center">
              <TimeUnit value={timeLeft.hours} label="Horas" />
              <TimeUnit value={timeLeft.minutes} label="Min" />
              <TimeUnit value={timeLeft.seconds} label="Seg" />
            </div>
          </div>
          
          <div className="w-full max-w-xs space-y-3">
            <div className="flex justify-between items-end">
              <h3 className="text-lg font-bold">Restam poucos números</h3>
              <span className="text-secondary font-black text-2xl animate-pulse">{remainingTickets}</span>
            </div>
            <Progress value={remainingTickets} className="h-3 bg-white/20" />
            <p className="text-sm opacity-80 text-right font-medium">Corra antes que acabe!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-2 min-w-[60px] border border-white/20">
      <span className="text-2xl md:text-3xl font-black">{value.toString().padStart(2, '0')}</span>
    </div>
    <span className="text-[10px] uppercase font-bold mt-1 opacity-70 tracking-tighter">{label}</span>
  </div>
);
