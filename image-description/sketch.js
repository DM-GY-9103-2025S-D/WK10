let mCamera;
let mClient;

async function preload() {
  mCamera = createCapture(VIDEO, { flipped: true });
  mCamera.hide();
  await loadGradio();
  mClient = await GradioClient.connect("IDMNYU/9103D-2025S-api-example");
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
  let captionRes = await mClient.predict("/predict", { img: blob });
  console.log(captionRes);
  mCaption = captionRes.data[0];
}

async function keyPressed() {
  if (key === " ") {
    console.log("sending frame");
    mCanvas.elt.toBlob(captionBlob);
  }
}
