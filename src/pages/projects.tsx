import { graphql } from 'gatsby'
import React from 'react'
import Layout from '../components/Layout'
import List from '../components/Portfolio/ProjectsList'
import SEO from '../components/SEO'
import { pages } from '../helpers'

const Projects = props => {
  const posts = props.data.allMdx.edges || []
  const siteUrl = props.data.site.siteMetadata.siteUrl

  return (
    <Layout location={props.location} active={pages.projects}>
      <SEO title="Projects" url={`${siteUrl}/projects`} />
      <List posts={posts} />
    </Layout>
  )
}

export const queryProjects = graphql`
  query QueryProjects {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }

    allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { model: { eq: "project" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            description
            slug
            image {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, width: 1920, placeholder: TRACED_SVG)
              }
            }
            tags
            date
            repository
            website
            finished
            href
            hrefText
          }
        }
      }
    }
  }
`

export default Projects
