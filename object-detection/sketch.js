let mCamera;
let mImage;
let bboxes = [];

let capButt;
let classInput;

let mClient;

async function preload() {
  mCamera = createCapture(VIDEO, { video: { width: 640 }, flipped: true });
  mCamera.hide();
  await loadGradio();
  mClient = await GradioClient.connect("codingwithlewis/owlv2");
}

let mCanvas;
let mCaption = "";
function setup() {
  mCanvas = createCanvas(windowWidth, windowHeight);

  classInput = createInput("glasses,eye,mouth");
  classInput.position(mCamera.width + 10, mCamera.height / 3 + 10);

  capButt = createButton("Capture Frame");
  capButt.position(mCamera.width + 10, mCamera.height / 3 + 40);
  capButt.mousePressed(capFrame);

  mCaption = "";
  textSize(20);
}

function draw() {
  background(220);

  image(mCamera, 0, 0);
  if (mImage) image(mImage, 0, 0);

  noFill();
  stroke(0, 255, 0);
  for (const bbox of bboxes) {
    [x0, y0, x1, y1] = bbox.pos;
    text(bbox.object, x0, y0);
    rect(x0, y0, x1 - x0, y1 - y0);
  }

  image(mCamera, mCamera.width, 0, mCamera.width / 3, mCamera.height / 3);

  text(mCaption, 10, mCamera.height, mCamera.width, 100);
}

function capFrame() {
  capButt.hide();
  classInput.hide();
  bboxes = [];
  mImage = loadImage(mCamera.canvas.toDataURL());
  mCamera.canvas.toBlob(captionBlob);
}

async function captionBlob(blob) {
  let objRes = await mClient.predict("/predict", {
    img: blob,
    text_queries: classInput.value(),
    score_threshold: 0.16,
  });

  console.log(objRes);
  console.log(objRes.data[1]);
  bboxes = objRes.data[1];

  classInput.position(mCamera.width + 10, mCamera.height / 3 + 10);
  capButt.position(mCamera.width + 10, mCamera.height / 3 + 40);

  capButt.show();
  classInput.show();
}
