# ogimage

Generate beautiful OG images for social sharing. Simple API wrapper for [ogimage.art](https://ogimage.art).

[![npm version](https://badge.fury.io/js/ogimage.svg)](https://www.npmjs.com/package/ogimage)

## Installation

```bash
npm install ogimage
```

## Quick Start

```javascript
import { generateUrl } from 'ogimage';

// Generate a URL (no API call needed)
const url = generateUrl({
  title: 'How I Built a $1M SaaS',
  subtitle: 'The complete guide',
  template: 'gradient',
});

// Use in your HTML
// <meta property="og:image" content={url} />
```

## Usage

### Generate URL Only (Recommended)

The simplest approach - just generate the URL and let browsers/crawlers fetch the image directly:

```javascript
import { generateUrl, getMetaTags } from 'ogimage';

// Simple URL
const imageUrl = generateUrl({ title: 'My Blog Post' });

// Get all meta tags at once
const meta = getMetaTags({ 
  title: 'My Blog Post',
  template: 'dark'
});
// Returns: { 'og:image': '...', 'twitter:image': '...', 'twitter:card': 'summary_large_image' }
```

### Download Image

If you need the actual image file:

```javascript
import { generate, generateToFile } from 'ogimage';

// Get as Buffer
const buffer = await generate({ title: 'My Post' });

// Save to file
await generateToFile({ title: 'My Post' }, './og-image.png');
```

### With License Key (Remove Watermark)

```javascript
import { createClient } from 'ogimage';

const og = createClient({
  licenseKey: 'YOUR_LICENSE_KEY'
});

const url = og.generateUrl({ title: 'No Watermark!' });
```

## Options

| Option | Type | Description |
|--------|------|-------------|
| `title` | string | **Required.** Main headline text |
| `subtitle` | string | Supporting text |
| `template` | string | Style: `gradient`, `dark`, `sunset`, `ocean`, `forest`, `midnight`, `fire`, `minimal`, `card`, `card-dark`, `split`, `split-dark`, `pattern`, `pattern-dark`, `glass`, `stripe` |
| `size` | string | Output size: `og`, `twitter`, `instagram`, `instagram-story`, `linkedin`, `youtube`, `pinterest` |
| `font` | string | Font style: `modern`, `elegant`, `bold`, `mono` |
| `author` | string | Author name |
| `logo` | string | URL to logo image |
| `bg` | string | Custom background image URL |
| `overlay` | string | Overlay type: `dark`, `light`, `gradient`, `none` |
| `opacity` | number | Overlay opacity (0-1) |
| `lite` | boolean | Lite mode for 90% smaller files |
| `key` | string | License key (removes watermark) |

## Framework Examples

### Next.js (App Router)

```javascript
// app/blog/[slug]/page.tsx
import { generateUrl } from 'ogimage';

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  
  return {
    openGraph: {
      images: [generateUrl({ 
        title: post.title,
        template: 'gradient'
      })],
    },
  };
}
```

### Next.js (Pages Router)

```javascript
// pages/blog/[slug].tsx
import { getMetaTags } from 'ogimage';
import Head from 'next/head';

export default function Post({ post }) {
  const meta = getMetaTags({ title: post.title });
  
  return (
    <Head>
      <meta property="og:image" content={meta['og:image']} />
      <meta name="twitter:image" content={meta['twitter:image']} />
      <meta name="twitter:card" content={meta['twitter:card']} />
    </Head>
  );
}
```

### Astro

```astro
---
import { generateUrl } from 'ogimage';

const ogImage = generateUrl({
  title: frontmatter.title,
  template: 'dark'
});
---
<meta property="og:image" content={ogImage} />
```

### Remix

```javascript
import { generateUrl } from 'ogimage';

export const meta = ({ data }) => {
  return [
    { property: 'og:image', content: generateUrl({ title: data.title }) },
  ];
};
```

## Sizes

| Size | Dimensions | Best For |
|------|------------|----------|
| `og` | 1200×630 | Facebook, LinkedIn, default |
| `twitter` | 1200×675 | Twitter/X |
| `instagram` | 1080×1080 | Instagram posts |
| `instagram-story` | 1080×1920 | Instagram stories |
| `linkedin` | 1200×627 | LinkedIn |
| `youtube` | 1280×720 | YouTube thumbnails |
| `pinterest` | 1000×1500 | Pinterest pins |

## License

MIT - Free to use in any project.

## Get a License Key

Remove watermarks and unlock all features at [ogimage.art](https://ogimage.art#pricing).
