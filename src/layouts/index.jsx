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
      <GridContainer>
        <LeftPadding />
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
        <RightPadding />
      </GridContainer>
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

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  @media ${device.fullwidth} {
    grid-template-columns: auto 80rem auto;
  }
  grid-template-areas:
    'left-padding page-wrapper right-padding';
  min-height: 100vh;
  height: 100%;
`

const PageWrapper = styled.div`
  position: relative;
  grid-area: page-wrapper;
  max-width: 80rem;
  font-family: 'Roboto-regular', sans-serif;
  font-size: 1.4rem;
  @media ${device.small}  { font-size: 1.6rem; }
  @media ${device.medium} { font-size: 1.6rem; }
  @media ${device.large} { font-size: 1.8rem; }
  @media ${device.fullwidth}  { font-size: 2.0rem; }
`

const LeftPadding = styled.div`
  grid-area: left-padding;
  background-color: ${props => props.theme.background};
  z-index: 50;
`

const RightPadding = styled.div`
  grid-area: right-padding;
  background-color: ${props => props.theme.background};
  z-index: 50;
`

export default Layout
