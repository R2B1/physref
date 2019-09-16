import React from 'react'
import styled from '@emotion/styled'
import { useColorTheme } from '../context/ColorTheme'
import { LinkButton } from './menuButtons'
import { device } from '../styles/device'


const SiteMenu = (props) => {

  const themeState = useColorTheme()
  console.log('siteMenu rendering...')

  const toggleDarkMode = () => {
    themeState.toggle()
    props.toggleMenu()
  } 

  return (
    <SiteMenuContainer 
      className={`site-menu ${props.menuState.isOpen ? 'visible' : 'hidden'}`} 
      role='navigation'
    >
      <LinkButton 
        title={`${themeState.dark ? 'light' : 'dark'} theme`} 
        slug={props.slug} 
        onClick={toggleDarkMode} 
        icon={`${themeState.dark ? 'brightness_5' : 'brightness_3'}`}
      />
      <LinkButton title={'about'} slug={'/about/'} onClick={props.toggleMenu} />
      <LinkButton title={'contribute'} slug={'/contribute/'} onClick={props.toggleMenu} />
      <LinkButton title={'github'} slug={'/'} onClick={props.toggleMenu} />
    </SiteMenuContainer>
  )
}

const SiteMenuContainer = styled.nav`
  position: fixed;
  left: 0;
  background-color: ${props => props.theme.background};
  height: 19.2rem;
  width: 32.0rem;
  z-index: 25;
  &.hidden {
    opacity: 0;
    transform: translateX(100vw);
    transition: transform 0.4s ease 0s, opacity 0s linear 0.5s;
  }
  &.visible {
    opacity: 1;
    transform: translateX(calc(100vw - 32rem));
    transition: opacity 0s linear 0s, transform 0.4s ease .01s;
  }
  @media ${device.fullwidth} {
    &.hidden { transform: translateX(80rem); }
    &.visible { transform: translateX(48rem); }
  }
`

export default SiteMenu