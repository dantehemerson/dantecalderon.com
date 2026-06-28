import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { Card } from '../components/Card'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { TagsSection } from '../components/TagsSection'
import { pages } from '../helpers'

const PostsWrapper = styled.div`
  padding: 0 15px;
  max-width: 800px;
  margin: 0 auto 35px;
`

const BlogWithTags = ({ data, location }) => {
  const tag = data.tag
  const tags = data.allTag.nodes || []
  const posts = data.allMdx.nodes || []
  const siteUrl = data.site.siteMetadata.siteUrl

  return (
    <Layout active={pages.blog}>
      <div className="Blog" style={{ marginTop: 90 }}>
        <SEO title={`${tag.title} - Blog`} url={`${siteUrl}/blog/tags/${tag.slug}`} />
        <TagsSection tags={tags} showCount={true} selectedSlug={tag.slug} />
        <PostsWrapper>
          {posts.map(node => {
            return (
              <Card
                data={
                  {
                    title: node.frontmatter.title,
                    thumbnail: node.frontmatter.image?.childImageSharp.gatsbyImageData,
                    externalThumbnail: node.frontmatter.externalImage,
                    excerpt: node.frontmatter.description || node.excerpt,
                    date: node.frontmatter.date,
                    tags: node.fields.tags.slice(0, 4),
                    path: `/${node.fields.slug}`,
                  } as any
                }
                key={node.frontmatter.slug}
              />
            )
          })}
        </PostsWrapper>
      </div>
    </Layout>
  )
}

export const queryBlog = graphql`
  query QueryBlogList($tagId: String) {
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

    tag(id: { eq: $tagId }) {
      id
      slug
      title
      color
      textColor
      postCount
    }

    allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: {
        fields: { tags: { elemMatch: { id: { eq: $tagId } } } }
        frontmatter: { model: { eq: "post" }, published: { eq: true } }
      }
      limit: 100
    ) {
      nodes {
        excerpt(pruneLength: 240)
        fields {
          slug
          tags {
            id
            slug
            title
            color
            textColor
            postCount
          }
        }
        frontmatter {
          date(formatString: "DD MMMM, YYYY")
          title
          description
          slug
          externalImage
          image {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
            }
          }
          published
        }
      }
    }
  }
`

export default BlogWithTags
