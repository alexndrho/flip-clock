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

  return (
    <div className="clock">
      <FlipCard
        previousTime={
          previousTime.getHours() > 12
            ? previousTime.getHours() - 12
            : previousTime.getHours()
        }
        currentTime={
          previousTime.getHours() > 12
            ? previousTime.getHours() - 12
            : previousTime.getHours()
        }
      />
      :
      <FlipCard
        previousTime={previousTime.getMinutes()}
        currentTime={currentTime.getMinutes()}
      />
      :
      <FlipCard
        previousTime={previousTime.getSeconds()}
        currentTime={currentTime.getSeconds()}
      />
      <FlipCard
        previousTime={previousTime.getHours() > 12 ? 'PM' : 'AM'}
        currentTime={currentTime.getHours() > 12 ? 'PM' : 'AM'}
      />
    </div>
  );
};

export default Clock;
