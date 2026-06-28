import React from 'react'
import styled from 'styled-components'
import { media } from '../styles'

// All styles for markdown here

const StyledContent = styled.div`
  line-height: 1.4;
  blockquote {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    font-style: italic;
    padding-left: 8px;
    border-left: 5px solid #6b6b6b;
  }

  h1.md-h1 a,
  h2.md-h2 a,
  h3.md-h3 a,
  h4.md-h4 a,
  h5.md-h5 a,
  h6.md-h6 a,
  p.md-p a,
  ul.md-ul a,
  ol.md-ol a {
    color: rgb(74, 144, 226);
    border-bottom: 1px dotted rgb(91, 159, 239);
    text-decoration: none;

    &:hover {
      border-bottom-style: solid;
    }

    // Anchor of title
    &.anchor {
      border-bottom: none;
    }
  }
  // Each item max width
  div.gatsby-highlight,
  ul,
  div.gist,
  ol,
  p.md-p,
  h1.md-h1,
  h2.md-h2,
  h3.md-h3,
  h4.md-h4,
  h5.md-h5,
  h6.md-h6 {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  // only texts
  p.md-p,
  div.gist,
  h1.md-h1,
  h2.md-h2,
  h3.md-h3,
  h4.md-h4,
  h5.md-h5,
  .glitch-embed-wrap,
  table,
  h6.md-h6 {
    padding-left: 10px;
    padding-right: 10px;
  }

  table {
    overflow-x: scroll;
    max-width: 1200px;
    border: 1px solid #eee;
    margin-left: auto;
    margin-right: auto;
  }

  .glitch-embed-wrap {
    max-width: 1250px;
    margin-left: auto;
    margin-right: auto;
  }

  figure img {
    border: 1px solid #eee;
  }

  p.md-p > img {
    margin-left: auto;
    margin-right: auto;
  }

  // dots of list
  ul,
  ol {
    padding-left: 30px;
    padding-right: 12px;
  }

  p.md-p,
  ul,
  ol {
    font-family: 'Gentium Book Basic', 'Times New Roman', Times, serif;
  }

  p.md-p,
  .gatsby-highlight,
  ul,
  ol {
    font-size: 17px;
  }

  p.md-p {
    padding-left: 12px;
    padding-right: 12px;
  }

  // all texts
  h1.md-h1,
  h2.md-h2,
  h3.md-h3,
  h4.md-h4,
  h5.md-h5,
  h6.md-h6,
  p.md-p a {
    line-height: 1.4;
  }

  h1.md-h1,
  h2.md-h2,
  h3.md-h3,
  h4.md-h4,
  h5.md-h5,
  h6.md-h6 {
    font-family: 'Gentium Book Basic', 'Times New Roman', Times, serif;
  }

  h2.md-h2 {
    text-align: center;
  }

  h3.md-h3,
  h2.md-h2 {
    margin-top: 30px;
    font-size: 21px;
  }

  h4.md-h4 {
    font-size: 16px;
  }

  h6.md-h6 {
    font-weight: 600;
    color: rgba(0, 0, 0, 0.53);
    text-align: center;
    font-size: 12px;
    position: relative;
    top: -25px;
    margin-bottom: 0;
  }

  ${media.sm`
    p.md-p, .gatsby-highlight, ul, ol {
    font-size: 18px;
    }
    h3.md-h,
    h2.md-h2 {
      margin-top: 30px;
      font-size: 23px;
    }
    h4.md-h4 {
      font-size: 18px;
    }
  `}

  ${media.md`
    p.md-p, .gatsby-highlight, ul, ol {
      font-size: 19px;
    }
    h3.md-h3,
    h2.md-h2 {
      margin-top: 40px;
      font-size: 28px;
    }
    h4.md-h4 {
      font-size: 21px;
    }
  `}

  div.gatsby-highlight {
    & + h4,
    & + h3,
    & + h2 {
      margin-top: 30px !important;
    }

    a {
      color: #69bcdb;
    }
  }

  // Aun no se si se usa
  .gatsby-resp-image-wrapper {
    max-width: 1000px !important;
  }

  .gatsby-resp-iframe-wrapper {
    max-width: 100%;
  }
  .gatsby-resp-image-figcaption {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 45px;
    font-weight: 600;
    padding-left: 12px;
    line-height: 1.9;
    padding-right: 12px;
    font-family: 'Open Sans', sans-serif;
    color: #0000008a;
    font-size: 12px;
    max-width: 600px !important;
  }

  img.emoji-icon {
    display: inline;
    margin: 0;
    position: relative;
    top: 3px;
    width: 17px;
    ${media.sm`
      width: 19px;
    `}
    ${media.md`
      width: 21px;
    `}
  }
`

export default ({ children }) => (
  <StyledContent id="post_body">
    {children}
  </StyledContent>
)
