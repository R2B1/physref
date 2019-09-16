import React from 'react'
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming'
import theme from './theme.js'

const defaultContextData = {
  dark: false,
  toggle: () => {}
}

const ColorThemeContext = React.createContext(defaultContextData)
const useColorTheme = () => React.useContext(ColorThemeContext)


const useEffectDarkMode = () => {
  const [themeState, setThemeState] = React.useState({
    dark: true,
    themeIsLoaded: false
  })
  React.useEffect(() => {
    const lsDark = localStorage.getItem('dark') === 'true'
    setThemeState({ ...themeState, dark: lsDark, themeIsLoaded: true })
  }, [])
  return [themeState, setThemeState]
}


const ColorThemeProvider = ({ children }) => {

  const [themeState, setThemeState] = useEffectDarkMode()

  if (!themeState.themeIsLoaded) {
    return <div />
  }

  const toggleTheme = () => {
    const dark = !themeState.dark
    localStorage.setItem('dark', JSON.stringify(dark))
    setThemeState({ ...themeState, dark })
  }

  const computedTheme = themeState.dark ? theme('dark') : theme('light')

  return (
    <ColorThemeContext.Provider
      value={{
        dark: themeState.dark,
        toggle: toggleTheme,
      }}
    >
      <EmotionThemeProvider theme={computedTheme}>
        {children}
      </EmotionThemeProvider>
    </ColorThemeContext.Provider>
  )
}

export { ColorThemeProvider, useColorTheme }