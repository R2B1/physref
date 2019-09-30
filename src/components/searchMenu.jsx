import React from 'react'
import { Link } from 'gatsby'
import { Index } from 'elasticlunr'
import styled from '@emotion/styled'
import { device } from '../styles/device'


const SearchButton = (props) => {
  return (
    <Link to={props.slug}>
      <StyledButton 
        className='search-button'
        onClick={props.onClick}
      >
        <div className='flex-container'>
          <div>
            {props.title}
            {props.tags.length > 0 && (
              <span className='search-tags'>
                {': ' + props.tags.join(', ')}
              </span>
            )}
          </div>
          <div><i className='material-icons'>arrow_right</i></div>
        </div>
      </StyledButton>
    </Link>
  )
}


export default class SearchMenu extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
    }
  }

  onSelect = (e) => {
    this.setState({
      query: ``,
      results: [],
    })
    this.props.toggleMenu()
  }

  getOrCreateIndex = () => this.index ? this.index : Index.load(this.props.searchIndex)

  search = (e) => {
    const query = e.target.value
    this.index = this.getOrCreateIndex()
    const results = this.index
      .search(query, { expand: true })
      .map(({ ref }) => this.index.documentStore.getDoc(ref))

    results.forEach(result => {
      let matchingTags = []
      result.tags.forEach(tag => {
        let isMatch = false
        const words = tag.toLowerCase().split(' ')
        words.forEach(word => {
          if(word.startsWith(query.toLowerCase())) {
            isMatch = true
          }
        })
        if(isMatch) {
          matchingTags.push(tag)
        }
      })
      result.matchingTags = matchingTags
    })

    this.setState({
      query,
      results
    })
  }

  render() {
    return (
      <SearchMenuContainer className={`search-container ${this.props.menuState.isOpen ? 'visible' : 'hidden'}`}>
        <div className='input-container'>
          <i className='material-icons'>search</i>
          <input className='search-input' type='text' placeholder='search' value={this.state.query} onChange={this.search} />
        </div>
        {this.state.results.map(page => (
          <li key={page.id}>
            <SearchButton 
              title={page.title}
              tags={page.matchingTags}
              slug={page.slug} 
              onClick={this.onSelect} 
            />
          </li>
        ))}
      </SearchMenuContainer>
    )
  }
}


// STYLES =============================

const StyledButton = styled.button`
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  border: 0;
  cursor: pointer;
  font-family: 'Roboto-light', sans-serif;
  font-size: 1.4rem;
  outline: none;
  padding: 0 1.6rem;
  text-align: left;
  width: 100%;
  &:hover {
    background-color: ${props => props.theme.text};
    border-color: ${props => props.theme.text};
    color: ${props => props.theme.background};
    .material-icons {
      color: ${props => props.theme.background};
    }
  }
  .flex-container {
    height: 6rem;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
  }
  .material-icons {
    font-size: 3.2rem;
    color: ${props => props.theme.highlight};
  }
  .search-tags {
    font-family: 'Roboto-bold', sans-serif;
  }
`

const SearchMenuContainer = styled.ul`
  position: fixed;
  left: 0;
  width: 32.0rem;
  z-index: 30;
  /* overflow: scroll; */
  background-color: ${props => props.theme.background};
  font-family: 'Roboto-light', sans-serif;
  font-size: 1.6rem;
  list-style-type: none;
  margin: 0;
  padding: 0;
  &.hidden {
    opacity: 0;
    transform: translateX(100vw);
    transition: transform 0.4s ease 0s, opacity 0s linear 0.5s;
  }
  &.visible {
    opacity: 1;
    transform: translateX(calc(100vw - 32rem));
    transition: opacity 0s linear 0s, transform 0.4s ease .01s;
  }
  @media ${device.fullwidth} {
    &.hidden { transform: translateX(80rem); }
    &.visible { transform: translateX(48rem); }
  }
  a {
    color: ${props => props.theme.highlight};
    text-decoration: none;
  }
  li {
    height: 6rem;
    padding: 0;
  }
  .input-container {
    display: flex;
    align-items: center;
    border: none;
    border-bottom: solid 1px ${props => props.theme.highlight};
    height: 4.8rem;
  }
  input {
    background-color: ${props => props.theme.background};
    border: none;
    box-sizing: border-box;
    color: ${props => props.theme.highlight};
    font-family: 'Roboto-light', sans-serif;
    font-size: 1.6rem;
    margin: 0;
    outline: none;
    padding: 0.8rem 1.2rem;
    width: 100%;
    ::placeholder {
      color: ${props => props.theme.text};
    }
  }
  .material-icons {
    color: ${props => props.theme.highlight};
    font-size: 2.8rem;
    margin-left: 1.6rem;
  }
`
