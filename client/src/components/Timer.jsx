import React, { useEffect, useState } from 'react';

function Timer({ timeLeft, totalTime }) {
  const [seconds, setSeconds] = useState(timeLeft);

  useEffect(() => {
    setSeconds(timeLeft);
  }, [timeLeft]);

  const segments = 20; // number of blocks
  const activeSegments = Math.ceil((seconds / totalTime) * segments);

  return (
    <div className="flex flex-col items-center w-40 mx-auto">
      <div className="flex justify-between w-full mb-2">
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-3 mx-0.5 rounded-full transition-all duration-300`}
            style={{
              background: i < activeSegments
                ? `linear-gradient(90deg, #10b981, #06b6d4)` // active gradient
                : '#e5e7eb', // inactive gray
            }}
          />
        ))}
      </div>
      <div className="text-2xl font-bold text-gray-800">{seconds}s</div>
    </div>
  );
}

export default Timer;