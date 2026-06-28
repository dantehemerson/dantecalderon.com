import React, { useEffect } from 'react'
import { mergeAdvanced } from 'object-merge-advanced'
import { secureTimeAgo } from '../helpers/date'
import { getMyGithubInfo } from '../helpers/requests/githubInfo'
import { useLocalStorage } from '../hooks/useLocalStorage'
import InfoItem from './InfoItem'

const GLOBAL_CONTEXT_KEY = 'gcl'

export function Info() {
  const [info, setInfo] = useLocalStorage(GLOBAL_CONTEXT_KEY, undefined)

  useEffect(() => {
    const loadGithubInfo = async () => {
      try {
        const newInfo = await getMyGithubInfo()
        setInfo((prevInfo: any) => {
          return mergeAdvanced(prevInfo, newInfo, {
            mergeBoolsUsingOrNotAnd: newInfo?.listening?.playing ?? false,
          })
        })
      } catch (error) {
        console.error('Error loading info', error)
      }
    }

    loadGithubInfo()
    const intervalId = setInterval(() => loadGithubInfo(), 3_000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const isLoading = info === undefined

  return (
    <div className="flex justify-center">
      <div className="mt-[15px] flex min-w-[366px] flex-col items-start border border-[#d3c79e] p-[25px]">
        <InfoItem
          title="Status"
          isLoading={isLoading}
          postfix={secureTimeAgo(info?.githubStatus?.updatedAt)}
        >
          {info?.githubStatus?.status}
        </InfoItem>
        {info?.githubStatus?.company && (
          <InfoItem title="Working on" isLoading={isLoading}>
            {info?.githubStatus?.company}
          </InfoItem>
        )}
        <InfoItem title="Contributions" isLoading={isLoading}>
          <>
            <b className="font-['Fira_Code']">{info?.githubStatus?.contributions ?? 0}</b>&nbsp;in the last year
          </>
        </InfoItem>
        <InfoItem
          title="Latest Commit"
          isLoading={isLoading}
          postfix={secureTimeAgo(info?.latestCommit?.createdAt)}
        >
          <a href={info?.latestCommit?.url} target="_blank" className="whitespace-nowrap text-[#0057bc] max-w-[280px] overflow-hidden no-underline text-ellipsis">
            {info?.latestCommit?.message}
          </a>
        </InfoItem>
        <InfoItem title={'Reading'} isLoading={isLoading}>
          <a href={info?.reading?.profileUrl} target="_blank" className="whitespace-nowrap text-[#0057bc] max-w-[280px] overflow-hidden no-underline text-ellipsis">
            {info?.reading?.title}
          </a>
        </InfoItem>
      </div>
    </div>
  )
}
