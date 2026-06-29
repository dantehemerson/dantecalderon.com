import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'

/** Rehype plugin: wraps all MDX root children in <div class="prose"> */
function rehypeWrapInProse() {
  return function (tree) {
    tree.children = [
      {
        type: 'element',
        tagName: 'div',
        properties: { className: ['prose'] },
        children: tree.children,
      },
    ]
  }
}

export default defineConfig({
  site: 'https://dantecalderon.com',
  integrations: [mdx(), react(), sitemap()],
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
    remarkPlugins: [],
    rehypePlugins: [
      rehypeWrapInProse,
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
