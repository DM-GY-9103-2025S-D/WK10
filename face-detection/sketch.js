let mCamera;
let mImage;

let capButt;

let mClient;

async function preload() {
  mCamera = createCapture(VIDEO, { video: { width: 640 }, flipped: true });
  mCamera.hide();
  await loadGradio();
  mClient = await GradioClient.connect("https://18a26d3349cc45b6e6.gradio.live");
}

let mCanvas;
let faces = [];
function setup() {
  mCanvas = createCanvas(windowWidth, windowHeight);

  capButt = createButton("Find Faces");
  capButt.position(mCamera.width + 10, 10);
  capButt.mousePressed(capFrame);

  mCaption = "";
  textSize(20);
}

function draw() {
  background(220);

  image(mCamera, 0, 0);
  if (mImage) image(mImage, 0, 0);

  image(mCamera, mCamera.width, 0, mCamera.width / 3, mCamera.height / 3);

  push();
  noFill();
  stroke(0, 255, 0);
  strokeWeight(4);
  rectMode(CENTER);
  for (let face of faces) {
    let [ x, y, w, h ] = face.xywhn;
    rect(x * mImage.width, y * mImage.height, w * mImage.width, h * mImage.height);
  }
  pop();
}

function capFrame() {
  capButt.hide();
  faces.length = 0;
  mImage = loadImage(mCamera.canvas.toDataURL());
  mCamera.canvas.toBlob(captionBlob);
}

async function captionBlob(blob) {
  let facesRes = await mClient.predict("/predict", {
    img: blob,
  });

  console.log(facesRes);
  if (facesRes.data.length > 0) {
    faces = facesRes.data[0];  
  }

  capButt.position(mCamera.width + 10, mCamera.height / 3 + 10);
  capButt.show();
}
