import React, { useEffect, useRef, useCallback } from "react";
import p5 from "p5";

// Constants
const CIRCLE_DEGREES = 360;
const DIVISOR_FOR_RADIUS = 2;
const OFFSET_FOR_RADIUS = 10;
const TEXT_SIZE = 24;
const TEXT_OFFSET_Y = 30;
const TEXT_OFFSET_ANGLE = 60;
const COLOR_YELLOW_LINE = 'yellow';
const COLOR_RED_LINE = 'red';
const COLOR_WHITE_LINE = 'white';
const COLOR_PINK_LINE = 'pink';
const COLOR_GREEN_LINE = 'green';
const COLOR_BLUE_LINE = 'orange';

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

  const sketch = useCallback((p: P5WithProps) => {
    p.setup = () => {
      p.createCanvas(canvasWidth, canvasHeight, p.WEBGL);
      p.angleMode(p.DEGREES);
    };

    const drawLines = (p: P5WithProps, x: number, y: number, z: number) => {
      // Draw the circle path
      p.stroke(COLOR_WHITE_LINE);
      p.noFill();
      p.beginShape();
      for (let a = 0; a < CIRCLE_DEGREES; a += 1) {
        const x = circleWidth / DIVISOR_FOR_RADIUS * p.cos(a);
        const y = circleWidth / DIVISOR_FOR_RADIUS * p.sin(a);
        p.vertex(x, y, 0);
      }
      p.endShape(p.CLOSE);

      // Draw the lines
      p.stroke(COLOR_WHITE_LINE);
      p.line(0, 0, 0, x, y, 0); // White line

      p.stroke(COLOR_YELLOW_LINE);
      p.line(0, 0, 0, x, 0, 0); // Yellow line

      p.stroke(COLOR_RED_LINE);
      p.line(x, 0, 0, x, y, 0); // Red line

      p.stroke(COLOR_PINK_LINE);
      p.line(0, 0, 0, 0, 0, z); // Pink line (z-axis)

      p.stroke(COLOR_GREEN_LINE);
      p.line(0, 0, z, x, y, 0); // Green line

      p.stroke(COLOR_BLUE_LINE);
      p.line(0, 0, z, x, 0, 0); // Blue line
    };

    const drawText = (p: P5WithProps, x: number, y: number, angle: number) => {
      // Display the cosine, sine and the angle
      p.fill(255);
      p.textSize(TEXT_SIZE);
      p.text(
        `cosine length (yellow line): ${x.toFixed(2)}`,
        -canvasWidth / 2,
        -canvasHeight / 2,
        200,
        100
      );
      p.text(
        `sine length (red line): ${y.toFixed(2)}`,
        -canvasWidth / 2,
        -canvasHeight / 2 + TEXT_OFFSET_Y,
        200,
        100
      );
      p.text(
        `Current angle: ${angle.toFixed(2)} degrees`,
        -canvasWidth / 2,
        -canvasHeight / 2 + TEXT_OFFSET_ANGLE,
        200,
        100
      );
    };

    p.draw = () => {
      p.background(0);
      p.rotateX(circleRotation);

      const radius = Math.min(circleWidth / DIVISOR_FOR_RADIUS, canvasHeight / DIVISOR_FOR_RADIUS - OFFSET_FOR_RADIUS);
      const x = p.cos(angle) * radius;
      const y = -p.sin(angle) * radius;
      const z = radius;

      drawLines(p, x, y, z);
      drawText(p, x, y, angle);
    };
  }, [angle, circleRotation, canvasWidth, canvasHeight, circleWidth]);

  useEffect(() => {
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
  }, [sketch]);

  return <div className="h-[20vh] bg-green-100" ref={canvasRef} />;
};

export default Canvas;
