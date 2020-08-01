import React from 'react'
import PropTypes from 'prop-types'


const Section = props => {

  const title = props.children
  const linkName = title.replace(/ /g, '-')

  return (
    <>
      {/* <hr/> */}
      <a className='section-anchor' name={linkName}></a>
      <h2>{title}</h2>
    </>
  )
}


Section.defaultProps = {
  children: '',
}

Section.propTypes = {
  children: PropTypes.string,
}


export default Section
