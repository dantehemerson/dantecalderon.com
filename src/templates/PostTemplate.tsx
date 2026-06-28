import { graphql } from 'gatsby'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import React from 'react'
import Markdown from '../components/Markdown'
import PostHeader from '../components/PostHeader'
import { Share } from '../components/Share'
import { TagsSection } from '../components/TagsSection'
import Layout from './TemplateLayout'

export const PostContent = ({ title, image, externalImage, date, avatar, children }) => (
  <React.Fragment>
    <PostHeader
      title={title}
      image={image}
      externalImage={externalImage}
      date={date}
      avatar={avatar}
    />
    <Markdown>{children}</Markdown>
  </React.Fragment>
)

const PostTemplate = ({ data, children }) => {
  const {
    fields: { slug, tags },
    frontmatter: { title, image, externalImage, date, description },
  } = data.mdx

  return (
    <Layout
      isPost
      title={title}
      path={slug}
      image={image?.childImageSharp.gatsbyImageData}
      externalImage={externalImage}
      description={description}
    >
      <PostContent
        title={title}
        image={image?.childImageSharp.gatsbyImageData}
        externalImage={externalImage}
        date={date}
        avatar={data.avatar.gatsbyImageData}
      >
        {children}
      </PostContent>
      <TagsSection tags={tags} />
      <Share title={title} path={slug} />
      {/* <SubscribeForm /> */}
    </Layout>
  )
}

export const pageQuery = graphql`
  query PostQuery($slug: String!) {
    avatar: imageSharp(fluid: { originalName: { regex: "/avatar.jpg/" } }) {
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
        externalImage
        image {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 1920, placeholder: TRACED_SVG)
          }
        }
        model
        style
      }
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
    }
  }
`

export default PostTemplate
