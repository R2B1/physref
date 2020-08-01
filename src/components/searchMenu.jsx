import React from 'react'
import { Link } from 'gatsby'
import { Index } from 'elasticlunr'
import styled from '@emotion/styled'
import { device } from '../styles/device'


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
      <MenuList>
        <div className='input-container'>
          <i className='material-icons'>search</i>
          <input className='search-input' type='text' placeholder='search' value={this.state.query} onChange={this.search} />
        </div>
        {this.state.results.map(page => (
          <li key={page.id}>
            <Link to={page.slug}>
              <MenuLink onClick={this.onSelect}>
                {page.title}
                {page.matchingTags.length > 0 && (
                  <span className='search-tags'>
                    {' — ' + page.matchingTags.join(', ')}
                  </span>
                )}
              </MenuLink>
            </Link>
          </li>
        ))}
      </MenuList>
    )
  }
}


const MenuLink = styled.div`
  background-color: ${props => props.theme.background[0]};
  color: ${props => props.theme.text[0]};
  font-size: 1.3rem;
  font-weight: lighter;
  padding: 1rem 0.8rem 1rem 1.6rem;
  .search-tags {
    font-weight: bold;
  }
  @media ${device.large} {
    &:hover {
      color: ${props => props.theme.text[2]};
    }
  }  
`

const MenuList = styled.ul`
  background-color: ${props => props.theme.primary.base};
  margin: 0;
  padding: 0;
  list-style-type: none;
  width: 32rem;
  a {
    color: ${props => props.theme.primary.base};
    text-decoration: none;
  }
  .input-container {
    display: flex;
    align-items: center;
    border: none;
    height: 4.8rem;
  }
  input {
    background-color: ${props => props.theme.primary.base};
    color: ${props => props.theme.background[0]};
    border: none;
    box-sizing: border-box;
    font-size: 1.6rem;
    margin: 0;
    outline: none;
    padding: 0.8rem 1.2rem;
    width: 100%;
    ::placeholder {
      color: ${props => props.theme.background[0]};
    }
  }
  .material-icons {
    color: ${props => props.theme.background[0]};
    font-size: 2.8rem;
    margin-left: 1.6rem;
  }
`
