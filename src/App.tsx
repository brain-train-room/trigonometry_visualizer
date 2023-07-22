import { MouseEvent as ReactMouseEvent, useRef, useEffect, MutableRefObject, useState, useReducer } from "react";
import "./App.css";
import { Point, runCodeOnClick, Shapes, startGame } from "./weilin-code-trig";

export interface VisualizerProps extends Shapes {
  clicked: (e: ReactMouseEvent) => void;
}

const imgCache = new Map<string, HTMLImageElement>();

function getImg(filename: string): { img: HTMLImageElement; redraw: boolean } {
  const cached = imgCache.get(filename);
  if (cached) {
    return { img: cached, redraw: false };
  }

  const img = new Image(100, 100);
  img.src = filename;
  imgCache.set(filename, img);
  return { img, redraw: true };
}

function Visualizer(props: VisualizerProps) {
  const canvasRef: MutableRefObject<null | HTMLCanvasElement> = useRef(null);

  const [redrawSignal, doRedraw] = useReducer((s: number, a: void) => s + 1, 0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    function pos(p: Point): [number, number] {
      const x = (p.x * height) / 2 + width / 2;
      const y = (-p.y * height) / 2 + height / 2;
      return [x, y];
    }

    for (const l of props.lines) {
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#000000";
      ctx.fillStyle = "#000000";

      ctx.beginPath();
      ctx.moveTo(...pos(l.a));
      ctx.lineTo(...pos(l.b));
      ctx.stroke();
    }

    for (const c of props.circles) {
      ctx.beginPath();
      ctx.arc(...pos(c.center), (c.radius * height) / 2, (-(c.angles?.to ?? 360) / 360) * 2 * Math.PI, (-(c.angles?.from ?? 0) / 360) * 2 * Math.PI, false);
      ctx.lineWidth = 5;
      ctx.strokeStyle = "#ff0000";
      ctx.stroke();
    }

    for (const t of props.texts) {
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "bold 48px serif";
      ctx.fillStyle = "#000000";
      ctx.fillText(t.message, ...pos(t.position));
    }
  }, [props, redrawSignal]);

  return (
    <canvas
      ref={canvasRef}
      width="2000"
      height="1000"
      style={{ border: "solid green 10px", width: "160vh", height: "80vh", backgroundColor: "white", borderRadius: "40px" }}
      onClick={props.clicked}
    />
  );
}

// function addBothHandler(clickPosition: Point, previousShapes: ShapesAndState): ShapesAndState {
//   const lines = [...previousShapes.lines];
//   lines.push({ a: { x: 0, y: 0 }, b: { x: clickPosition.x, y: clickPosition.y } });
//   const circles = [...previousShapes.circles];
//   circles.push({ center: { x: clickPosition.x, y: clickPosition.y }, radius: 0.2, angles: { from: 0, to: 360 } });
//   return { circles, lines, texts: [], images: [], state: initialState };
// }

// function drawBothHandler(clickPosition: Point, previousShapes: ShapesAndState): ShapesAndState {
//   return {
//     circles: [{ center: clickPosition, radius: 0.2, angles: { from: 0, to: 360 } }],
//     lines: [{ a: { x: 0, y: 0 }, b: clickPosition }],
//     texts: [],
//     images: [],
//     state: initialState,
//   };
// }

const handler = runCodeOnClick;

export function App() {
  const [visProps, setVisProps] = useState<Shapes>(startGame());

  function clicked(e: ReactMouseEvent) {
    const ne = e.nativeEvent;
    // console.log(ne.offsetX, ne.offsetY);
    const t = ne.target;
    if (!t || !(t instanceof HTMLCanvasElement)) return;
    const w = t.clientWidth;
    const h = t.clientHeight;
    const x = (((ne.offsetX - t.clientWidth / 2) / (t.clientWidth / 2)) * t.clientWidth) / t.clientHeight;
    const y = -(ne.offsetY - t.clientHeight / 2) / (t.clientHeight / 2);
    // console.log(x, y);
    const newShapes = handler({ x, y });
    setVisProps(newShapes);
  }

  return <Visualizer {...visProps} clicked={clicked} />;
}
