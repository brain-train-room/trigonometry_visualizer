export interface Point {
  x: number;
  y: number;
}

export interface CircleArc {
  center: Point;
  radius: number;
  angles: {
    from: number;
    to: number;
  };
}

export interface Line {
  a: Point;
  b: Point;
}

export interface Text {
  position: Point;
  message: string;
}

export interface Shapes {
  circles: Array<CircleArc>;
  lines: Array<Line>;
  texts: Array<Text>;
}

export function startGame(): Shapes {
  const horizontalLine = { a: { x: -5, y: -0 }, b: { x: 5, y: -0 } };
  const verticalLine = { a: { x: -0, y: -1 }, b: { x: -0, y: 1 } };

  return {
    circles: [],
    lines: [horizontalLine, verticalLine],
    texts: [],
  };
}

export function runCodeOnClick(clickPosition: Point): Shapes {
  const clickCircle = {
    center: clickPosition,
    radius: 0.02,
    angles: {
      from: 0,
      to: 360,
    },
  };

  const horizontalLine = { a: { x: -5, y: -0 }, b: { x: 5, y: -0 } };
  const verticalLine = { a: { x: -0, y: -1 }, b: { x: -0, y: 1 } };
  const radiusLine = { a: { x: 0, y: 0 }, b: clickPosition };
  const x = clickPosition.x;
  const y = clickPosition.y;
  const r = Math.sqrt(x * x + y * y);
  const buggyClickAngle = (Math.acos(x / r) / Math.PI) * 180;
  const fixedClickAngle = y > 0 ? buggyClickAngle : 360 - buggyClickAngle;
  const radius_angles = { center: { x: 0, y: 0 }, radius: r / 10, angles: { from: 0, to: fixedClickAngle } };
  console.log(fixedClickAngle);

  const center_base_circle = { center: { x: 0, y: 0 }, radius: r, angles: { from: 0, to: 360 } };
  const Sin_Line = { a: clickPosition, b: { x: x, y: 0 } };
  const Sin_text = { position: { x: x > 0 ? x - 0.05 : x + 0.05, y: y / 2 }, message: "Y" };
  const Cos_text = { position: { x: x / 2, y: y > 0 ? -0.05 : 0.078 }, message: "X" };
  const Radius_text = { position: { x: x / 2, y: y < 0 ? y / 2 - 0.03 : y / 2 + 0.078 }, message: "r" };
  const click_point_text = { position: { x: x + 0.05, y: y + 0.02 }, message: ` (${x.toFixed(2)} , ${y.toFixed(2)})` };
  const x_data = { position: { x: x > 0 ? -1.79 : 1.7, y: x > 0 ? 0.91 : 0.88 }, message: `X=${x.toFixed(2)}` };
  const y_data = { position: { x: x > 0 ? -1.76 : 1.7, y: x > 0 ? 0.81 : 0.77 }, message: `Y=${y.toFixed(2)}` };
  const r_data = { position: { x: x > 0 ? -1.79 : 1.7, y: x > 0 ? 0.71 : 0.66 }, message: `r=${r.toFixed(2)}` };
  const angle_data = { position: { x: x > 0 ? -1.71 : 1.7, y: x > 0 ? 0.61 : 0.55 }, message: `angle=${fixedClickAngle.toFixed(2)}°` };
  console.log(clickPosition);
  return {
    circles: [clickCircle, center_base_circle, radius_angles],
    lines: [horizontalLine, verticalLine, radiusLine, Sin_Line],
    texts: [click_point_text, Sin_text, Cos_text, Radius_text, x_data, y_data, r_data, angle_data],
  };
}
