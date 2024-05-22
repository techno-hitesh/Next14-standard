import { useState, useEffect } from 'react';
import styles from './NumberCounter.module.css';

const NumberCounter = ({ targetNumber }:{targetNumber:any}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count < targetNumber) {
        setCount(count + 1);
      } else {
        clearInterval(interval);
      }
    }, 10); // Adjust the interval for animation speed

    return () => clearInterval(interval);
  }, [count, targetNumber]);

  return (
    <div>
      {count}+
    </div>
  );
};

export default NumberCounter;
