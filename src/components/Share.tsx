import React from 'react'
import { siteConfig } from '../config'

type ShareProps = {
  title: string
  path?: string
}

export function Share({ title, path }: ShareProps) {
  const url = `${siteConfig.siteUrl}/${path}`

  return (
    <div className="max-w-[900px] mx-auto flex flex-wrap pt-0 pb-3.75 justify-center">
      <span className="w-full text-center font-semibold text-[15px] leading-0 mb-5">
        Share:
      </span>
      <a
        className="m-1 bg-[#caced2] rounded p-[0em_0.2em] transition duration-300 ease-in-out hover:bg-[#a9adb1]"
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)} by Dante Calderón(@dantehemerson) ${encodeURIComponent(url)}`}
        title="Share on Twitter"
        target="_blank"
        rel="noopener"
      >
        <img
          src="https://icongr.am/fontawesome/twitter.svg?color=ffffff"
          title="Share on Twitter"
          alt="Twitter"
          className="w-5.5 h-[84%] m-0 relative top-0.5"
        />
      </a>
      <a
        className="m-1 bg-[#caced2] rounded p-[0em_0.2em] transition duration-300 ease-in-out hover:bg-[#a9adb1]"
        href={`http://www.linkedin.com/shareArticle?url=${encodeURIComponent(url)}&isFramed=true`}
        title="Share on Linkedin"
        target="_blank"
        rel="noopener"
      >
        <img
          src="https://icongr.am/fontawesome/linkedin.svg?color=ffffff"
          title="Share on Linkedin"
          alt="LinkedIn"
          className="w-5.5 h-[84%] m-0 relative top-0.5"
        />
      </a>
    </div>
  )
}
