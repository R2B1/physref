import React from 'react'
import { ColorThemeProvider } from './src/context/ColorTheme'

export const wrapRootElement = ({ element }) => (
  <ColorThemeProvider>{element}</ColorThemeProvider>
)
