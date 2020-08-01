import React from 'react'
import PropTypes from 'prop-types'
import { MDXProvider } from '@mdx-js/react'
import styled from '@emotion/styled'
import Header from '../components/header'
import NavMenu from '../components/navMenu'
import Section from '../components/section'
import { device } from '../styles/device'
import '../styles/globalStyles.scss'


const Layout = (props) => {
  
  return (
    <ColorThemeWrapper>
      <GridContainer>
        <HeaderContainer>
          <Header slug={props.location.pathname} />
        </HeaderContainer>
        <ContentContainer>
          <MDXProvider components={{ h2: Section }}>
            {props.children}
          </MDXProvider>
        </ContentContainer>
        <NavContainer>
          <NavMenu />
        </NavContainer>
      </GridContainer>
    </ColorThemeWrapper>
  )
}


Layout.propTypes = {
  children: PropTypes.node.isRequired,
}


const ColorThemeWrapper = styled.div`
  background-color: ${props => props.theme.background[0]};
  color: ${props => props.theme.text[0]};
  min-height: 100vh;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  grid-template-columns: 1fr minmax(0, 80rem) 1fr;
  grid-template-areas:
    '. header .'
    '. content .';
  @media ${device.large} {
    grid-template-columns: 1fr minmax(0, 80rem) 24.1rem 1fr;
    grid-template-areas:
      '. header header .'
      '. content nav .';
  }
  @media ${device.fullwidth} {
    grid-template-columns: 1fr 80rem 28.1rem 1fr;
  }
`

const HeaderContainer = styled.div`
  grid-area: header;
  position: sticky;
  top: 0;
  border-bottom: 1px solid ${props => props.theme.background[1]};
  height: 6.1rem;
  z-index: 50;
`

const ContentContainer = styled.div`
  position: relative;
  grid-area: content;
  max-width: 80rem;
  font-size: 1.4rem;
  @media ${device.small}  { font-size: 1.6rem; }
  @media ${device.xlarge} { font-size: 1.8rem; }
`

const NavContainer = styled.div`
  @media ${device.large} {
    grid-area: nav;
    position: sticky;
    top: calc(6rem + 2.4rem);
    height: calc(100vh - 6rem);
    overflow: auto;
    margin: 2.4rem 0 0 0;
  }
`

export default Layout
