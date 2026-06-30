export default function rehypeWrapInProse() {
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
