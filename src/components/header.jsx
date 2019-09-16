import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import styled from '@emotion/styled'
import SearchMenu from './searchMenu'
import NavMenu from '../components/navMenu'
import SiteMenu from '../components/siteMenu'


const Header = (props) => {

  const queryData = useStaticQuery(SEARCH_INDEX_QUERY)

  const [searchStateMenu, setSearchMenuState] = React.useState({ isOpen: false })
  const [navMenuState, setNavMenuState] = React.useState({ isOpen: false })
  const [siteMenuState, setSiteMenuState] = React.useState({ isOpen: false })

  const toggleSearchMenu = () => {
    if (searchStateMenu.isOpen) {
      setSearchMenuState({ isOpen: false })
      closeModal()
      // return focus to...
    } else {
      document.querySelector('.search-input').focus()
      setSearchMenuState({ isOpen: true })
      setNavMenuState({ isOpen: false })
      setSiteMenuState({ isOpen: false })
      openModal()
    }
  }

  const toggleNavMenu = () => {
    if (navMenuState.isOpen) {
      setNavMenuState({ isOpen: false })
      closeModal()
    } else {
      setNavMenuState({ isOpen: true })
      setSearchMenuState({ isOpen: false })
      setSiteMenuState({ isOpen: false })
      openModal()
    }
  }

  const toggleSiteMenu = () => {
    if (siteMenuState.isOpen) {
      setSiteMenuState({ isOpen: false })
      closeModal()
    } else {
      setSiteMenuState({ isOpen: true })
      setNavMenuState({ isOpen: false })
      setSearchMenuState({ isOpen: false })
      openModal()
    }
  }

  const closeAllMenus = () => {
    setSearchMenuState({ isOpen: false })
    setNavMenuState({ isOpen: false })
    setSiteMenuState({ isOpen: false })
    closeModal()
  }

  const openModal = () => {
    const modal = document.querySelector('.modal')
    if (!modal.classList.contains('is-open'))
    {
      modal.classList.toggle('is-open')
    }
  }

  const closeModal = () => {
    const modal = document.querySelector('.modal')
    if (modal.classList.contains('is-open'))
    {
      modal.classList.toggle('is-open')
    }
  }

  return (
    <>
      <Headband>
        <div className='flex-container'>
          <div className='header__title' tabindex='10'>
            <Link to='/'>
              physref<DotCom>.com</DotCom>
            </Link>
          </div>
          <div className='icons-container'>
            <div>
              <i
                className={`material-icons ${searchStateMenu.isOpen ? 'open' : ''}`}
                onClick={toggleSearchMenu}
                tabindex='20'
              >search</i>
            </div>
            <div>
              <i
                className={`material-icons ${navMenuState.isOpen ? 'open' : ''}`}
                onClick={toggleNavMenu}
                tabindex='30'
              >menu</i>
            </div>
            <div>
              <i
                className={`material-icons ${siteMenuState.isOpen ? 'open' : ''}`}
                onClick={toggleSiteMenu}
                tabindex='40'
              >more_horiz</i>
            </div>
          </div>
        </div>
      </Headband>
      <SearchMenu 
        searchIndex={queryData.siteSearchIndex.index}
        menuState={searchStateMenu}
        toggleMenu={toggleSearchMenu}
      />
      <NavMenu 
        menuState={navMenuState}
        toggleMenu={toggleNavMenu}
      />
      <SiteMenu 
        menuState={siteMenuState}
        toggleMenu={toggleSiteMenu}
        slug={props.slug}
      />
      <MenuCover />
      <ModalShadow className='modal' onClick={closeAllMenus} />
    </>
  )
}

const SEARCH_INDEX_QUERY = graphql`
  query SearchIndexQuery {
    siteSearchIndex {
      index
    }
  }
`

// This covers the closed menus on large screens
const MenuCover = styled.div`
  background-color: ${props => props.theme.background};
  position: fixed;
  left: 80rem;
  top: 0;
  width: 999rem;
  min-height: 100vh;
  z-index: 50;
`

const ModalShadow = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: ${props => props.theme.background};
  background-color: ${props => props.theme.text};
  opacity: 0;
  transform: translateY(-9999px);
  transition: opacity .4s ease 0s, transform 0s linear .4s;
  &.is-open {
    opacity: 0.6;
    transform: translateY(0px);
    transition: transform 0s linear 0s, opacity .4s ease .01s;
  }
`

const Headband = styled.header`
  background-color: ${props => props.theme.background};
  padding: 0 1.6rem;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 40;
  .flex-container {
    height: 3em;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
  }
  .header__title {
    align-items: center;
    display: flex;
    font-family: 'Roboto-bold', sans-serif;
    font-size: 1.6em;
    a {
      color: ${props => props.theme.highlight};
      text-decoration: none;
    }
  }
  .icons-container {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
  }
  .material-icons {
    color: ${props => props.theme.highlight};
    cursor: pointer;
    font-size: 2.8rem;
    margin: 0 0.4rem;
    &.open {
      background-color: ${props => props.theme.highlight};
      color: ${props => props.theme.background};
    }
  }
`

const DotCom = styled.span`
  color: ${props => props.theme.text};
  font-family: 'Roboto-light', sans-serif;
  font-size: 1.6rem;
`

export default Header
