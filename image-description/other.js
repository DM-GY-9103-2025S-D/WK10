const MODELS = [
  {
    model: "fancyfeast/joy-caption-alpha-two",
    endpoint: "/stream_chat",
    options: {
      input_image: "ADD BLOB HERE",
      caption_type: "Descriptive",
      caption_length: "very short",
      extra_options: [],
      name_input: "",
      custom_prompt: "",
    },
  },
  {
    model: "hysts/image-captioning-with-blip",
    endpoint: "/caption",
    options: {
      image: "ADD BLOB HERE",
      text: "A picture of ",
    },
  },
  {
    model: "IDMNYU/9103D-2025S-api-example",
    endpoint: "/predict",
    options: {
      img: "ADD BLOB HERE",
    },
  },
];
