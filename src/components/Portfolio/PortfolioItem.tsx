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

const LinkToProject = styled(Link)``

const Description = styled.p`
  color: #727272;
  margin: 0;
  font-size: 13px;
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
        {props.data.hrefText && <span>{props.data.hrefText}</span>}
        <svg
          className="Shortcut__icon"
          fill="currentColor"
          preserveAspectRatio="xMidYMid meet"
          height="17px"
          width="17px"
          viewBox="0 0 40 40"
          style={{ verticalAlign: 'text-top' }}
        >
          <g>
            <path d="m23.4 5h11.6v11.6h-3.4v-5.9l-16.3 16.3-2.3-2.3 16.3-16.3h-5.9v-3.4z m8.2 26.6v-11.6h3.4v11.6q0 1.4-1 2.4t-2.4 1h-23.2q-1.4 0-2.4-1t-1-2.4v-23.2q0-1.4 1-2.4t2.4-1h11.6v3.4h-11.6v23.2h23.2z" />
          </g>
        </svg>
      </LinkToProject>
    </BottomData>
  </ItemLink>
)
