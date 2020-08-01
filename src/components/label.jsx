import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'


const Label = props => {
  return (
    <LabelStyles>
      {props.children}
    </LabelStyles>
  )
}


Label.defaultProps = {
  children: '',
}

Label.propTypes = {
  children: PropTypes.string,
}


const LabelStyles = styled.div`
  display: inline-block;
  background-color: ${props => props.theme.background[0]};
  color: ${props => props.theme.text[0]};
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  font-size: 0.75em;
  padding: 0 0.5em;
  text-align: left;
`

export default Label
