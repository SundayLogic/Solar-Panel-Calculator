import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

interface P5WithProps extends p5 {
  props: { angle: number; canvasWidth: number; canvasHeight: number; circleWidth: number };
}

interface CanvasProps {
  angle: number;
  canvasWidth: number;
  canvasHeight: number;
  circleWidth: number;
}

const Canvas: React.FC<CanvasProps> = ({ angle, canvasWidth, canvasHeight, circleWidth }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const p5Ref = useRef<P5WithProps | null>(null);

  useEffect(() => {
    const sketch = (p: P5WithProps) => {
      p.setup = () => {
        p.createCanvas(canvasWidth, canvasHeight);
        p.angleMode(p.DEGREES);
      };

      p.draw = () => {
        p.background(0);
        p.translate(p.width / 2, p.height / 2);

        const radius = p.height * 0.3;
        const x = p.cos(angle) * radius;
        const y = -p.sin(angle) * radius;

        p.stroke(255);
        p.noFill();
        p.ellipse(0, 0, circleWidth);

        p.stroke(255);
        p.line(0, 0, x, y);

        p.stroke('yellow');
        p.line(0, 0, x, 0);

        p.stroke('red');
        p.line(x, 0, x, y);
      };
    };

    if (canvasRef.current && !p5Ref.current) {
      p5Ref.current = new p5(sketch, canvasRef.current) as P5WithProps;
    }

    if (p5Ref.current) {
      p5Ref.current.props = { angle, canvasWidth, canvasHeight, circleWidth };
      p5Ref.current.redraw();
    }

    return () => {
      if (p5Ref.current) {
        p5Ref.current.remove();
        p5Ref.current = null;
      }
    };
  }, [angle, canvasWidth, canvasHeight, circleWidth]);

  return <div ref={canvasRef} />;
};

export default Canvas;
