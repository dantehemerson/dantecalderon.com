import { graphql } from 'gatsby'
import React from 'react'
import ProjectHeader from '../components/ProjectHeader'
import Sidebar from '../components/SidebarProject'
import Layout from './TemplateLayout'
import Markdown from '../components/Markdown'

export const Project = ({ frontmatter, children }) => {
  return (
    <div>
      <ProjectHeader
        title={frontmatter.title}
        subtitle={frontmatter.subtitle}
        repository={frontmatter.repository}
        website={frontmatter.website}
        finished={frontmatter.finished}
        images={frontmatter.images}
        tags={frontmatter.tags}
      />
      <Markdown>{children}</Markdown>
      <Sidebar
        tags={frontmatter.tags}
        stack={frontmatter.stack}
        roles={frontmatter.roles}
        website={frontmatter.website}
        repository={frontmatter.repository}
        client={frontmatter.client}
        licence={frontmatter.licence}
      />
    </div>
  )
}

const ProjectTemplate = ({ data, children }) => {
  const post = data.mdx
  const { siteMetadata } = data.site
  const { title, description, image } = post.frontmatter

  return (
    <Layout
      title={title}
      path={post.fields.slug}
      image={image.childImageSharp.gatsbyImageData}
      description={description}
    >
      <Project
        frontmatter={post.frontmatter}
        {...siteMetadata}
      >
        {children}
      </Project>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    avatar: imageSharp(fluid: { originalName: { regex: "/avatar2.jpeg/" } }) {
      gatsbyImageData(layout: CONSTRAINED, width: 720, placeholder: TRACED_SVG)
    }
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      frontmatter {
        title
        subtitle
        date(formatString: "MMMM DD, YYYY")
        description
        image {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 1920, placeholder: TRACED_SVG)
          }
        }
        images {
          description
          image {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, width: 1920, placeholder: TRACED_SVG)
            }
          }
        }
        model
        tags
        stack
        roles
        client
        repository
        website
        licence
        finished
      }
      fields {
        slug
      }
    }
  }
`

export default ProjectTemplate
