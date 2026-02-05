"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  createClient: () => createClient,
  default: () => index_default,
  generate: () => generate,
  generateToFile: () => generateToFile,
  generateUrl: () => generateUrl,
  getMetaTags: () => getMetaTags
});
module.exports = __toCommonJS(index_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createClient,
  generate,
  generateToFile,
  generateUrl,
  getMetaTags
});
