const MODELS = [
  {
    model: "mukaist/Midjourney",
    endpoint: "/run",
    options: {
      prompt: "ADD PROMPT HERE",
      negative_prompt:
        "(deformed iris, deformed pupils, semi-realistic, cgi, 3d, render, sketch, cartoon, drawing, anime:1.4), text, close up, cropped, out of frame, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck",
      use_negative_prompt: true,
      style: "Photo",
      width: 512,
      height: 512,
      guidance_scale: 0.1,
      randomize_seed: true,
    },
  },
  {
    model: "VIDraft/Open-Meme-Studio",
    endpoint: "/infer",
    options: {
      user_prompt: "ADD PROMPT HERE",
      ip_adapter_image: "ADD BLOB HERE",
      ip_adapter_scale: 0.9,
      negative_prompt:
        "Copy(worst quality, low quality:1.4), bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, artist name, (deformed iris, deformed pupils:1.2), (semi-realistic, cgi, 3d, render:1.1), amateur, (poorly drawn hands, poorly drawn face:1.2)",
      width: 512,
      height: 512,
      guidance_scale: 5,
      num_inference_steps: 50,
      randomize_seed: true,
    },
  },
  {
    model: "black-forest-labs/FLUX.1-schnell",
    endpoint: "/infer",
    options: {
      prompt: "ADD PROMPT HERE",
      width: 512,
      height: 512,
      num_inference_steps: 4,
      randomize_seed: true,
    },
  },
];
