const themeLight = {
  primary: {
    lightest: '#4ad6dd',
    lighter: '#37d2d9',
    light: '#28cad2',
    base: '#24b8bf',
    dark: '#20a6ac',
    darker: '#1d9399',
    darkest: '#198186',
  },
  text: ['#000000', '#4d4d4d', '#999999'],  // lighter --->
  background:  ['#f7f7f7', '#ededed', '#e3e3e3'],  // darker --->
}

const themeDark = {
  primary: {
    lightest: '#c7f7fe',
    lighter: '#a5f2fd',
    light: '#83eefc',
    base: '#61e9fb',
    dark: '#3fe4fa',
    darker: '#1de0f9',
    darkest: '#06d3ee',
  },
  text: ['#f7f7f7', '#dedede', '#c4c4c4'],  // darker --->
  background: ['#20232a', '#303540', '#3a414f'],  // lighter --->
}

const theme = mode => (mode === 'dark' ? themeDark : themeLight)

export default theme
