import React from 'react'
import PropTypes from 'prop-types'


const EquationRef = props => {
  return (
    <div 
      className='equation-reference'
      data-reference-to={props.reference}
      style={{display:'inline'}}
    />
  )
}


EquationRef.defaultProps = {
  reference: '',
}

EquationRef.propTypes = {
  reference: PropTypes.string,
}


export default EquationRef
