let mMic, mRecorder, mRecSound;
let isRecording;

let micButt;

let mClient;

async function preload() {
  await loadGradio();
  mClient = await GradioClient.connect("hf-audio/whisper-large-v3-turbo");
}

let mCanvas;
let mCaption = "";
function setup() {
  mCanvas = createCanvas(windowWidth, windowHeight);

  mMic = new p5.AudioIn();
  mRecSound = new p5.SoundFile();
  mRecorder = new p5.SoundRecorder();
  isRecording = false;

  micButt = createButton("Enable Microphone");
  micButt.position(20, 20);
  micButt.mousePressed(enableMic);

  mCaption = "";
  textSize(20);
}

function draw() {
  if (mMic.enabled && !isRecording) {
    background(180, 220, 240);
  } else if (isRecording) {
    background(255, 200, 200);
  } else {
    background(220);
  }

  text(mCaption, 10, 10, width - 20, 100);
}

async function captionAudio(samples) {
  let sttRes = await mClient.predict("/predict", {
    inputs: mRecSound.getBlob(),
    task: "transcribe",
  });

  console.log(sttRes);
  mCaption = sttRes.data[0];
}

function enableMic() {
  console.log("Enabling mic");

  if (!mMic.enabled) {
    mMic.start();
    mRecorder.setInput(mMic);
    userStartAudio();
    micButt.hide();
  }
}

function keyPressed() {
  console.log("key pressed");
  
  if (key == " ") {
    if (!isRecording && mMic.enabled) {
      console.log("recording started");
      mRecorder.record(mRecSound, 100, captionAudio);
      isRecording = true;
    } else if (isRecording) {
      console.log("recording stopped");
      mRecorder.stop();
      isRecording = false;
    }
  }
}
