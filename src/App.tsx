import Canvas from "./components/molecules/Canvas";
import React, { useState } from "react";

const App: React.FC = () => {
  const [angle, setAngle] = useState(0);

  return (
    <div className="flex justify-center items-center h-[100vh] bg-black">
      <div className="flex flex-col justify-center items-center">
        <Canvas angle={angle} canvasHeight={500} circleWidth={120} canvasWidth={400}/>
        <input
          type="range"
          min="0"
          max="360"
          value={angle}
          onChange={(e) => setAngle(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default App;
