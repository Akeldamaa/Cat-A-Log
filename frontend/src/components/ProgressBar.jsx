import React, { useState, useEffect } from 'react';

const LoadingBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Update the progress every 100ms (0.1 seconds)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 100);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      <div style={{ ...styles.loadingBar, width: `${progress}%` }} />
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    height: '30px',
    backgroundColor: '#f3f3f3',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  loadingBar: {
    height: '100%',
    backgroundColor: 'purple',
    transition: 'width 0.1s linear',
  },
};

export default LoadingBar;
