import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { Card } from '../components/Card'
import Layout from '../components/Layout'
import Pagination from '../components/Pagination'
import SEO from '../components/SEO'
import { TagsSection } from '../components/TagsSection'
import { pages } from '../helpers'

function Blog(props) {
  console.log('🤫 Dante ➤ Blog ➤ props', props)
  const tags = props.data.allTag.nodes
  const posts = props.data.allMdx.nodes
  const siteUrl = props.data.site.siteMetadata.siteUrl

  const { currentPage, numPages, hasNextPage, hasPrevPage } = props.pageContext

  return (
    <Layout active={pages.blog}>
      <div className="Blog" style={{ marginTop: 90 }}>
        <SEO title="Blog" url={`${siteUrl}/blog`} />
        <TagsSection tags={tags} showCount={true} />
        <PostsWrapper>
          {posts.map(node => {
            return (
              <Card
                data={
                  {
                    title: node.frontmatter.title,
                    thumbnail: node.frontmatter.image?.childImageSharp?.gatsbyImageData,
                    externalThumbnail: node.frontmatter.externalImage,
                    excerpt: node.frontmatter.description || node.excerpt,
                    date: node.frontmatter.date,
                    tags: node.fields.tags?.slice(0, 4),
                    path: `/${node.fields.slug}`,
                  } as any
                }
                key={node.id}
              />
            )
          })}
          <Pagination
            pages={numPages}
            selected={currentPage}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
          />
        </PostsWrapper>
      </div>
    </Layout>
  )
}

const PostsWrapper = styled.div`
  padding: 0 15px;
  max-width: 800px;
  margin: 0 auto 35px;
`

export const queryBlog = graphql`
  query QueryTagBlogList($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }

    allTag(limit: 10, sort: { postCount: DESC }) {
      nodes {
        textColor
        slug
        title
        postCount
      }
    }

    allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { model: { eq: "post" }, published: { eq: true } } }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        id
        excerpt(pruneLength: 240)
        fields {
          slug
          tags {
            id
            slug
            title
            color
            textColor
          }
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          slug
          externalImage
          image {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
            }
          }
        }
      }
    }
  }
`

export default Blog
