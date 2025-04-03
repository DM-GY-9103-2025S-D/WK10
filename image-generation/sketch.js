let mCamera;
let mImage;

let capButt;
let promptInput;

let mClient;

async function preload() {
  mCamera = createCapture(VIDEO, { video: { width: 640 }, flipped: true });
  mCamera.hide();
  await loadGradio();
  mClient = await GradioClient.connect("VIDraft/Open-Meme-Studio");
}

let mCanvas;
function setup() {
  mCanvas = createCanvas(windowWidth, windowHeight);

  promptInput = createInput("potato face");

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
  const imgRes = await mClient.predict("/infer", {
    user_prompt: "3d style " + promptInput.value(),
    ip_adapter_image: blob,
    ip_adapter_scale: 0.9,
    negative_prompt: "Copy(worst quality, low quality:1.4), bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, artist name, (deformed iris, deformed pupils:1.2), (semi-realistic, cgi, 3d, render:1.1), amateur, (poorly drawn hands, poorly drawn face:1.2)",
    randomize_seed: true,
    width: mCamera.width,
    height: mCamera.height,
    guidance_scale: 5,
    num_inference_steps: 50,
  });

  console.log(imgRes);

  let mSeed = imgRes.data[1];
  mImage = loadImage(imgRes.data[0].url, drawUI);
}
