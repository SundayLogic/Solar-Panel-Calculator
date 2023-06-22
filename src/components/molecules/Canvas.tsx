import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const canvasWidth = 800;
const canvasHeight = 800;

interface P5WithProps extends p5 {
  props: { angle: number };
}

interface CanvasProps {
  angle: number;
}

const Canvas: React.FC<CanvasProps> = ({ angle }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const p5Ref = useRef<P5WithProps>();

  const sketch = (p: P5WithProps) => {
    p.setup = () => {
      p.createCanvas(canvasWidth, canvasHeight);
      p.angleMode(p.DEGREES);
    };

    p.draw = () => {
      p.background(0);
      p.translate(p.width / 2, p.height / 2);

      p.stroke(255);
      p.noFill();
      p.ellipse(0, 0, canvasHeight * 0.6);

      p.stroke(255);
      const x = Math.cos(p.props.angle) * canvasHeight * 0.3;
      const y = -Math.sin(p.props.angle) * canvasHeight * 0.3;
      p.line(0, 0, x, y);

      p.stroke('blue');
      p.line(0, 0, x, 0);
      p.stroke('red');
      p.line(0, 0, 0, y);
    };
  };

  useEffect(() => {
    p5Ref.current = new p5(sketch as any, canvasRef.current as HTMLElement) as P5WithProps; 
    return () => {
      p5Ref.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (p5Ref.current) {
      p5Ref.current.props = { angle };
      p5Ref.current.redraw();
    }
  }, [angle]);

  return <div ref={canvasRef}></div>;
};

export default Canvas;
