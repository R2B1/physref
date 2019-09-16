import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import ToggleNotesButton from './toggleNotesButton'
import { device } from '../styles/device'
const katex = require('katex')


const Equation = props => {

  const ref = React.createRef()

  // Render equation after initial mount
  React.useEffect(() => {
    katex.render(props.latex, ref.current, {
      displayMode: false,
      throwOnError: true,
    })
  }, [])

  return (
    <EquationContainer 
      className='equation-container' 
      data-equation-number='0'
      data-equation-reference={props.reference}
    >
      <EqnLabel>{props.label}</EqnLabel>
      <Eqn ref={ref} />
      {props.important && <EqnStar><i className='material-icons'>star</i></EqnStar>}
      <EqnNumber className='equation-number'></EqnNumber>
      {props.notes && <ToggleNotesButton />}
    </EquationContainer>
  )
}


Equation.defaultProps = {
  label: '',
  latex: '',
  reference: '',
  notes: false,
  important: false,
}

Equation.propTypes = {
  label: PropTypes.string,
  latex: PropTypes.string.isRequired,
  reference: PropTypes.string,
  notes: PropTypes.bool,
  important: PropTypes.bool,
}

// STYLES =============================

const EquationContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto auto;
  grid-template-areas:
    'eqn-label notes-btn eqn-star'
    'equation equation eqn-number';
  grid-gap: 0.4rem 1.2rem;
  justify-items: start;
  align-items: center;
  padding: 0.8rem 0;
  @media ${device.medium} {
    grid-template-columns: 12rem 3.2rem 1fr auto auto;
    grid-template-rows: auto;
    grid-template-areas: 'eqn-label notes-btn equation eqn-star eqn-number';
    grid-gap: 0 1.6rem;
  }
`

const EqnStar = styled.div`
  grid-area: eqn-star;
  justify-self: end;
  text-align: right;
  .material-icons {
    font-size: 1.2em;
    color: ${props => props.theme.highlight};
  }
`

const EqnNumber = styled.div`
  grid-area: eqn-number;
  justify-self: end;
  text-align: right;
`

const EqnLabel = styled.div`
  grid-area: eqn-label;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.highlight};
  font-family: 'Roboto-regular', sans-serif;
  font-size: 0.75em;
  text-align: left;
`

const Eqn = styled.div`
  grid-area: equation;
`

export default Equation
