import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import rehypeExternalLinks from 'rehype-external-links'
import remarkDirective from 'remark-directive'
import rehypeWrapInProse from './src/plugins/rehype-wrap-prose.mjs'
import rehypeEnhanceSingleImages from './src/plugins/rehype-enhance-images.mjs'
import remarkDirectivesToHTML from './src/plugins/remark-directives-to-html.mjs'

export default defineConfig({
  site: 'https://dantecalderon.com',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      // Themes on: https://textmate-grammars-themes.netlify.app/?theme=aurora-x&grammar=javascript
      theme: 'dark-plus', // This over github-dark because has most noticeable comments.
      // theme: 'github-dark',
      // theme: 'material-theme-darker',
      wrap: true,
    },
    /** Allows directives, https://github.com/remarkjs/remark-directive#remark-directive
     * test on: https://remark.js.org/
     */
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
  },
})
