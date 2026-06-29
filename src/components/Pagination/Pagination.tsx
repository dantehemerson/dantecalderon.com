import React from 'react'

const imageSrc = 'https://icongr.am/clarity/arrow.svg?size=24&color=bebebe'

function paginationItems(pages: number, selected: number): number[] {
  const all = [...Array(pages)].map((_, i) => i)

  if (all.length < 6) {
    return all
  }

  const first = 0
  const last = all.length - 1
  const prev = Math.min(all.length, Math.max(0, selected - 1))
  const next = Math.min(all.length, Math.max(0, selected + 1))

  const items: number[] = []

  items.push(...all.slice(prev, next + 1))

  if (selected === last) {
    items.unshift(last - 2)
  }
  if (selected === first) {
    items.push(first + 2)
  }

  if (prev > first + 1) {
    items.unshift(-1)
  }
  if (next < last - 1) {
    items.push(-1)
  }

  if (prev >= first + 1) {
    items.unshift(all[0])
  }
  if (next <= last - 1) {
    items.push(all[all.length - 1])
  }

  return items
}

interface PaginationProps {
  pages: number
  selected: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export default React.memo(function Pagination({
  pages,
  selected,
  hasNextPage,
  hasPrevPage,
}: PaginationProps) {
  if (pages <= 1) {
    return null
  }

  const items = paginationItems(pages, selected)

  const getPageUrl = (index: number) => {
    if (index === 0) return '/blog'
    return `/blog/page/${index}`
  }

  return (
    <div className="flex items-center justify-between mt-2.5 py-4">
      {/* Prev button */}
      <a
        href={hasPrevPage ? getPageUrl(selected - 1) : undefined}
        className={`flex mx-5 transition duration-300 no-underline ${!hasPrevPage ? 'invisible' : ''}`}
      >
        <img
          alt="Prev Page"
          src={imageSrc}
          className="transition duration-400 rotate-[-90deg] mx-0.75 m-0"
        />
        <p className="font-bold m-0 text-[#4d4d4d]">PREV</p>
      </a>

      {/* Page numbers */}
      <div className="flex items-center justify-center">
        {items.map((pageIndex, i) =>
          pageIndex === -1 ? (
            <div key={`separator-${i}`} className="flex w-4 h-9 m-0 items-center justify-center">
              <img
                className="m-0 relative top-1.25"
                alt="ellipsis"
                src="https://icongr.am/clarity/ellipsis-horizontal.svg?size=16&color=4d4d4d"
              />
            </div>
          ) : (
            <div key={pageIndex} className="mx-0.75">
              {selected === pageIndex ? (
                <span className="w-9 h-9 text-[#4d4d4d] flex items-center justify-center no-underline font-bold text-base transition duration-300 rounded-[50%] bg-[#3f86f5] text-white cursor-default">
                  <span className="leading-[14px] relative">{pageIndex}</span>
                </span>
              ) : (
                <a
                  href={getPageUrl(pageIndex)}
                  className="w-9 h-9 text-[#4d4d4d] flex items-center justify-center no-underline font-bold text-base transition duration-300 rounded-[50%] hover:bg-[#91caf75e]"
                >
                  <span className="leading-[14px] relative">{pageIndex}</span>
                </a>
              )}
            </div>
          )
        )}
      </div>

      {/* Next button */}
      <a
        href={hasNextPage ? getPageUrl(selected + 1) : undefined}
        className={`flex mx-5 transition duration-300 no-underline ${!hasNextPage ? 'invisible' : ''}`}
      >
        <p className="font-bold m-0 text-[#4d4d4d]">NEXT</p>
        <img
          alt="Next Page"
          src={imageSrc}
          className="transition duration-400 rotate-90 mx-0.75 m-0"
        />
      </a>
    </div>
  )
})
