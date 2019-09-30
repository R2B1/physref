import React from 'react'
import SEO from '../components/seo'
import CommonPageStyles from '../styles/commonPageStyles'
import SitePageStyles from '../styles/sitePageStyles'

const NotFoundPage = () => (
  <CommonPageStyles>
    <SitePageStyles>
      <SEO title='404: Not found' />
      <h1>404: Page not found</h1>
    </SitePageStyles>
  </CommonPageStyles>
)

export default NotFoundPage
