import React from 'react'
import SEO from '../components/seo'
import SitePageStyles from '../styles/sitePageStyles'

const NotFoundPage = () => (
  <SitePageStyles>
    <SEO title='404: Not found' />
    <h1>PAGE NOT FOUND</h1>
    <p>Oops! That route doesn&#39;t exist...</p>
  </SitePageStyles>
)

export default NotFoundPage
