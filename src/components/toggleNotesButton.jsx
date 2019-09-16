import React from 'react'
import styled from '@emotion/styled'
import Label from './label'


function toggleNotes(button) {
  let currElement = button
  while (currElement.nextElementSibling === null) {
    currElement = currElement.parentElement
  }
  const notes = currElement.nextElementSibling
  if(notes.classList.contains('notes-wrapper')) {
    if (notes.classList.contains('is-open')) {
      notes.style.maxHeight = '0px'
    } else {
      notes.style.maxHeight = notes.scrollHeight + 'px'
    }
    notes.classList.toggle('is-open')
    const icon = button.querySelector('.material-icons')
    icon.classList.toggle('flipped')
  }
}


const ToggleNotesButton = (props) => {

  const onClick = (e) => {
    e.preventDefault()
    const button = e.target
    toggleNotes(button)
  }

  return (
    <>
      <ButtonStyles className='toggle-notes-button' onClick={onClick}>
        <div className='flex-container'>
          <div className='icon-container'>
            <i className='material-icons'>expand_more</i>
          </div>
          {props.label && <Label>{props.label}</Label>}
        </div>
      </ButtonStyles>
    </>
  )
}


const ButtonStyles = styled.button`
  grid-area: notes-btn;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.highlight};
  font-size: 1em;
  border: 0;
  cursor: pointer;
  outline: none;
  padding: 0;
  &:hover {
    .icon-container {
      background-color: ${props => props.theme.highlight};
      color: ${props => props.theme.background};
    }
    .material-icons {
      color: ${props => props.theme.background};
    }
  }
  .flex-container {
    height: 1.5em;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
  }
  .icon-container {
    border: 0.2rem solid ${props => props.theme.highlight};
    border-radius: 50%;
    height: 1.5em;
    width: 1.5em;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
  }
  .material-icons {
    font-size: 1.5em;
    color: ${props => props.theme.highlight};
    transition: transform 0.4s ease;
    &.flipped {
      transition: transform 0.4s ease;
      transform: rotateZ(-180deg);
    }
  }
`

export default ToggleNotesButton
