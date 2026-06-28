const _ = require('lodash')
import { GatsbyNode } from 'gatsby'
import { generateTagInfo } from './src/helpers/tags.helpers'
const path = require('path')

const TAG_NODE_TYPE = `Tag`

function getFullPath(frontmatter): string {
  const pathPrefix = frontmatter.pathPrefix ?? ''
  const slug = frontmatter.slug ?? ''

  return path.join(pathPrefix, slug)
}

export const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const projectTemplate = path.resolve('./src/templates/ProjectTemplate.tsx')
  const postTemplate = path.resolve('./src/templates/PostTemplate.tsx')
  const blogListTemplate = path.resolve('./src/templates/BlogListTemplate.tsx')
  const tagsBlogListTemplate = path.resolve('./src/templates/TagsBlogListTemplate.tsx')

  const {
    data: { allPosts, allTags },
  } = await graphql(`
    {
      allPosts: allMdx(
        sort: { frontmatter: { date: DESC } }
        limit: 200
        filter: { frontmatter: { published: { eq: true }, model: { eq: "post" } } }
      ) {
        edges {
          node {
            internal {
              contentFilePath
            }
            frontmatter {
              model
              slug
              pathPrefix
              tags
            }
          }
        }
      }

      allTags: allTag {
        nodes {
          id
          slug
        }
      }

      # allProjects: allMdx(
      #   sort: { frontmatter: { date: DESC } }
      #   limit: 100
      #   filter: { frontmatter: { published: { eq: true }, model: { eq: "project" } } }
      # ) {
      #   edges {
      #     node {
      #       internal {
      #         contentFilePath
      #       }
      #       frontmatter {
      #         model
      #         slug
      #         pathPrefix
      #         tags
      #       }
      #     }
      #   }
      # }
      # }
    }
  `)

  const POSTS_PER_PAGE = 20

  const blogPostsPaginated = _.chunk(allPosts.edges, POSTS_PER_PAGE)
  blogPostsPaginated.forEach((_, i) => {
    createPage({
      path: i === 0 ? '/blog' : `/blog/page/${i}`,
      component: blogListTemplate,
      context: {
        limit: POSTS_PER_PAGE,
        skip: i * POSTS_PER_PAGE,
        numPages: blogPostsPaginated.length,
        currentPage: i,
        hasPrevPage: i > 0,
        hasNextPage: i < blogPostsPaginated.length - 1,
      },
    })
  })

  allTags.nodes.map(tag => {
    createPage({
      path: `/blog/tags/${tag.slug}`,
      component: tagsBlogListTemplate,
      context: {
        tagId: tag.id,
      },
    })
  })

  const createMdxPages = mdxPages => {
    mdxPages.forEach((mdxPage, index) => {
      const previous = index === mdxPages.length - 1 ? null : mdxPages[index + 1].node
      const next = index === 0 ? null : mdxPages[index - 1].node

      const { model } = mdxPage.node.frontmatter
      const contentFilePath = mdxPage.node.internal.contentFilePath

      const fullPath = getFullPath(mdxPage.node.frontmatter)
      const baseTemplate = model === 'post' ? postTemplate : projectTemplate

      createPage({
        path: fullPath,
        component: `${baseTemplate}?__contentFilePath=${contentFilePath}`,
        context: {
          slug: fullPath,
          previous,
          next,
        },
      })
    })
  }

  createMdxPages(allPosts.edges)
  // createMdxPages(allProjects.edges)
}

const counter = {}
export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNodeField, createNode } = actions
  const frontmatter = node.frontmatter as any

  if (['MarkdownRemark', 'Mdx'].includes(node.internal.type) && frontmatter) {
    const fullPath = getFullPath(frontmatter)

    createNodeField({
      node,
      name: 'slug',
      value: fullPath,
    })

    if (frontmatter.tags && frontmatter.published && frontmatter.model === 'post') {
      const tagIdsForPost = frontmatter.tags.map(tag => {
        const tagInfo = generateTagInfo(tag)

        if (counter[tagInfo.slug] === undefined) {
          counter[tagInfo.slug] = 1
          tag
        } else {
          counter[tagInfo.slug]++
        }

        tagInfo.postCount = counter[tagInfo.slug]
        tagInfo.id = createNodeId(`${TAG_NODE_TYPE}-${tagInfo.slug}`)

        createNode({
          ...tagInfo,
          id: tagInfo.id,
          parent: null,
          children: [],
          internal: {
            type: TAG_NODE_TYPE,
            content: JSON.stringify(tagInfo),
            contentDigest: createContentDigest(tagInfo),
          },
        })

        return tagInfo.id
      })

      createNodeField({
        node,
        name: 'tags',
        value: tagIdsForPost,
      })
    }
  }
}

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ actions }) => {
  const typesDefs = `
  type ${TAG_NODE_TYPE} implements Node {
    id: ID!
    slug: String
    title: String
    color: String
    textColor: String
    postCount: Int
  }
  type MdxFields {
    slug: String!
    tags: [${TAG_NODE_TYPE}] @link
  }
`
  actions.createTypes(typesDefs)
}
