import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [time, setTime] = React.useState(new Date());

  const [timer, setTimer] = React.useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });

  const updateTime = () => {
    setTime(new Date());
  }

  const updateTimer = () => {
    setTimer((prevTimer) => {
      let { seconds, minutes, hours } = prevTimer;

      seconds -= 1;

      if (seconds < 0) {
        seconds = 59;
        minutes -= 1;
      }

      if (minutes < 0) {
        minutes = 59;
        hours -= 1;
      }

      if (hours < 0) {
        hours = 0;
        minutes = 0;
        seconds = 0;
      }

      return { seconds, minutes, hours };
    });
  }

  const [isRunning, setIsRunning] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      updateTime();
      if (isRunning) {
        updateTimer();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const oneMinuteTimer = () => {
    setTimer({
      seconds: 0,
      minutes: 25,
      hours: 0,
    });
    setIsRunning(true);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          The current time is {time.toLocaleTimeString()}
        </p>
        <p>
          En france il est {time.toLocaleTimeString('fr-FR')}
        </p>
        <p>
          Timer : {timer.hours}h {timer.minutes}m {timer.seconds}s
        </p>
        <button onClick={oneMinuteTimer}>
          Start timer
        </button>
      </header>
    </div>
  );
}

export default App;
