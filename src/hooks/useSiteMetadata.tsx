import { graphql, useStaticQuery } from 'gatsby'

export const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          subtitle
          social {
            title
            icon
            link
          }
          socials {
            github
            twitter
            linkedin
            instagram
          }
          disqusShortname
          siteUrl
        }
      }
    }
  `)

  return {
    siteMetadata: data.site.siteMetadata,
  }
}
