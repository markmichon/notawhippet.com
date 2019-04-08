/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import { createGlobalStyle, ThemeProvider } from "styled-components"

const Style = createGlobalStyle`
html {
  box-sizing: border-box;
}

*, *::before, *::after {
  box-sizing: inherit;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.5;
  margin: 0;
}

body, h1,h2,h3,h4,h5,h6,ul,ol,li,p,pre,blockquote,figure,hr {
  margin: 0;
  padding:0;
}

ul {
  list-style: none;
}
input, textarea, select, button {
  color: inherit;
  font: inherit;
  letter-spacing: inherit;
}

embed, iframe, img, object, video {
  display: block;
  max-width: 100%;
}

[hidden] {
  display: none !important;
}
`
const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Style />
        {children}
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
