import React from 'react'
import styled from 'styled-components'
import { media } from '../../styles'
import Item from './PortfolioItem'

const Wrapper = styled.div`
  display: grid;
  max-width: 1080px;
  margin: 0 auto;
  grid-template-columns: minmax(min-content, 290px);
  justify-content: center;
  grid-gap: 30px;
  padding: 0 13px;
  ${media.md`
    grid-template-columns: 1fr 1fr;
  `};
`

export default props => (
  <Wrapper>
    {props.posts.map(({ node }, index) => {
      return (
        <Item
          data={{
            title: node.frontmatter.title,
            description: node.frontmatter.description,
            subtitle: node.frontmatter.subtitle,
            thumbnail: node.frontmatter.image.childImageSharp.gatsbyImageData,
            path: `/${node.fields.slug}`,
            tags: node.frontmatter.tags,
            repository: node.frontmatter.repository,
            website: node.frontmatter.website,
            href: node.frontmatter.href,
            hrefText: node.frontmatter.hrefText,
          }}
          key={index}
          finished={node.frontmatter.finished}
        />
      )
    })}
  </Wrapper>
)
