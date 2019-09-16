import React from 'react'
import { graphql } from 'gatsby'
import CommonPage from './commonPage'
import SitePageStyles from '../styles/sitePageStyles'


export default function SitePage(props) {
  return (
    <SitePageStyles>
      <CommonPage data={props.data} />
    </SitePageStyles>
  )
}

export const SITE_PAGE_QUERY = graphql`
  query SitePageQuery($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
      }
    }
  }
`


