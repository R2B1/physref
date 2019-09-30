import React from 'react'
import PropTypes from 'prop-types'
import { MDXProvider } from '@mdx-js/react'
import styled from '@emotion/styled'
import Header from '../components/header'
import Section from '../components/section'
import { device } from '../styles/device'
import '../styles/globalStyles.scss'


const Layout = (props) => {
  
  return (
    <ColorThemeWrapper>
      <PageWrapper>
        <Header slug={props.location.pathname} />
        <MDXProvider
          components={{
            h2: Section,
          }}
        >
          {props.children}
        </MDXProvider>
      </PageWrapper>
    </ColorThemeWrapper>
  )
}


Layout.propTypes = {
  children: PropTypes.node.isRequired,
}


const ColorThemeWrapper = styled.div`
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  min-height: 100vh;
`

const PageWrapper = styled.div`
  max-width: 80rem;
  font-family: 'Roboto-regular', sans-serif;
  font-size: 1.4rem;
  @media ${device.small}  { font-size: 1.6rem; }
  @media ${device.medium} { font-size: 1.6rem; }
  @media ${device.large} { font-size: 1.8rem; }
  @media ${device.fullwidth}  { font-size: 2.0rem; }
`

export default Layout
