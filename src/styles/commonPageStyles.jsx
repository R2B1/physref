import styled from '@emotion/styled'


const CommonPageStyles = styled.div`
  background-color: ${props => props.theme.background[0]};
  font-weight: normal;
  margin: 1em;
  padding: 0;
  .katex {
    color: ${props => props.theme.text[0]};
    font-size: 1em;
  }
  .notes-wrapper {
    overflow: hidden;
    border-left: 0.2rem solid ${props => props.theme.primary.base};
    padding-left: 1em;
  }
  a {
    color: ${props => props.theme.primary.base};
    font-size: 1em;
    text-decoration: none;
    &.section-anchor {
      display: block;
      position: relative;
      top: -6.0rem;
      visibility: hidden;
    }
    &:hover {
      color: ${props => props.theme.primary.lighter};
      text-decoration: underline;
    }
  }
  p {
    font-size: 1.6rem;
    margin: 1em 0;
    padding: 0;
  }
  h1 {
    font-size: 2.0em;
    margin: 0;
    padding: 1em 0;
  }
  h2 {
    font-size: 1.5em;
    margin: 2em 0 1em 0;
    padding: 0;
  }
  h3 {
    font-size: 1.2em;
    margin: 0;
    padding: 1.6em 0 0.5em 0;
  }
  h4 {
    font-size: 1em;
    margin: 0;
    padding: 1em 0 0.5em 0;
  }
  hr {
    background: ${props => props.theme.background[1]};
    border: 0;
    height: 1px;
    margin: 2em 0;
  }
  ol {
    font-size: 1.6rem;
    margin: 1em 0;
    padding: 0 0 0 1.5em;
    li {
      margin: 0.25em 0;
      padding: 0;
    }
    &.notes-list {
      list-style-type: none;
      margin: 0.75em 0;
      padding: 0;
      li {
        margin: 0.5em 0;
      }
    }
  }
  ul {
    list-style-type: disc;
    margin: 1em 0;
    padding: 0 0 0 1.5em;
    li {
      margin: 0.25em 0;
      padding: 0;
    }
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    border-radius: 0.8rem;
  }
  pre code {
    background-color: ${props => props.theme.text[1]};
    color: ${props => props.theme.background[0]};
    display: block;
    font-size: 0.75em;
    padding: 1em;
    white-space: pre-wrap;
  }
  table {
    display: block;
    margin: 0.5em 0;
    th {
      padding-right: 0.5em;
    }
    td {
      padding-right: 0.5em;
    }
  }
`

export default CommonPageStyles
