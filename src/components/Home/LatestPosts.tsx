import { graphql, Link, useStaticQuery } from 'gatsby'
import { get } from 'lodash'
import React from 'react'

export default function LatestPosts() {
  const posts = get(
    useStaticQuery<{ abs: number }>(graphql`
      query {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { frontmatter: { model: { eq: "post" }, published: { eq: true } } }
          limit: 3
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                date(formatString: "DD MMMM, YYYY")
                title
                image {
                  childImageSharp {
                    fluid {
                      ...GatsbyImageSharpFluid_tracedSVG
                    }
                  }
                }
              }
            }
          }
        }
      }
    `),
    'allMdx.edges',
    []
  )

  return (
<<<<<<< HEAD
    <div
      style={{
        background: '#fafafa',
        padding: '35px 12px 25px',
      }}
    >
      <Header>
        <h2>Latest Posts:</h2>
        <Link className="all" to="/blog">
          See all ➤
        </Link>
      </Header>
      <Container>
        {posts.map(({ node: post }, index) => {
          return (
            <LatestPostsItem
              key={index}
              post={{
                title: post.frontmatter.title,
                fluidImg: post.frontmatter.image.childImageSharp.fluid,
                path: `/${post.fields.slug}`,
              }}
            />
=======
    <div>
      <p className="md-p">
        <strong>📖 Latest Posts:</strong>
      </p>
      <ul>
        {posts.map(({ node: post }, index) => {
          return (
            <li id={index}>
              <p className="md-p">
                <Link to={`/${post.fields.slug}`}>{post.frontmatter.title}</Link>
              </p>
            </li>
>>>>>>> develop
          )
        })}
        <li id="more">
          <p className="md-p">
            <Link to="/blog">more...</Link>
          </p>
        </li>
      </ul>
    </div>
  )
}

<<<<<<< HEAD
const Header = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  display: flex;
  padding-bottom: 10px;
  align-items: center;
  justify-content: space-between;
  h2 {
    margin: 0;
    text-decoration: underline;
  }
  .all {
    color: #4c91e2;
    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;
    text-decoration: none;
  }
`

const Container = styled.div`
  max-width: 1080px;
  display: grid;
  grid-gap: 10px;
  margin: 0 auto;
  ${media.sm`
    grid-template-columns: 1fr 1fr;
  `};
  ${media.md`
    grid-template-columns: 1fr 1fr 1fr;
  `};
`
=======
//   <Header>
//     <h2>Latest Posts:</h2>
//     <Link className="all" to="/blog">
//       See all ➤
//     </Link>
//   </Header>
//   <Container>
//   <LatestPostsItem
//   key={index}
//   post={{
//     title: post.frontmatter.title,
//     fluidImg: post.frontmatter.image.childImageSharp.fluid,
//     path: `/${post.fields.slug}`,
//   }}
// />
//   </Container>
// </div>
>>>>>>> develop
