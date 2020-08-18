import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import styled from '@emotion/styled'
import clsx from 'clsx'
import SearchMenu from './searchMenu'
import SiteMenu from './siteMenu'
import { device } from '../styles/device'


const SEARCH_INDEX_QUERY = graphql`
  query SearchIndexQuery {
    siteSearchIndex {
      index
    }
  }
`

const Header = (props) => {
  const queryData = useStaticQuery(SEARCH_INDEX_QUERY)

  const [showSearchMenu, setShowSearchMenu] = React.useState(false)
  const [showSiteMenu, setShowSiteMenu] = React.useState(false)
  const [showModal, setShowModal] = React.useState(false)

  const toggleMenu = (isOpen, menuType) => {
    if (isOpen) {
      closeModalAndMenus()
    } else {
      switch (menuType) {
        case 'search':
          setShowSearchMenu(true)
          setShowSiteMenu(false)
          document.querySelector('.search-input').focus()
          break
        case 'site':
        default:
          setShowSiteMenu(true)
          setShowSearchMenu(false)
      }
      setShowModal(true)
    }
  }

  const closeModalAndMenus = () => {
    setShowSearchMenu(false)
    setShowSiteMenu(false)
    setShowModal(false)
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
          <div className='menu-buttons'>
            <MenuButton
              className={clsx({'open' : showSearchMenu})}
              onClick={() => toggleMenu(showSearchMenu, 'search')}
            >
              <i className='material-icons'>search</i>
            </MenuButton>            
            <MenuButton
              className={clsx({'open' : showSiteMenu})}
              onClick={() => toggleMenu(showSiteMenu, 'site')}
            >
              <i className='material-icons'>menu</i>
            </MenuButton>
          </div>
        </div>
      </Headband>
      <MenuContainer
        className={clsx('search-menu', {'show' : showSearchMenu})}
      >
        <SearchMenu 
          searchIndex={queryData.siteSearchIndex.index}
          toggleMenu={() => toggleMenu(showSearchMenu, 'search')}
        />
      </MenuContainer>
      <MenuContainer
        className={clsx('site-menu', {'show' : showSiteMenu})}
      >
        <SiteMenu 
          toggleMenu={() => toggleMenu(showSiteMenu, 'site')}
          slug={props.slug}
        />
      </MenuContainer>
      <ModalShadow
        className={clsx('modal', {'show' : showModal})}
        onClick={closeModalAndMenus} 
      />
    </>
  )
}



const Headband = styled.header`
  background-color: ${props => props.theme.background[0]};
  padding: 0 0 0 1.6rem;
  position: relative;
  width: 100%;
  z-index: 50;
  .flex-container {
    height: 6rem;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
  }
  .header__title {
    align-items: center;
    display: flex;
    font-size: 2.4em;
    font-weight: bold;
    a {
      color: ${props => props.theme.primary.base};
      text-decoration: none;
    }
  }
  .menu-buttons {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
  }
`

const MenuButton = styled.button`
  background-color: ${props => props.theme.background[0]};
  border: 0;
  padding: 0;
  cursor: pointer;
  outline: none;
  height: 6rem;
  width: 6rem;
  @media ${device.large} {
    &:hover {
      background-color: ${props => props.theme.background[1]};
    }
  }
  .material-icons {
    color: ${props => props.theme.primary.base};
    cursor: pointer;
    font-size: 3.2rem;
    margin: 0;
  }
  &.open {
    background-color: ${props => props.theme.primary.base};
    .material-icons {
      color: ${props => props.theme.background[0]};
      cursor: pointer;
    }
    &:focus {
      background-color: ${props => props.theme.primary.base};
    }
  }
  &:focus {
    background-color: ${props => props.theme.background[1]};
  }

`

const MenuContainer = styled.nav`
  display: none;
  position: absolute;
  top: 6rem;
  right: 0;
  background-color: ${props => props.theme.background[0]};
  box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 20px;
  z-index: 45;
  &.show {
    display: block;
  }
`

const ModalShadow = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  background-color: ${props => props.theme.background[0]};
  background-color: ${props => props.theme.text[0]};
  opacity: 0;
  transform: translateY(-9999px);
  transition: transform 0s linear .2s, opacity .2s ease 0s;
  &.show {
    opacity: 0.3;
    transform: translateY(0px);
    transition: transform 0s, opacity .2s ease .01s;
  }
`

export default Header
