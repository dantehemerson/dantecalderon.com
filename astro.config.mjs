import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
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

/**
 * Rehype plugin: transforms <p><img/></p> (single image paragraphs) into:
 * <div class="single-image-container not-prose">
 *   <a class="pswp-link" href="{originalSrc}" data-pswp-width="{w}" data-pswp-height="{h}" data-caption="{alt}">
 *     <img ... data-media-enhanced="true">
 *   </a>
 *   <div class="single-image-caption">{alt}</div>
 * </div>
 */
function rehypeEnhanceSingleImages() {
  return function (tree) {
    visit(tree, 'element', function (node, index, parent) {
      if (node.tagName !== 'p') return
      if (!parent || index == null) return

      // Find meaningful children (ignore whitespace text nodes)
      const meaningful = node.children.filter(
        child => !(child.type === 'text' && child.value.trim() === '')
      )

      // Only process paragraphs with exactly one img child
      if (meaningful.length !== 1 || meaningful[0].tagName !== 'img') return

      const img = meaningful[0]
      const alt = img.properties?.alt || ''
      const src = img.properties?.src || ''
      const title = img.properties?.title

      // Mark image as already processed
      img.properties = { ...img.properties, 'data-media-enhanced': 'true' }

      const anchor = {
        type: 'element',
        tagName: 'a',
        properties: {
          className: ['pswp-link'],
          href: src,
          'data-caption': alt,
          'data-title': title,
        },
        children: [img],
      }

      const children = [anchor]

      if (alt) {
        children.push({
          type: 'element',
          tagName: 'div',
          properties: { className: ['single-image-caption'] },
          children: [{ type: 'text', value: alt }],
        })
      }

      const wrapper = {
        type: 'element',
        tagName: 'div',
        properties: { className: ['single-image-container', 'not-prose'] },
        children,
      }

      parent.children[index] = wrapper
    })
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
