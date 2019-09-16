import React from 'react'
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

const LinkButton = (props) => {
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
}

const FolderButton = (props) => {
  return (
    <Button
      className='folder-button'
      onClick={props.onClick}
      title={props.title}
      icon={'expand_more'}
      disabled={false}
    />
  )
}

const StyledButton = styled.button`
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  border: 0;
  cursor: pointer;
  font-family: 'Roboto-regular', sans-serif;
  font-size: 1.6rem;
  height: 4.8rem;
  outline: none;
  padding: 0 1.6rem;
  text-align: left;
  width: 100%;
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
  &.link-button {
    font-family: 'Roboto-light', sans-serif;
  }
  &.disabled {
    color: ${props => props.theme.disabledText};
  }
  .flex-container {
    height: 4.8rem;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
  }
  .material-icons {
    font-size: 3.2rem;
    color: ${props => props.theme.highlight};
    transition: transform 0.4s ease;
    &.flipped {
      transition: transform 0.4s ease;
      transform: rotateZ(-180deg);
    }
  }
`

LinkButton.defaultProps = {
  icon: '',
}

export { LinkButton, FolderButton }
