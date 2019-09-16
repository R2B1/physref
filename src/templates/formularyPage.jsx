import React from 'react'
import { graphql } from 'gatsby'
import CommonPage from './commonPage'
import FormularyPageStyles from '../styles/formularyPageStyles'


export default function FormularyPage(props) {
  return (
    <FormularyPageStyles>
      <CommonPage data={props.data} />
    </FormularyPageStyles>
  )
}

export const FORMULARY_PAGE_QUERY = graphql`
  query FormularyPageQuery($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
      }
    }
  }
`
