import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import { media } from '../../styles'
import { Info } from '../Info'
import { SocialHome } from '../SocialHome'
import { INFO } from '../../data/info'

export default function HeaderHome(props) {
  const { subtitle } = INFO

  const data = useStaticQuery(graphql`
    query {
      avatar: imageSharp(fluid: { originalName: { regex: "/avatar.jpg/" } }) {
        gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
      }
      site {
        siteMetadata {
          title
          siteUrl
        }
      }
    }
  `)

  return (
    <div
      style={{
        background: '#dfd5a66e',
      }}
    >
      <Container className="row">
        <MainInfoWrapper>
          <Title>{data.site.siteMetadata.title}</Title>
          <Subtitle>{subtitle}</Subtitle>
          <SocialHome />
          <Info />
        </MainInfoWrapper>
        {/* <AvatarHome image={data.avatar.gatsbyImageData} /> */}
      </Container>
    </div>
  )
}

const Container = styled.div`
  min-height: 600px;
  max-width: 1080px;
  display: grid;
  padding-top: 80px;
  margin: 0 auto !important;
  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
  font-size: 32px;
  font-weight: 900;
  text-align: center;
  font-family: 'Gentium Book Basic', 'Times New Roman', Times, serif;
  color: #052d3f;
  margin-bottom: 0;
  position: relative;
  ${media.sm`
    font-size: 2.4rem;
  `};
`

const MainInfoWrapper = styled.div`
  text-align: center;
  padding: 0 5px;
`

const Subtitle = styled.h2`
  font-size: 14px;
  font-weight: 400;
  margin: 10px 0 20px 0;
  font-family: 'Fira Code', 'Open Sans', sans-serif;
  text-align: center;
  color: #052d3f;
`
