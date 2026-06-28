import { graphql, useStaticQuery } from 'gatsby'
import React, { useState, useEffect } from 'react'
import AuthorPostFooter from '../components/AuthorPostFooter'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { pages } from '../helpers'
import { getSrc } from 'gatsby-plugin-image'

export default function TemplateLayout(props) {
  const [show_share, setShowShare] = useState(false)

  const data = useStaticQuery(graphql`
    query {
      avatar: imageSharp(fluid: { originalName: { regex: "/avatar.jpg/" } }) {
        gatsbyImageData(layout: CONSTRAINED, width: 180, placeholder: TRACED_SVG)
      }
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `)

  useEffect(() => {
    let body = document.documentElement
    const element = document.getElementById('Post_content')
    if (!element) return
    let contentY = element.offsetTop
    let height = element.clientHeight

    const scrollListenerShare = () => {
      let y = body.scrollTop - contentY + 110
      let show = y >= 0 && y - 0 <= height - 340
      if (show_share !== show) {
        setShowShare(show)
      }
    }

    window.addEventListener('scroll', scrollListenerShare)
  }, [show_share])

  const { isPost, title, image, externalImage, description, path } = props
  const { siteUrl } = data.site.siteMetadata
  return (
    <Layout active={isPost ? pages.blog : pages.projects}>
      <SEO
        title={title}
        image={image ? `${siteUrl}${getSrc(image)}` : externalImage}
        url={`${siteUrl}/${path}`}
        description={description}
        isPost={isPost}
      />
      {props.children}

      <AuthorPostFooter avatar={data.avatar.gatsbyImageData} make={!isPost} />
      {isPost && true /* Show sharer*/}
    </Layout>
  )
}
