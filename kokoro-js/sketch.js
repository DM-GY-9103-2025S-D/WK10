let tts;
async function preload() {
  tts = await KokoroTTS.from_pretrained("onnx-community/Kokoro-82M-v1.0-ONNX", { dtype: "q8" });
}

let mCanvas;
let mSound;
function setup() {
  mCanvas = createCanvas(windowWidth, windowHeight);
  mSound = new p5.SoundFile();
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
    console.log("generating");
    let speech = await tts.generate("hello hello world", {
      voice: "af_bella",
    });

    console.log(speech);

    mSound.setBuffer([speech.audio]);
    mSound.rate(speech.sampling_rate / mSound.buffer.sampleRate);
    mSound.play();
  }
}
