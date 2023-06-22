import React, { useEffect, useRef } from "react";
import p5 from "p5";

interface SketchProps {
  frequency: number;
}

const Sketch: React.FC<SketchProps> = (props) => {
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let myp5: p5 | null = null;

    function sketch(p: p5) {
      let x = 0;

      p.setup = function () {
        p.createCanvas(400, 400);
      };

      p.draw = function () {
        p.background(0);
        p.translate(0, p.height / 2);
        p.stroke(255);

        for (let i = 0; i < p.width; i++) {
          const y = 100 * p.sin(x);
          p.point(i, y);
          x += props.frequency;
        }
      };
    }

    if (sketchRef.current) {
      myp5 = new p5(sketch, sketchRef.current);
    }

    return () => {
      myp5?.remove();
    };
  }, [props.frequency]);

  return <div ref={sketchRef} />;
};

export default Sketch;
