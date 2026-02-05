interface OGImageOptions {
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
interface OGImageConfig {
    /** Base URL of the OG image service (default: https://ogimage.art) */
    baseUrl?: string;
    /** Your license key for watermark-free images */
    licenseKey?: string;
}
/**
 * Generate an OG image URL
 * @param options - Image generation options
 * @param config - Optional configuration
 * @returns The URL to the generated image
 */
declare function generateUrl(options: OGImageOptions, config?: OGImageConfig): string;
/**
 * Generate an OG image and return as a Buffer
 * @param options - Image generation options
 * @param config - Optional configuration
 * @returns Promise resolving to image buffer
 */
declare function generate(options: OGImageOptions, config?: OGImageConfig): Promise<Buffer>;
/**
 * Generate an OG image and save to file
 * @param options - Image generation options
 * @param outputPath - Path to save the image
 * @param config - Optional configuration
 */
declare function generateToFile(options: OGImageOptions, outputPath: string, config?: OGImageConfig): Promise<void>;
/**
 * Generate meta tags for OG image
 * @param options - Image generation options
 * @param config - Optional configuration
 * @returns Object with meta tag attributes
 */
declare function getMetaTags(options: OGImageOptions, config?: OGImageConfig): {
    'og:image': string;
    'twitter:image': string;
    'twitter:card': string;
};
/**
 * Create an OG image client with preset configuration
 * @param config - Client configuration
 * @returns Client instance with bound methods
 */
declare function createClient(config: OGImageConfig): {
    generateUrl: (options: OGImageOptions) => string;
    generate: (options: OGImageOptions) => Promise<Buffer<ArrayBufferLike>>;
    generateToFile: (options: OGImageOptions, outputPath: string) => Promise<void>;
    getMetaTags: (options: OGImageOptions) => {
        'og:image': string;
        'twitter:image': string;
        'twitter:card': string;
    };
};
declare const _default: {
    generateUrl: typeof generateUrl;
    generate: typeof generate;
    generateToFile: typeof generateToFile;
    getMetaTags: typeof getMetaTags;
    createClient: typeof createClient;
};

export { type OGImageConfig, type OGImageOptions, createClient, _default as default, generate, generateToFile, generateUrl, getMetaTags };
