export interface Point {
  x: number;
  y: number;
}

export interface CircleArc {
  center: Point;
  radius: number;
  angles?: {
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

type ImgDigit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type ImgFirstTens = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
type ImgNums = `${ImgFirstTens}${ImgDigit}` | "80" | "81" | "82" | "83" | "84";
type ImageFilename = `/patterns/pattern_${ImgNums}.png` | "cherry_tree.png" | "cherry.png" | "cherry_cake_slice.png" | "cherry_cake_whole.png";

export interface Image {
  position: Point;
  filename: ImageFilename;
  size: number;
}

export interface ShapesAndState {
  circles: Array<CircleArc>;
  lines: Array<Line>;
  texts: Array<Text>;
  images: Array<Image>;
  state: State;
}

export interface State {
  numClicks: number;
  cake_x: number;
}

const xwidth = 1.5;
const ytop = -0.7;
const gap = 0.3;
const cake_start_x_position = -xwidth + (gap * 1) / 2 + gap + gap;

function drawGridLines() {
  const hori_1 = { a: { x: -xwidth, y: ytop + gap * 0 }, b: { x: xwidth, y: ytop + gap * 0 } };
  const hori_2 = { a: { x: -xwidth, y: ytop + gap * 1 }, b: { x: xwidth, y: ytop + gap * 1 } };
  const hori_3 = { a: { x: -xwidth, y: ytop + gap * 2 }, b: { x: xwidth, y: ytop + gap * 2 } };
  const hori_4 = { a: { x: -xwidth, y: ytop + gap * 3 }, b: { x: xwidth, y: ytop + gap * 3 } };
  const hori_5 = { a: { x: -xwidth, y: ytop + gap * 4 }, b: { x: xwidth, y: ytop + gap * 4 } };
  const hori_6 = { a: { x: -xwidth, y: ytop + gap * 5 }, b: { x: xwidth, y: ytop + gap * 5 } };

  const verti_1 = { a: { x: -xwidth, y: ytop + gap * 0 }, b: { x: -xwidth, y: ytop + gap * 5 } };
  const verti_2 = { a: { x: -xwidth + gap * 1, y: ytop + gap * 0 }, b: { x: -xwidth + gap * 1, y: ytop + gap * 5 } };
  const verti_3 = { a: { x: -xwidth + gap * 2, y: ytop + gap * 0 }, b: { x: -xwidth + gap * 2, y: ytop + gap * 5 } };
  const verti_4 = { a: { x: -xwidth + gap * 3, y: ytop + gap * 0 }, b: { x: -xwidth + gap * 3, y: ytop + gap * 5 } };
  const verti_5 = { a: { x: -xwidth + gap * 4, y: ytop + gap * 0 }, b: { x: -xwidth + gap * 4, y: ytop + gap * 5 } };
  const verti_6 = { a: { x: -xwidth + gap * 5, y: ytop + gap * 0 }, b: { x: -xwidth + gap * 5, y: ytop + gap * 5 } };
  const verti_7 = { a: { x: -xwidth + gap * 6, y: ytop + gap * 0 }, b: { x: -xwidth + gap * 6, y: ytop + gap * 5 } };
  const verti_8 = { a: { x: -xwidth + gap * 7, y: ytop + gap * 0 }, b: { x: -xwidth + gap * 7, y: ytop + gap * 5 } };
  const verti_9 = { a: { x: -xwidth + gap * 8, y: ytop + gap * 0 }, b: { x: -xwidth + gap * 8, y: ytop + gap * 5 } };
  const verti_10 = { a: { x: -xwidth + gap * 9, y: ytop + gap * 0 }, b: { x: -xwidth + gap * 9, y: ytop + gap * 5 } };
  const verti_11 = { a: { x: -xwidth + gap * 10, y: ytop + gap * 0 }, b: { x: -xwidth + gap * 10, y: ytop + gap * 5 } };
  const verti_12 = { a: { x: xwidth, y: ytop + gap * 0 }, b: { x: xwidth, y: ytop + gap * 5 } };
  return [hori_1, hori_2, hori_3, hori_4, hori_5, hori_6, verti_1, verti_2, verti_3, verti_4, verti_5, verti_6, verti_7, verti_8, verti_9, verti_10, verti_11, verti_12];
}

export function startGame(): ShapesAndState {
  const gridLines = drawGridLines();
  const showNumClicks: Text = { position: { x: 1.7, y: -0.8 }, message: "???" };
  return {
    circles: [],
    lines: gridLines,
    texts: [showNumClicks],
    images: [],
    state: {
      numClicks: 0,
      cake_x: cake_start_x_position,
    },
  };
}

export function runCodeOnClick(clickPosition: Point, appstate: State): ShapesAndState {
  const currentNumClicks = appstate.numClicks + 1;
  const gridLines = drawGridLines();

  const img_1_1: Image = { position: { x: -xwidth + (gap * 1) / 2, y: ytop + gap / 2 }, size: gap, filename: "cherry_tree.png" };
  const img_2_1: Image = { position: { x: -xwidth + (gap * 1) / 2 + gap, y: ytop + gap / 2 }, size: gap, filename: "cherry.png" };
  const img_2_2: Image = { position: { x: -xwidth + (gap * 1) / 2 + gap, y: ytop + gap / 2 + gap }, size: gap, filename: "cherry_cake_slice.png" };
  const img_3_2: Image = { position: { x: appstate.cake_x, y: ytop + gap / 2 + gap }, size: gap, filename: "cherry_cake_whole.png" };
  console.log("appstate.cake_x", appstate.cake_x);
  const showNumClicks: Text = { position: { x: 1.7, y: -0.8 }, message: `${currentNumClicks}` };
  console.log("clickPosition", clickPosition);
  console.log("currentNumClicks", currentNumClicks);
  return {
    circles: [],
    lines: gridLines,
    texts: [showNumClicks],
    images: [img_1_1, img_2_1, img_2_2, img_3_2],
    state: {
      numClicks: currentNumClicks,
      cake_x: appstate.cake_x + gap,
    },
  };
}

function drawLines(x: unknown[]) {}

function example_code() {
  // WHEN GAME STARTS
  const result_1 = startGame();
  drawLines(result_1.lines);
  let appstate = result_1.state;

  // AFTER FIRST CLICK
  const position_of_first_click = { x: 0, y: 1 };
  const result_2 = runCodeOnClick(position_of_first_click, appstate);
  drawLines(result_2.lines);
  appstate = result_2.state;

  // AFTER SECOND CLICK
  const position_of_second_click = { x: 1, y: 1 };
  const result_3 = runCodeOnClick(position_of_second_click, appstate);
  drawLines(result_3.lines);
  appstate = result_3.state;

  // AFTER THIRD CLICK
  const position_of_third_click = { x: 1, y: 0 };
  const result_4 = runCodeOnClick(position_of_third_click, appstate);
  drawLines(result_4.lines);
  appstate = result_4.state;
}
