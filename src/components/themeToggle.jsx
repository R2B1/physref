import React from 'react'
import styled from '@emotion/styled'
import Toggle from 'react-toggle'
import { useColorTheme } from '../context/ColorTheme'

const ThemeToggle = (props) => {

  const themeState = useColorTheme()

  return (
    <ToggleStyles>
      <Toggle
        aria-label="Dark mode toggle in site navigation menu"
        defaultChecked={!themeState.dark}
        icons={{
          checked: <i className='material-icons'>brightness_7</i>,
          unchecked: <i className='material-icons'>brightness_3</i>,
        }}
        onChange={themeState.toggle} 
      />
    </ToggleStyles>
  )
}

const ToggleStyles = styled.div`
  .react-toggle {
    touch-action: pan-x;

    display: inline-block;
    position: relative;
    cursor: pointer;
    background-color: transparent;
    border: 0;
    padding: 0;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-tap-highlight-color: transparent;
  }

  .react-toggle-screenreader-only {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  .react-toggle--disabled {
    cursor: not-allowed;
    opacity: 0.5;
    -webkit-transition: opacity 0.25s;
    transition: opacity 0.25s;
  }

  .react-toggle-track {
    width: 64px;
    height: 28px;
    padding: 0;
    border-radius: 30px;
    background-color: ${props => props.theme.background[0]};
    -webkit-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }

  .react-toggle:hover:not(.react-toggle--disabled) .react-toggle-track {
    /* background-color: #000000; */
  }

  .react-toggle--checked .react-toggle-track {
    /* background-color: ${props => props.theme.background[0]}; */
  }

  .react-toggle--checked:hover:not(.react-toggle--disabled) .react-toggle-track {
    /* background-color: #128D15; */
  }

  .react-toggle-track-check {
    position: absolute;
    width: 14px;
    height: 10px;
    top: 0px;
    bottom: 0px;
    margin-top: auto;
    margin-bottom: auto;
    line-height: 0;
    left: 8px;
    opacity: 0;
    -webkit-transition: opacity 0.25s ease;
    -moz-transition: opacity 0.25s ease;
    transition: opacity 0.25s ease;
  }

  .react-toggle--checked .react-toggle-track-check {
    opacity: 1;
    -webkit-transition: opacity 0.25s ease;
    -moz-transition: opacity 0.25s ease;
    transition: opacity 0.25s ease;
  }

  .react-toggle-track-x {
    position: absolute;
    width: 10px;
    height: 10px;
    top: 0px;
    bottom: 0px;
    margin-top: auto;
    margin-bottom: auto;
    line-height: 0;
    right: 16px;
    opacity: 1;
    -webkit-transition: opacity 0.25s ease;
    -moz-transition: opacity 0.25s ease;
    transition: opacity 0.25s ease;
  }

  .react-toggle--checked .react-toggle-track-x {
    opacity: 0;
  }

  .react-toggle-thumb {
    /* transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0ms; */
    position: absolute;
    top: 2px;
    left: 2px;
    width: 24px;
    height: 24px;
    /* border: 1px solid #4D4D4D; */
    border: 0;
    border-radius: 50%;
    background-color: ${props => props.theme.primary.base};

    /* -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box; */
    box-sizing: border-box;

    /* -webkit-transition: all 0.25s ease;
    -moz-transition: all 0.25s ease; */
    /* transition: all 0.25s ease; */
  }

  .react-toggle--checked .react-toggle-thumb {
    left: 38px;
  }

  .react-toggle--focus .react-toggle-thumb {
    box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 8px;
    background-color: ${props => props.theme.primary.lightest};
  }

  .react-toggle:active:not(.react-toggle--disabled) .react-toggle-thumb {
    box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 8px;
  }
  &:hover {
    .react-toggle-thumb {
      background-color: ${props => props.theme.primary.lightest};
    }
    /* .material-icons {
      color: ${props => props.theme.primary[1]};
    } */
  }
  .material-icons {
    color: ${props => props.theme.primary.darkest};
    font-size: 24px;
    line-height: 0;
    padding: 5px 0 0 0;
  }
`

export default ThemeToggle
