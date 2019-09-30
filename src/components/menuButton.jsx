import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import styled from '@emotion/styled'

const Button = (props) => {
  return (
    <StyledButton 
      className={props.className + (props.disabled ? ' disabled' : '')} 
      onClick={props.onClick}
    >
      <div className='flex-container'>
        <div>{props.title}</div>
        <div><i className='material-icons'>{props.icon}</i></div>
      </div>
    </StyledButton>
  )
}

const MenuButton = (props) => {

  switch (props.buttonType) {
    case 'folder':
      return (
        <Button
          className='folder-button'
          onClick={props.onClick}
          title={props.title}
          icon={`${props.icon !== '' ? props.icon : 'expand_more'}`}
          disabled={props.disabled}
        />
      )
    case 'link':
      return (
        <Link to={props.slug}>
          <Button
            className='link-button'
            onClick={props.onClick}
            title={props.title}
            icon={`${props.icon !== '' ? props.icon : 'arrow_right'}`}
            disabled={props.disabled}
          />
        </Link>
      )
    case 'external-link':
      return (
        <a href={props.slug} target="_blank">
          <Button
            className='external-link-button'
            onClick={props.onClick}
            title={props.title}
            icon={`${props.icon !== '' ? props.icon : 'arrow_right'}`}
            disabled={props.disabled}
          />
        </a>
      )
    case 'search-link':
      return (
        <Link to={props.slug}>
          <StyledButton 
            className='search-link-button'
            onClick={props.onClick}
          >
            <div className='flex-container'>
              <div>
                {props.title}
                {props.tags.length > 0 && (
                  <span className='search-tags'>
                    {': ' + props.tags.join(', ')}
                  </span>
                )}
              </div>
              <div><i className='material-icons'>arrow_right</i></div>
            </div>
          </StyledButton>
        </Link>
      )
    default:
      return (
        <Button
          className='default-button'
          onClick={props.onClick}
          title={props.title}
          icon={`${props.icon !== '' ? props.icon : 'flash_on'}`}
          disabled={props.disabled}
        />
      )
  }
}


MenuButton.propTypes = {
  buttonType: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  slug: PropTypes.string,
  tags: PropTypes.array,
  title: PropTypes.string,
}

MenuButton.defaultProps = {
  buttonType: 'default',
  disabled: false,
  icon: '',
  onClick: () => null,
  slug: '/',
  tags: [],
  title: '',
}


// STYLES =============================

const StyledButton = styled.button`
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  border: 0;
  cursor: pointer;
  font-family: 'Roboto-light', sans-serif;
  font-size: 1.6rem;
  height: 4.8rem;
  outline: none;
  padding: 0 1.6rem;
  text-align: left;
  width: 100%;
  &.search-link-button {
    font-size: 1.4rem;
    height: 6.0rem;
    .flex-container {
      height: 6.0rem;
    }
  }
  &.active {
    background-color: ${props => props.theme.text};
    border-color: ${props => props.theme.text};
    color: ${props => props.theme.background};
    .material-icons {
      color: ${props => props.theme.background};
    }
  }
  &.current-page {
    color: ${props => props.theme.highlight};
    &.active {
      color: ${props => props.theme.background};
    }
  }
  &.folder-button {
    font-family: 'Roboto-regular', sans-serif;
  }
  &.disabled {
    color: ${props => props.theme.disabledText};
  }
  .search-tags {
    font-family: 'Roboto-bold', sans-serif;
  }
  .flex-container {
    height: 4.8rem;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
  }
  .material-icons {
    font-size: 2.8rem;
    color: ${props => props.theme.highlight};
    transition: transform 0.4s ease;
    &.flipped {
      transition: transform 0.4s ease;
      transform: rotateZ(-180deg);
    }
  }
`

export default MenuButton
