let mCamera;
let mClient;

async function preload() {
  mCamera = createCapture(VIDEO, { flipped: true });
  mCamera.hide();
  await loadGradio();
  // mClient = await GradioClient.connect("merve/GroundingDINO_OWL");
  mClient = await GradioClient.connect("codingwithlewis/owlv2");
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

async function captionBlob(img) {
  const text_queries = "glasses, eye, mouth";
  const score_threshold = 0.16;

  const groundingDinoOwlPayload = [img, text_queries, score_threshold, 0.12];
  const owlv2Payload = { img, text_queries, score_threshold };

  let objRes = await mClient.predict("/predict", owlv2Payload);

  console.log(objRes);
  console.log(objRes.data[1]);
}

async function keyPressed() {
  if (key === " ") {
    console.log("sending frame");
    mCanvas.elt.toBlob(captionBlob);
  }
}
