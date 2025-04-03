const MODELS = [
  {
    model: "codingwithlewis/owlv2",
    endpoint: "/predict",
    options: {
      img: "ADD BLOB HERE",
      text_queries: "ADD CLASSES HERE",
      score_threshold: 0.16,
    },
  },
  {
    model: "merve/GroundingDINO_OWL",
    endpoint: "/predict",
    options: ["ADD BLOB HERE", "ADD CLASSES HERE", 0.16, 0.12],
  },
];
