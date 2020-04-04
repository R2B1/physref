import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import styled from '@emotion/styled'
import SearchMenu from './searchMenu'
import NavMenu from '../components/navMenu'
import SiteMenu from '../components/siteMenu'
import { device } from '../styles/device'


const Header = (props) => {

  const queryData = useStaticQuery(SEARCH_INDEX_QUERY)

  const [searchStateMenu, setSearchMenuState] = React.useState({ isOpen: false })
  const [navMenuState, setNavMenuState] = React.useState({ isOpen: false })
  const [siteMenuState, setSiteMenuState] = React.useState({ isOpen: false })

  const toggleSearchMenu = () => {
    if (searchStateMenu.isOpen) {
      closeMenus()
      closeModal()
    } else {
      closeMenus()
      document.querySelector('.search-input').focus()
      setSearchMenuState({ isOpen: true })
      openModal()
    }
  }

  const toggleNavMenu = () => {
    if (navMenuState.isOpen) {
      closeMenus()
      closeModal()
    } else {
      closeMenus()
      document.querySelector('.nav-menu').focus()
      setNavMenuState({ isOpen: true })
      openModal()
    }
  }

  const toggleSiteMenu = () => {
    if (siteMenuState.isOpen) {
      closeMenus()
      closeModal()
    } else {
      closeMenus()
      document.querySelector('.site-menu').focus()
      setSiteMenuState({ isOpen: true })
      openModal()
    }
  }

  const closeMenus = () => {
    if (searchStateMenu.isOpen) {
      setSearchMenuState({ isOpen: false })
    }
    if (navMenuState.isOpen) {
      setNavMenuState({ isOpen: false })
    }
    if (siteMenuState.isOpen) {
      setSiteMenuState({ isOpen: false })
    }
  }

  const closeModalAndMenus = () => {
    closeMenus()
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
          <div className='header__title'>
            <Link to='/' tabIndex='0'>
              physref
            </Link>
          </div>
          <div className='icons-container'>
            <div>
              <i
                className={`material-icons ${searchStateMenu.isOpen ? 'open' : ''}`}
                onClick={toggleSearchMenu}
                tabIndex='0'
              >search</i>
            </div>
            <div>
              <i
                className={`material-icons ${navMenuState.isOpen ? 'open' : ''}`}
                onClick={toggleNavMenu}
                tabIndex='0'
              >menu</i>
            </div>
            <div>
              <i
                className={`material-icons ${siteMenuState.isOpen ? 'open' : ''}`}
                onClick={toggleSiteMenu}
                tabIndex='0'
              >more_horiz</i>
            </div>
          </div>
        </div>
      </Headband>
      <MenuContainer>
        <SearchMenu 
          searchIndex={queryData.siteSearchIndex.index}
          menuState={searchStateMenu}
          toggleMenu={toggleSearchMenu}
        />
      </MenuContainer>
      <MenuContainer>
        <NavMenu 
          menuState={navMenuState}
          toggleMenu={toggleNavMenu}
        />
      </MenuContainer>
      <MenuContainer>
        <SiteMenu 
          menuState={siteMenuState}
          toggleMenu={toggleSiteMenu}
          slug={props.slug}
        />
      </MenuContainer>
      <ModalShadow className='modal' onClick={closeModalAndMenus} />
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
const MenuContainer = styled.div`
  position: sticky;
  top: 4.8rem;
  @media ${device.large} { top: 6rem; }
  z-index: 15;
`
const Headband = styled.header`
  background-color: ${props => props.theme.background};
  padding: 0 1.6rem;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 40;
  .flex-container {
    height: 4.8rem;
    @media ${device.large} { height: 6rem; }
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
    font-size: 3.2rem;
    margin: 0 0.6rem;
    &.open {
      background-color: ${props => props.theme.highlight};
      color: ${props => props.theme.background};
    }
  }
`

export default Header
