// src/index.ts
var DEFAULT_BASE_URL = "https://ogimage.art";
function generateUrl(options, config) {
  const baseUrl = config?.baseUrl || DEFAULT_BASE_URL;
  const params = new URLSearchParams();
  params.set("title", options.title);
  if (options.subtitle) params.set("subtitle", options.subtitle);
  if (options.template) params.set("template", options.template);
  if (options.size) params.set("size", options.size);
  if (options.font) params.set("font", options.font);
  if (options.author) params.set("author", options.author);
  if (options.logo) params.set("logo", options.logo);
  if (options.bg) params.set("bg", options.bg);
  if (options.overlay) params.set("overlay", options.overlay);
  if (options.opacity !== void 0) params.set("opacity", options.opacity.toString());
  if (options.lite) params.set("lite", "true");
  const key = options.key || config?.licenseKey;
  if (key) params.set("key", key);
  return `${baseUrl}/api/og?${params.toString()}`;
}
async function generate(options, config) {
  const url = generateUrl(options, config);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to generate image: ${response.status} ${response.statusText}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}
async function generateToFile(options, outputPath, config) {
  const buffer = await generate(options, config);
  const fs = await import("fs/promises");
  await fs.writeFile(outputPath, buffer);
}
function getMetaTags(options, config) {
  const url = generateUrl(options, config);
  return {
    "og:image": url,
    "twitter:image": url,
    "twitter:card": "summary_large_image"
  };
}
function createClient(config) {
  return {
    generateUrl: (options) => generateUrl(options, config),
    generate: (options) => generate(options, config),
    generateToFile: (options, outputPath) => generateToFile(options, outputPath, config),
    getMetaTags: (options) => getMetaTags(options, config)
  };
}
var index_default = {
  generateUrl,
  generate,
  generateToFile,
  getMetaTags,
  createClient
};
export {
  createClient,
  index_default as default,
  generate,
  generateToFile,
  generateUrl,
  getMetaTags
};
