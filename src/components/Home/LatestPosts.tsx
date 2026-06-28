import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'

export function LatestPosts() {
  const {
    allMdx: { edges },
  } = useStaticQuery(graphql`
    query {
      allMdx(
        sort: { frontmatter: { date: DESC } }
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
            }
          }
        }
      }
    }
  `)

  return (
    <div>
      <p className="md-p">
        <strong>📖 Latest Posts:</strong>
      </p>
      <ul>
        {edges.map(({ node: post }, index) => {
          return (
            <li id={index} key={index}>
              <p className="md-p">
                <Link to={`/${post.fields.slug}`}>{post.frontmatter.title}</Link>
              </p>
            </li>
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
