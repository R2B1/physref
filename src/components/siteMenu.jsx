import React from 'react'
import styled from '@emotion/styled'
import { useColorTheme } from '../context/ColorTheme'
import MenuButton from './menuButton'
import { device } from '../styles/device'


const SiteMenu = (props) => {

  const themeState = useColorTheme()

  const toggleDarkMode = () => {
    themeState.toggle()
    props.toggleMenu()
  } 

  return (
    <SiteMenuContainer 
      className={`site-menu ${props.menuState.isOpen ? 'visible' : 'hidden'}`} 
      role='navigation'
    >
      <MenuButton 
        buttonType='link' 
        title={`${themeState.dark ? 'light' : 'dark'} theme`} 
        slug={props.slug} 
        onClick={toggleDarkMode} 
        icon={`${themeState.dark ? 'brightness_5' : 'brightness_3'}`}
      />
      <MenuButton 
        buttonType='link' 
        title={'about'} 
        slug={'/about/'} 
        onClick={props.toggleMenu} 
      />
      <MenuButton 
        buttonType='link' 
        title={'contribute'} 
        slug={'/contribute/'} 
        onClick={props.toggleMenu} 
      />
      <MenuButton 
        buttonType='external-link' 
        title={'github'} 
        slug={'https://github.com/R2B1/physref'} 
      />
    </SiteMenuContainer>
  )
}

const SiteMenuContainer = styled.nav`
  position: absolute;
  left: -18rem;
  background-color: ${props => props.theme.background};
  height: 19.2rem;
  width: 18rem;
  z-index: 25;
  &.hidden {
    opacity: 0;
    transform: translateX(0);
    transition: transform 0.4s ease 0s, opacity 0s linear 0.5s;
  }
  &.visible {
    opacity: 1;
    transform: translateX(100vw);
    @media ${device.fullwidth} { transform: translateX(80rem); }
    
    transition: opacity 0s linear 0s, transform 0.4s ease .01s;
  }
`

export default SiteMenu