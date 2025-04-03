let GradioClient;

async function loadGradio() {
  try {
    const module = await import("https://cdn.jsdelivr.net/npm/@gradio/client/dist/index.min.js");
    GradioClient = module.Client;
  } catch (error) {
    console.error("Failed to load module:", error);
  }
}
