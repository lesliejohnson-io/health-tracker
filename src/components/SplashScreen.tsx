import { useEffect } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center cursor-pointer"
      onClick={onFinish}
    >
      <div className="text-center animate-fade-in">
        <h1 className="text-6xl font-bold tracking-tight text-primary mb-3">
          Calibrate
        </h1>
        <p className="text-muted text-lg">Track. Train. Transform.</p>
      </div>
    </div>
  );
};
