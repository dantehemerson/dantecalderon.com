import React from 'react'
import { useIsClient } from '../hooks/useClient'

type InfoItemProps = {
  title: string
  isLoading: boolean
  postfix?: string
  showPostfixImage?: boolean
  children: React.ReactNode
}

export default function InfoItem({
  title,
  postfix,
  showPostfixImage,
  isLoading,
  children,
}: InfoItemProps) {
  const { key } = useIsClient()

  return (
    <div key={key} className="flex justify-center items-center text-xs h-6">
      <p className="font-['Open_Sans',sans-serif] font-semibold m-0 mr-1.5">{title + ':'}</p>
      {isLoading ? (
        <div className="opacity-70 animate-pulse w-[200px] h-[18px] rounded" style={{ backgroundColor: '#e6d7a8' }} />
      ) : (
        <div className="flex items-center font-normal text-[#133a4d]">
          <div className="mr-1">{children}</div>
          {showPostfixImage && (
            <img
              alt="listening"
              className="m-0 w-[13px] h-[13px] p-0 -mx-0.5 mb-px ml-[7px]"
              src="https://i.ibb.co/6gzCdm5/equaliser-animated-green-73b73928.gif"
            />
          )}
          <span className="text-[10px] m-0 font-normal text-[#8e8e8e] ml-1.5 flex items-center">{postfix}</span>
        </div>
      )}
    </div>
  )
}
