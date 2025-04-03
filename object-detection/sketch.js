let mCamera;
let mClient;

async function preload() {
  mCamera = createCapture(VIDEO, { flipped: true });
  mCamera.hide();
  await loadGradio();
  mClient = await GradioClient.connect("merve/GroundingDINO_OWL");
}

let mCanvas;
let mCaption = "";
function setup() {
  mCanvas = createCanvas(windowWidth, windowHeight);
  mCaption = "";
  textSize(20);
}

function draw() {
  background(220);
  image(mCamera, 0, 0);
  text(mCaption, 10, mCamera.height, mCamera.width, 100);
}

async function captionBlob(blob) {
  let objRes = await mClient.predict("/predict", [
    blob,
    "glasses, eye, mouth",
    0.16,
    0.12
  ]);

  console.log(objRes);
  console.log(objRes.data[1].annotations.map(x => x.label));
}

async function keyPressed() {
  if (key === " ") {
    console.log("sending frame");
    mCanvas.elt.toBlob(captionBlob);
  }
}
