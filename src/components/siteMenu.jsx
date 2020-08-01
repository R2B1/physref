import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import ThemeToggle from './themeToggle'
import { device } from '../styles/device'


const SiteMenu = (props) => {
  return (
    <MenuList>
      <li key='theme-toggle'>
        <ToggleContainer>
          <ThemeToggle />
        </ToggleContainer>
      </li>
      <li key='github'>
        <a href="https://github.com/R2B1/physref" target="_blank">
          <MenuLink>
            GitHub
            <i className='material-icons'>open_in_new</i>
          </MenuLink>
        </a>
      </li>
      <li key='contribute'>
        <Link to={'/contribute/'} onClick={props.toggleMenu}>
          <MenuLink>
            Contribute
          </MenuLink>
        </Link>
      </li>
      <li key='about'>
        <Link to={'/about/'} onClick={props.toggleMenu}>
          <MenuLink>
            About
          </MenuLink>
        </Link>
      </li>
    </MenuList>
  )
}

const MenuList = styled.ul`
  background-color: ${props => props.theme.primary.base};
  margin: 0;
  padding: 0.8rem;
  list-style-type: none;
  width: 15rem;
`

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 4.8rem;
  padding: 0 0.8rem 0 0.8rem;
`

const MenuLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: ${props => props.theme.background[0]};
  font-size: 1.8rem;
  font-weight: bold;
  height: 4.8rem;
  padding: 0 0.8rem 0 0.8rem;
  transition: all 0.2s ease;
  .material-icons {
    font-size: 1.8rem;
    padding: 0 0 0 0.4rem;
  }
  @media ${device.large} {
    &:hover {
      background-color: ${props => props.theme.primary.light};
    }
  }  
`

export default SiteMenu