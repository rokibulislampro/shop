import { useEffect, useState } from 'react';

const useCountdown = (targetEndTime, fetchNewDeal) => {
  // Define the function using a function declaration
  function calculateTimeLeft() {
    const difference = new Date(targetEndTime) - new Date(); // Calculate the difference in milliseconds

    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      // If countdown reaches 0, trigger fetchNewDeal to get a new deal
      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        fetchNewDeal(); // Fetch new deal when countdown ends
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetEndTime, fetchNewDeal]);

  return timeLeft;
};

export default useCountdown;
