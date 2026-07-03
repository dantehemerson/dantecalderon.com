import { unified } from '@astrojs/markdown-remark'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeSlug from 'rehype-slug'
import remarkDirective from 'remark-directive'
import { IMAGE_DOMAINS } from './src/consts'
import rehypeEnhanceSingleImages from './src/plugins/rehype-enhance-images.mjs'
import rehypeWrapInProse from './src/plugins/rehype-wrap-prose.mjs'
import remarkDirectivesToHTML from './src/plugins/remark-directives-to-html.mjs'

export default defineConfig({
  site: 'https://dantecalderon.com',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    domains: IMAGE_DOMAINS,
  },
  markdown: {
    processor: unified({
      remarkPlugins: [remarkDirective, remarkDirectivesToHTML],
      rehypePlugins: [
        rehypeWrapInProse,
        rehypeEnhanceSingleImages,
        [
          rehypeExternalLinks,
          {
            target: '_blank',
            rel: ['noreferrer', 'noopener'],
          },
        ],
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'append',
            content: [
              {
                type: 'element',
                tagName: 'span',
                properties: { className: ['icon'], ariaHidden: true },
                children: [
                  {
                    type: 'element',
                    tagName: 'img',
                    /**
                     * Icon from: https://lucide.dev/icons/link
                     * Customize, inspect, copy element and paste into the file.
                     */
                    properties: { src: '/link-16.svg', ariaHidden: true },
                  },
                ],
              },
            ],
            properties: {
              className: ['heading-anchor'],
              ariaLabel: 'Link',
            },
          },
        ],
      ],
    }),
    syntaxHighlight: 'shiki',
    shikiConfig: {
      // Themes on: https://textmate-grammars-themes.netlify.app/?theme=aurora-x&grammar=javascript
      theme: 'dark-plus', // This over github-dark because has most noticeable comments.
      // theme: 'github-dark',
      // theme: 'material-theme-darker',
      wrap: true,
    },
  },
})
