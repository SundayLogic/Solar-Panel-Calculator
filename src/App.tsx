import Canvas from "./components/molecules/Canvas";
import React, { useState } from 'react';

const App: React.FC = () => {
  const [angle, setAngle] = useState(0);

  return (
    <div>
      <input
        type="range"
        min="0"
        max="360"
        value={angle}
        onChange={(e) => setAngle(Number(e.target.value))}
      />
      <Canvas angle={angle} />
    </div>
  );
};

export default App;
