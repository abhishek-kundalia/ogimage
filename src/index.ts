export interface OGImageOptions {
  /** Required: The main headline text */
  title: string;
  /** Optional: Supporting subtitle text */
  subtitle?: string;
  /** Template style: gradient, dark, sunset, ocean, forest, midnight, fire, minimal, card, card-dark, split, split-dark, pattern, pattern-dark, glass, stripe */
  template?: string;
  /** Output size: og, twitter, instagram, instagram-story, linkedin, youtube, pinterest */
  size?: string;
  /** Font style: modern, elegant, bold, mono */
  font?: string;
  /** Author name to display */
  author?: string;
  /** URL to logo image */
  logo?: string;
  /** Custom background image URL */
  bg?: string;
  /** Overlay type when using background image: dark, light, gradient, none */
  overlay?: string;
  /** Overlay opacity (0-1) */
  opacity?: number;
  /** Lite mode for smaller file sizes (solid colors) */
  lite?: boolean;
  /** License key to remove watermark */
  key?: string;
}

export interface OGImageConfig {
  /** Base URL of the OG image service (default: https://ogimage.art) */
  baseUrl?: string;
  /** Your license key for watermark-free images */
  licenseKey?: string;
}

const DEFAULT_BASE_URL = 'https://ogimage.art';

/**
 * Generate an OG image URL
 * @param options - Image generation options
 * @param config - Optional configuration
 * @returns The URL to the generated image
 */
export function generateUrl(options: OGImageOptions, config?: OGImageConfig): string {
  const baseUrl = config?.baseUrl || DEFAULT_BASE_URL;
  const params = new URLSearchParams();

  params.set('title', options.title);
  
  if (options.subtitle) params.set('subtitle', options.subtitle);
  if (options.template) params.set('template', options.template);
  if (options.size) params.set('size', options.size);
  if (options.font) params.set('font', options.font);
  if (options.author) params.set('author', options.author);
  if (options.logo) params.set('logo', options.logo);
  if (options.bg) params.set('bg', options.bg);
  if (options.overlay) params.set('overlay', options.overlay);
  if (options.opacity !== undefined) params.set('opacity', options.opacity.toString());
  if (options.lite) params.set('lite', 'true');
  
  // License key from options or config
  const key = options.key || config?.licenseKey;
  if (key) params.set('key', key);

  return `${baseUrl}/api/og?${params.toString()}`;
}

/**
 * Generate an OG image and return as a Buffer
 * @param options - Image generation options
 * @param config - Optional configuration
 * @returns Promise resolving to image buffer
 */
export async function generate(options: OGImageOptions, config?: OGImageConfig): Promise<Buffer> {
  const url = generateUrl(options, config);
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to generate image: ${response.status} ${response.statusText}`);
  }
  
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

/**
 * Generate an OG image and save to file
 * @param options - Image generation options  
 * @param outputPath - Path to save the image
 * @param config - Optional configuration
 */
export async function generateToFile(
  options: OGImageOptions,
  outputPath: string,
  config?: OGImageConfig
): Promise<void> {
  const buffer = await generate(options, config);
  const fs = await import('fs/promises');
  await fs.writeFile(outputPath, buffer);
}

/**
 * Generate meta tags for OG image
 * @param options - Image generation options
 * @param config - Optional configuration
 * @returns Object with meta tag attributes
 */
export function getMetaTags(options: OGImageOptions, config?: OGImageConfig): {
  'og:image': string;
  'twitter:image': string;
  'twitter:card': string;
} {
  const url = generateUrl(options, config);
  return {
    'og:image': url,
    'twitter:image': url,
    'twitter:card': 'summary_large_image',
  };
}

/**
 * Create an OG image client with preset configuration
 * @param config - Client configuration
 * @returns Client instance with bound methods
 */
export function createClient(config: OGImageConfig) {
  return {
    generateUrl: (options: OGImageOptions) => generateUrl(options, config),
    generate: (options: OGImageOptions) => generate(options, config),
    generateToFile: (options: OGImageOptions, outputPath: string) => generateToFile(options, outputPath, config),
    getMetaTags: (options: OGImageOptions) => getMetaTags(options, config),
  };
}

// Default export
export default {
  generateUrl,
  generate,
  generateToFile,
  getMetaTags,
  createClient,
};
