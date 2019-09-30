import React from 'react'
import CommonPage from '../templates/commonPage'
import SitePageStyles from '../styles/sitePageStyles'


const IndexPage = (props) => {
  return (
    <SitePageStyles>
      <CommonPage data={props.data} />
    </SitePageStyles>
  )
}

export const HOME_PAGE_QUERY = graphql`
  query HomePageQuery {
    mdx(fields: { slug: { eq: "/home/" } }) {
      body
      frontmatter {
        title
      }
    }
  }
`

export default IndexPage
