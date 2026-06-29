import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import rehypeExternalLinks from 'rehype-external-links'
import remarkDirective from 'remark-directive'
import { visit } from 'unist-util-visit'
import { h } from 'hastscript'

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

/** Be careful it modifies all the nodes */
function remarkDirectivesToHTML() {
  return function (tree) {
    visit(tree, function (node) {
      if (
        node.type === 'containerDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'textDirective'
      ) {
        const data = node.data || (node.data = {})
        const hast = h(node.name, node.attributes || {})

        data.hName = hast.tagName
        data.hProperties = hast.properties
      }
    })
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
    /** Allows directives, https://github.com/remarkjs/remark-directive#remark-directive
     * test on: https://remark.js.org/
     */
    remarkPlugins: [remarkDirective, remarkDirectivesToHTML],
    rehypePlugins: [
      rehypeWrapInProse,
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
