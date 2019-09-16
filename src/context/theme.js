const themeLight = {
  background: '#ffffff',    // white
  text: '#22180e',          // very dark brown, rgb(34,24,14)
  highlight: '#ff705c',     // coral, rgb(255,112,92)
  disabledText: '#d1d1d1',  // light grey
}

const themeDark = {
  background: '#212729',    // very dark sky blue
  text: '#ffffff',          // white
  highlight: '#4BE2C7',     // aquamarine
  disabledText: '#3a464a',  // dark sky blue
}

const theme = mode => (mode === 'dark' ? themeDark : themeLight)

export default theme
