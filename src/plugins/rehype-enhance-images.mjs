import { visit } from 'unist-util-visit'

export default function rehypeEnhanceSingleImages() {
  return function (tree) {
    visit(tree, 'element', function (node, index, parent) {
      if (node.tagName !== 'p') return
      if (!parent || index == null) return

      const meaningful = node.children.filter(
        child => !(child.type === 'text' && child.value.trim() === '')
      )

      if (meaningful.length !== 1 || meaningful[0].tagName !== 'img') return

      const img = meaningful[0]
      const alt = img.properties?.alt || ''
      const title = img.properties?.title

      const anchor = {
        type: 'element',
        tagName: 'a',
        properties: {
          className: ['pswp-link'],
          // do nothing if photoswipe not loaded:
          href: 'javascript:void(0)',
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
