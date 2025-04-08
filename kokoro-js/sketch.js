let tts;
async function preload() {
  tts = await KokoroTTS.from_pretrained("onnx-community/Kokoro-82M-v1.0-ONNX", { dtype: "q8" });
}

let mCanvas;
function setup() {
  mCanvas = createCanvas(windowWidth, windowHeight);
}

let modelReady;
function draw() {
  background(220);

  modelReady = typeof tts !== "undefined";
  if (!modelReady) {
    text("Loading !", 20, 40);
  }
}

async function keyPressed() {
  if (!modelReady) return;

  if (key === " ") {
    let speech = await tts.generate("hello hello world", {
      voice: "af_bella",
    });

    // TODO: speech.audio is a Float32Array that should go in a p5js audio object for playback...
    console.log(speech);
  }
}
