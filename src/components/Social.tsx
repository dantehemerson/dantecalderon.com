import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

const SocialWrapper = styled.div`
  text-align: center;
`
const SocialIcon = styled.a`
  margin: 0 5px !important;
  background: #bbbbbb;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  padding: 8px;
  transition: 0.3s;
  display: inline-block;
  img {
    transition: 0.3s;
    width: 100%;
    margin: 0;
  }
  &:hover {
    transform: scale(1.15);
  }

  &:hover img {
    transform: scale(0.9);
  }
`

export default props => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          subtitle
          social {
            title
            icon
            link
          }
        }
      }
    }
  `)

  return (
    <SocialWrapper>
      {data.site.siteMetadata.social.slice(0, 4).map(item => (
        <SocialIcon
          key={item.title}
          className={`${item.icon}--hover`}
          href={item.link}
          title={`${item.title} - ${data.site.siteMetadata.title}`}
          rel="noopener"
          target="_blank"
        >
          <img
            alt={item.title}
            src={
              item.icon === 'dev'
                ? 'https://d2fltix0v2e0sb.cloudfront.net/dev-badge.svg'
                : `https://icongr.am/fontawesome/${item.icon}.svg?color=ffffff`
            }
          />
        </SocialIcon>
      ))}
    </SocialWrapper>
  )
}
