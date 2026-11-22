import { useState, useEffect } from 'react';
import './App.css';
import yoda from './assets/yoda.jpg';

function App() {
  const deadline = new Date('2026-11-30T07:59:59Z').getTime();

  const calculateTimeLeft = () => {
    const nowTime = Date.now();
    const timediff = deadline - nowTime;

    if (timediff <= 0) {
      return "Party is over";
    }

    const totalMinutes = Math.floor(timediff / 60000);

    return {
      days: Math.floor(totalMinutes / (60 * 24)),
      hours: Math.floor((totalMinutes % (60 * 24)) / 60),
      minutes: totalMinutes % 60,
    };
  };
  console.log(calculateTimeLeft());

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    // update immediately
    setTimeLeft(calculateTimeLeft());

    const id = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000); // update every minute

    return () => clearInterval(id);
  }, []);

  return (
    <div>
      {typeof timeLeft === 'string' ? (
        <h1 className="party">{timeLeft}</h1>
      ) : (
        <>
          <h1 className='party'>{timeLeft.days} days</h1>
          <h2 className='minutes'>
            {timeLeft.hours} hours {timeLeft.minutes} minutes left
          </h2>
        </>
      )}
      <p>To yodada's end of party 😢</p>
      <img src={yoda} alt="yoda" />
    </div>
  );
}

export default App;