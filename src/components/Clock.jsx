import FlipCard from './FlipCard';
import '../styles/clock.css';
import { useEffect, useState } from 'react';

const Clock = () => {
  const [previousTime, setPreviousTime] = useState(new Date(Date.now() - 1000));
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      const time = new Date().getTime();
      setPreviousTime(new Date(time - 1000));
      setCurrentTime(new Date(time));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const twoDigits = (number) => {
    if (typeof number !== 'number') return number;

    const result = number > 9 ? number : '0' + number;

    return result
      .toString()
      .split('')
      .map((digit) => parseInt(digit));
  };

  return (
    <div className="clock">
      {twoDigits(previousTime.getHours()).map((digit, index) => (
        <FlipCard
          key={index}
          previousTime={
            twoDigits(
              currentTime.getHours() > 12
                ? currentTime.getHours() - 12
                : currentTime.getHours()
            )[index]
          }
          currentTime={
            twoDigits(
              currentTime.getHours() > 12
                ? currentTime.getHours() - 12
                : currentTime.getHours()
            )[index]
          }
        />
      ))}
      <span>:</span>
      {twoDigits(previousTime.getMinutes()).map((digit, index) => (
        <FlipCard
          key={index}
          previousTime={digit}
          currentTime={twoDigits(currentTime.getMinutes())[index]}
        />
      ))}
      <span>:</span>
      {twoDigits(previousTime.getSeconds()).map((digit, index) => (
        <FlipCard
          key={index}
          previousTime={digit}
          currentTime={twoDigits(currentTime.getSeconds())[index]}
        />
      ))}
      <FlipCard
        previousTime={previousTime.getHours() >= 12 ? 'PM' : 'AM'}
        currentTime={currentTime.getHours() >= 12 ? 'PM' : 'AM'}
      />
    </div>
  );
};

export default Clock;
