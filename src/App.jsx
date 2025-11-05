import { useEffect, useState } from 'react';
import './App.css';

const initialDimensions = () => {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0 };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

export default function App() {
  const [dimensions, setDimensions] = useState(initialDimensions);
  const [userAgent, setUserAgent] = useState(() =>
    typeof navigator === 'undefined' ? 'Unavailable' : navigator.userAgent,
  );

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setUserAgent(navigator.userAgent);
    }
  }, []);

  return (
    <div className="fingerprint-container">
      <h2>User Information</h2>
      <table className="fingerprint-table">
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>window.width</td>
            <td>{dimensions.width}px</td>
          </tr>
          <tr>
            <td>window.height</td>
            <td>{dimensions.height}px</td>
          </tr>
          <tr>
            <td>navigator.userAgent</td>
            <td>{userAgent}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
