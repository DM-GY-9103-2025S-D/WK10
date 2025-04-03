let mCamera;
let mImage;

let capButt;

let mClient;

async function preload() {
  mCamera = createCapture(VIDEO, { video: { width: 640 }, flipped: true });
  mCamera.hide();
  await loadGradio();
  mClient = await GradioClient.connect("fancyfeast/joy-caption-alpha-two");
}

let mCanvas;
let mCaption = "";
function setup() {
  mCanvas = createCanvas(windowWidth, windowHeight);

  capButt = createButton("Caption Frame");
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

  text(mCaption, 10, mCamera.height, mCamera.width, 100);
}

function capFrame() {
  capButt.hide();
  mImage = loadImage(mCamera.canvas.toDataURL());
  mCamera.canvas.toBlob(captionBlob);
}

async function captionBlob(blob) {
  let captionRes = await mClient.predict("/stream_chat", {
    input_image: blob,
    caption_type: "Descriptive",
    caption_length: "very short",
    extra_options: [],
    name_input: "",
    custom_prompt: "",
  });

  console.log(captionRes);
  mCaption = captionRes.data[1];

  capButt.position(mCamera.width + 10, mCamera.height / 3 + 10);
  capButt.show();
}
