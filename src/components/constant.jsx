import React from 'react'
import styled from '@emotion/styled'
import { device } from '../styles/device'
const katex = require('katex')


const Constant = props => {

  const exponentString = props.exponent ? `\\times 10^{${props.exponent}}` : ''
  const factorsString = props.factors ? `${props.factors} = ` : ''

  const units = Object.keys(props.units)
  const unitExponents = Object.values(props.units).map(val => val.toString())
  let unitString = ''
  for (let i = 0; i < units.length; i++) {
    unitString += `~\\text{${units[i]}}`
    unitString += unitExponents[i] === '1' ? '' : `^{${unitExponents[i]}}`
  }

  // LaTeX strings to be rendered
  // const quantity = `\\text{${props.name}} ~ ${props.factors}`
  const quantity = props.name
  const definition = `${props.symbol} = ${factorsString} \\text{${props.value}} ${exponentString} ~ ${unitString}`

  // const quantityRef = React.createRef()
  const definitionRef = React.createRef()

  // Render LaTeX after initial mount
  React.useEffect(() => {
    // katex.render(quantity, quantityRef.current, {
    //   displayMode: false,
    //   throwOnError: true,
    // })
    katex.render(definition, definitionRef.current, {
      displayMode: false,
      throwOnError: true,
    })
  }, [])

  return (
    <FlexWrapper>
      {/* <Quantity ref={quantityRef}>{quantity}</Quantity> */}
      <Quantity>{quantity}</Quantity>
      <Definition ref={definitionRef}>{definition}</Definition>
    </FlexWrapper>
  )
}

Constant.defaultProps = {
  name: '',        // rendered as text
  factors: '',     // rendered as equation
  symbol: '',      // rendered as equation
  value: '',       // rendered as text
  exponent: null,  // rendered as equation (\times 10^{exponent})
  units: [],
}

const FlexWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  @media ${device.medium} {
    flex-flow: row nowrap;
  }
  align-items: center;
  justify-content: flex-start;
  padding: 0.4rem 0 0.4rem 0.8rem;
  &:hover {
    background-color: ${props => props.theme.background[1]};
  }
`

const Quantity = styled.div`
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  font-size: 1.3rem;
  margin: 0;
  width: 100%;
  @media ${device.medium} {
    width: 24rem;
  }
`

const Definition = styled.div`
  margin: 0;
  width: 100%;
  @media ${device.medium} {
    width: inherit;
  }
`

export default Constant
