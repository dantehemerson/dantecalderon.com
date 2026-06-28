import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import styled from 'styled-components'
import InProgress from './InProgress'

const ItemWrapper = styled.div`
  text-align: left;
  text-decoration: none;
`

const CoverWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 2px;
  margin-bottom: 13px !important;
  border: 2px solid #f5f5f5;
  border-radius: 1rem;
`

const Title = styled.h3`
  color: #22292f;
  font-family: 'Open Sans', serif;
  font-size: 22px;
  text-align: left;
  width: 100%;
  transition: 0.3s;
  font-family: 'Gentium Book Basic', 'Times New Roman', Times, serif;
  color: #052d3e;
  display: inline;
  margin: 0;
`

const Cover = styled(GatsbyImage)``

const ItemLink = styled.article`
  padding: 1.2rem 0.5rem;
`

const Arrow = styled.span`
  display: inline-block;
  padding-left: 2px;
  transition: transform 0.3s;
`

const LinkToProject = styled(Link)`
  text-decoration: none;
  color: #22292f;
  font-weight: bold;
  display: flex;
  align-items: center;
  font-size: 14px;
  transition: 0.3s;
  &:hover {
    opacity: 0.8;
  }
  &:hover ${Arrow} {
    transform: translateX(4px);
  }
`

const Description = styled.p`
  color: #727272;
  margin: 0;
  font-size: 14px;
  padding-top: 10px;
`

const BottomData = styled.div`
  display: flex;
  margin: 10px 0;
  justify-content: space-between;
`

export default props => (
  <ItemLink>
    <ItemWrapper>
      <CoverWrapper>
        {!props.finished && <InProgress />}
        <Cover alt="Portfolio item cover" image={props.data.thumbnail} />
      </CoverWrapper>
      <div>
        <Title>{props.data.title}</Title>
        <Description>{props.data.description}</Description>
      </div>
    </ItemWrapper>
    <BottomData>
      <LinkToProject to={props.data.href} target="_blank" rel="noopener noreferrer">
        {props.data.hrefText && (
          <>
            {props.data.hrefText} <Arrow>➜</Arrow>
          </>
        )}
      </LinkToProject>
    </BottomData>
  </ItemLink>
)
