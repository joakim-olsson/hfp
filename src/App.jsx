import { useEffect, useRef, useState } from 'react';
import './App.css';

export default function App() {
  const [dimensions, setDimensions] = useState(initialDimensions);
  const [userAgent, setUserAgent] = useState(() =>
    typeof navigator === 'undefined' ? 'Unavailable' : navigator.userAgent,
  );
  const hasReported = useRef(false);

  const data = useRef({
    "loaded_at": performance.timeOrigin + performance.now(),
    "user_agent": navigator.userAgent,
    "window_size": [],
  });

  const submitData = () => {
    data.current.clicked_at = performance.timeOrigin + performance.now();
    
    fetch('/api/visit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data.current),
    })
      .catch((error) => {
        if (import.meta.env.DEV) {
          console.warn('Failed to report visit', error);
        }
      });

    alert("Identification complete, awaiting decision")
  };

  // Capture window size changes
  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window === 'undefined') {
        const width = 0;
        const height = 0;
      } else {
        const width = window.innerWidth;
        const height = window.innerHeight;
      }

      data.current.window_size.push({
        "ts": performance.timeOrigin + performance.now(),
        "width": width,
        "height": height,
      })
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div className="fingerprint-container">
      <h2>User identification in progress</h2>
      <button onClick={submitData}>I am human</button>
    </div>
  );
}
