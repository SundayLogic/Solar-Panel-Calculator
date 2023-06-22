import Canvas from "./components/molecules/Canvas";
import React, { useState } from "react";

const App: React.FC = () => {
  const [angle, setAngle] = useState(0);
  const [circleRotation, setCircleRotation] = useState(0);  // New state

  return (
    <div className="flex justify-center items-center h-[100vh] bg-black">
      <div className="flex flex-col justify-center items-center space-y-10">
        <Canvas angle={angle} circleRotation={circleRotation} canvasHeight={200} circleWidth={160} canvasWidth={500} />
        
        <div>
          <label className="text-white">Angle:</label>
          <input
            type="range"
            min="0"
            max="360"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
          />
        </div>
        
        <div>
          <label className="text-white">Circle Rotation:</label>
          <input
            type="range"
            min="0"
            max="360"
            value={circleRotation}
            onChange={(e) => setCircleRotation(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
