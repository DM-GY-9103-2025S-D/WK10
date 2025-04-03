let mCamera;
let mImage;

let capButt;
let promptInput;

let mClient;

async function preload() {
  mCamera = createCapture(VIDEO, { video: { width: 640 }, flipped: true });
  mCamera.hide();
  await loadGradio();
  mClient = await GradioClient.connect("https://2bf5e8e4f84701ef35.gradio.live/");
}

let mCanvas;
function setup() {
  mCanvas = createCanvas(windowWidth, windowHeight);

  promptInput = createInput("15th century masterpiece");

  capButt = createButton("Generate Image");
  capButt.mousePressed(capFrame);

  drawUI();
}

function draw() {
  background(220);

  if (mImage) { image(mImage, 0, 0); } else {image(mCamera, 0, 0);}

  image(mCamera, mCamera.width, 0, mCamera.width / 3, mCamera.height / 3);
}

function drawUI() {
  promptInput.size(mCamera.width, 22);
  promptInput.position(10, mCamera.height + 10);
  capButt.position(10, mCamera.height + 40);

  capButt.show();
  promptInput.show();
}

function capFrame() {
  capButt.hide();
  promptInput.hide();
  mImage = loadImage(mCamera.canvas.toDataURL());
  mCamera.canvas.toBlob(genImage);
}

async function genImage(blob) {
  const imgRes = await mClient.predict("/predict", {
    txt: promptInput.value(),
    img: blob,
  });

  console.log(imgRes);
  mImage = loadImage(imgRes.data[0].url, drawUI);
}
