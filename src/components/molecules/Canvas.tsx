import React, { useEffect, useRef } from "react";
import p5 from "p5";

interface P5WithProps extends p5 {
  props: {
    angle: number;
    circleRotation: number;
    canvasWidth: number;
    canvasHeight: number;
    circleWidth: number;
  };
}

interface CanvasProps {
  angle: number;
  circleRotation: number;
  canvasWidth: number;
  canvasHeight: number;
  circleWidth: number;
}

const Canvas: React.FC<CanvasProps> = ({
  angle,
  circleRotation,
  canvasWidth,
  canvasHeight,
  circleWidth,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const p5Ref = useRef<P5WithProps | null>(null);

  useEffect(() => {
    const sketch = (p: P5WithProps) => {
      p.setup = () => {
        p.createCanvas(canvasWidth, canvasHeight, p.WEBGL); // Added p.WEBGL to enable 3D mode
        p.angleMode(p.DEGREES);
      };
      p.draw = () => {
        p.background(0);
        p.rotateX(circleRotation);

        const radius = Math.min(circleWidth / 2, canvasHeight / 2 - 10);
        const x = p.cos(angle) * radius;
        const y = -p.sin(angle) * radius;
        const z = radius;

        // Draw the circle path
        p.stroke(255);
        p.noFill();
        p.beginShape();
        for (let a = 0; a < 360; a += 1) {
          const x = radius * p.cos(a);
          const y = radius * p.sin(a);
          p.vertex(x, y, 0);
        }
        p.endShape(p.CLOSE);

        // Draw the lines
        p.stroke(255);
        p.line(0, 0, 0, x, y, 0); // White line

        p.stroke("yellow");
        p.line(0, 0, 0, x, 0, 0); // Yellow line

        p.stroke("red");
        p.line(x, 0, 0, x, y, 0); // Red line

        p.stroke("pink");
        p.line(0, 0, 0, 0, 0, z); // Pink line (z-axis)

        p.stroke("green"); // Make this green for visibility
        p.line(0, 0, z, x, y, 0); // Line from pink z-axis to edge where white and red connect

        p.stroke("orange"); // Make this blue for visibility
        p.line(0, 0, z, x, 0, 0); // Line from pink z-axis to edge where yellow and red connect
      };
    };

    if (canvasRef.current && !p5Ref.current) {
      p5Ref.current = new p5(sketch, canvasRef.current) as P5WithProps;
    }

    if (p5Ref.current) {
      p5Ref.current.props = {
        angle,
        circleRotation,
        canvasWidth,
        canvasHeight,
        circleWidth,
      };
      p5Ref.current.redraw();
    }

    return () => {
      if (p5Ref.current) {
        p5Ref.current.remove();
        p5Ref.current = null;
      }
    };
  }, [angle, circleRotation, canvasWidth, canvasHeight, circleWidth]);

  return <div className="h-[20vh] bg-green-100" ref={canvasRef} />;
};

export default Canvas;
