import React from 'react'
import styled from '@emotion/styled'
import { LinkButton, FolderButton } from './menuButtons'
import { device } from '../styles/device'


function toggleFolderButton(button) {
  button.classList.toggle('active')
  let icon = button.querySelector('.material-icons')
  icon.classList.toggle('flipped')
}

function collapseSubmenu(submenu) {
  submenu.style.maxHeight = '0px'
  submenu.classList.toggle('is-open')
  toggleFolderButton(submenu.previousElementSibling)
}

function expandSubmenu(submenu) {
  // Open given folder
  let totalScrollHeight = submenu.scrollHeight
  submenu.style.maxHeight = totalScrollHeight + 'px'
  submenu.classList.toggle('is-open')
  toggleFolderButton(submenu.previousElementSibling)
  // Adjust height of parent folders
  let parentMenu = submenu.parentElement
  while (parentMenu.classList.contains('submenu')) {
    totalScrollHeight += parentMenu.scrollHeight
    parentMenu.style.maxHeight = totalScrollHeight + 'px'
    // Open parent folders too if not already open
    if (!parentMenu.classList.contains('is-open')) {
      parentMenu.classList.toggle('is-open')
      toggleFolderButton(parentMenu.previousElementSibling)
    }
    parentMenu = parentMenu.parentElement
  }
}


const FolderButtonContainer = (props) => {

  const onFolderClick = (e) => {
    e.preventDefault()
    const button = e.target
    let submenu = button.nextElementSibling
    if (submenu.classList.contains('is-open')) {
      collapseSubmenu(submenu)
    } else {
      const otherOpenSubmenu = Array.from(button.parentElement.children).filter(e => e.matches('.is-open'))
      if (otherOpenSubmenu.length > 0) { collapseSubmenu(otherOpenSubmenu[0]) }
      expandSubmenu(submenu)
    }
  }
  return <FolderButton title={props.title} onClick={onFolderClick} />
}


const NavMenuUI = (props) => {

  const renderSubmenu = (children) => {
    if (children && children.length > 0) {
      return (
        <SubmenuWrapper className='submenu' style={{maxHeight: 0 + 'px'}}>
          {renderMenuButtons(children)}
        </SubmenuWrapper>
      )
    }
  }

  const renderMenuButtons = (tree) => tree.map((node) => {
    const {title, slug, tags, children} = node
    let button
    if (slug === '') {
      button = <FolderButtonContainer title={title} />
    } else {
      let isDisabled
      if (tags !== null && tags.includes('placeholder')) {
        isDisabled = true
      } else {
        isDisabled = false
      }
      button = <LinkButton title={title} slug={slug} disabled={isDisabled} onClick={props.toggleMenu} />
    }
    
    return (
      <React.Fragment key={title}>
        {button}
        {renderSubmenu(children)}
      </React.Fragment>
    )
  })

  // Open nav menu to current page on mount only ([] 2nd arg)
  React.useEffect(() => {
    const navElement = document.querySelector('.nav-menu')
    const currLinkElement = navElement.querySelector('a[aria-current]')
    if (currLinkElement) {
      const submenu = currLinkElement.parentElement
      expandSubmenu(submenu)
    }
  }, [])

  // Highlight current page buttons after each route change
  React.useEffect(() => {
    // Remove all previous highlighting
    const navElement = document.querySelector('.nav-menu')
    const prevLinkButtons = navElement.querySelectorAll('.current-page')
    prevLinkButtons.forEach((button) => {
      button.classList.toggle('current-page')
    })
    // Highlight current page link and folder buttons
    const currLinkElement = navElement.querySelector('a[aria-current]')
    if (currLinkElement) {
      const currLinkButton = currLinkElement.firstElementChild
      currLinkButton.classList.toggle('current-page')
      let parentMenu = currLinkElement.parentElement
      while (parentMenu.classList.contains('submenu')) {
        let button = parentMenu.previousElementSibling
        button.classList.toggle('current-page')
        parentMenu = parentMenu.parentElement
      }
    }
    
  })

  // Hack to reset 'is-open' and 'active' classes on buttons that get wiped out on color theme change
  React.useEffect(() => {
    const navElement = document.querySelector('.nav-menu')
    const submenuNodeList = navElement.querySelectorAll('.submenu')
    Array.from(submenuNodeList).forEach((submenu) => {
      if (submenu.style.maxHeight !== '0px') {
        if (!submenu.classList.contains('is-open')) {
          submenu.classList.toggle('is-open')
        }
        const button = submenu.previousElementSibling
        if(!button.classList.contains('active')) {
          button.classList.toggle('active')
        }
      }
    })
  })

  return (
    <NavMenuContainer 
      className={`nav-menu ${props.menuState.isOpen ? 'visible' : 'hidden'}`} 
      role='navigation'
    >
      {renderMenuButtons(props.tree)}
    </NavMenuContainer>
  )  
}

const NavMenuContainer = styled.nav`
  position: fixed;
  left: 0;
  background-color: ${props => props.theme.background};
  height: 100%;
  width: 32rem;
  overflow: scroll;
  z-index: 20;
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

const SubmenuWrapper = styled.div`
  border: 0;
  border-left: 1.6rem solid ${props => props.theme.text};
  max-height: 0;
  margin: 0;
  overflow: hidden;
  padding: 0;
  transition: max-height 0.4s ease;
`

export default NavMenuUI
