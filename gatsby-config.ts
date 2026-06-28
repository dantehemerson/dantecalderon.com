require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
})

import type { GatsbyConfig } from 'gatsby'

const aboutData = require('./about')

const config: GatsbyConfig = {
  pathPrefix: `/`,
  ...aboutData,
  mapping: {
    'MarkdownRemark.frontmatter.author': `AuthorYaml`,
    'Mdx.frontmatter.author': `AuthorYaml`,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/src/assets`,
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/helpers/typography.ts',
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.md', '.mdx'],
        gatsbyRemarkPlugins: [
          'gatsby-remark-embed-video',
          {
            resolve: 'gatsby-remark-code-titles',
            options: {
              className: 'gatsby-remark-code-title',
            },
          },
          {
            resolve: 'gatsby-remark-embed-gist',
            options: {
              username: 'dantehemerson',
              includeDefaultCss: true,
            },
          },
          {
            resolve: `gatsby-remark-classes`,
            options: {
              classMap: {
                'heading[depth=1]': 'md-h1',
                'heading[depth=2]': 'md-h2',
                'heading[depth=3]': 'md-h3',
                'heading[depth=4]': 'md-h4',
                'heading[depth=5]': 'md-h5',
                'heading[depth=6]': 'md-h6',
                paragraph: 'md-p',
                'list[ordered=false]': 'md-ul',
                'list[ordered=true]': 'md-ol',
                listItem: 'md-li',
              },
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 2000,
              quality: 100,
              showCaptions: true,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-images-medium-zoom`,
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          'gatsby-remark-prismjs',
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `80`,
            },
          },
          'gatsby-remark-external-links',
          'gatsby-remark-smartypants',
        ],
      },
    },
    `gatsby-plugin-catch-links`,
    'gatsby-plugin-sitemap',
    'gatsby-plugin-robots-txt',
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          'UA-121858272-1', // Google Analytics / GA
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          // cookie_domain: 'dantecalderon.com',
          // cookie_name: 'gaDanteCalderon',
          cookie_expires: 0,
          // sample_rate: 5,
          anonymize_ip: true,
          send_page_view: true, // default appears to be false.

          // site_speed_sample_rate: 10,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          respectDNT: true,
          // anonymize_ip: true,
          // Defaults to https://www.googletagmanager.com
          // origin: "YOUR_SELF_HOSTED_ORIGIN",
        },
      },
    },
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        mergeSecurityHeaders: true,
        mergeCachingHeaders: true,
        generateMatchPathRewrites: true,
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#1976d2',
        showSpinner: false,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Dante Calderón',
        short_name: 'Dante C.',
        start_url: '/',
        icon: 'src/assets/images/logo.png',
        background_color: '#E1524A',
        theme_color: '#000',
        display: 'standalone',
      },
    },
    'gatsby-plugin-styled-components',
  ],
}

export default config
