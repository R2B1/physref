import React from 'react'
import SEO from '../components/seo'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import styled from '@emotion/styled'
import 'katex/dist/katex.min.css'
import CommonPageStyles from '../styles/commonPageStyles'


export default function CommonPage(props) {
  const mdx = props.data.mdx

  // Hide notes after initial mount
  React.useEffect(() => {
    const notesNodeList = document.querySelectorAll('.toggle-notes-button')
    Array.from(notesNodeList).forEach((button) => {
      // Find the element below the button, which is designated as the notes
      let currElement = button
      while (currElement.nextElementSibling === null) {
        currElement = currElement.parentElement
      }
      const notes = currElement.nextElementSibling
      if (notes.nodeName === 'OL') {
        notes.classList.add('notes-list')
      }
      // Wrap notes in a hideable div
      const wrapper = document.createElement('div')
      notes.parentNode.insertBefore(wrapper, notes)
      wrapper.appendChild(notes)
      wrapper.classList.add('notes-wrapper')
      wrapper.style.maxHeight = '0px'
    })
  }, [])


  // Add equation numbers after initial mount
  React.useEffect(() => {
    const eqnNodeList = document.querySelectorAll('.equation-container')
    let number = 0
    Array.from(eqnNodeList).forEach((eqn) => {
      number++
      eqn.dataset.equationNumber = number.toString()
      const eqnNumElem = eqn.querySelector('.equation-number')
      const label = document.createTextNode(`(${number})`)
      eqnNumElem.appendChild(label)
    })
  }, [])


  // Add equation number references after initial mount
  React.useEffect(() => {
    const eqnRefNodeList = document.querySelectorAll('.equation-reference')
    Array.from(eqnRefNodeList).forEach((eqnRef) => {
      const refTag = eqnRef.dataset.referenceTo
      const eqnNodeList = document.querySelectorAll(`.equation-container[data-equation-reference='${refTag}']`)
      const eqnNumber = eqnNodeList[0].dataset.equationNumber
      const label = document.createTextNode(`Eq. (${eqnNumber})`)
      eqnRef.appendChild(label)
    })
  }, [])


  // Add table of contents after initial mount
  React.useEffect(() => {
    const sectionNodeList = document.querySelectorAll('.section-anchor')
    if (sectionNodeList.length > 1) {
      const tocList = document.querySelector('.toc-list')
      Array.from(sectionNodeList).forEach((section) => {
        const sectionLinkName = section.name
        const sectionTitle = sectionLinkName.replace(/-/g, ' ')
        const listItem = document.createElement('li')
        const sectionLink = document.createElement('a')
        sectionLink.setAttribute('href',`#${sectionLinkName}`)
        sectionLink.appendChild(document.createTextNode(sectionTitle))
        listItem.appendChild(sectionLink)
        tocList.appendChild(listItem)
      })
    }

  }, [])


  return (
    <CommonPageStyles className={props.className}>
      <SEO title={mdx.frontmatter.title} />
      {mdx.frontmatter.title !== '' && <h1 className='page-title'>{mdx.frontmatter.title}</h1>}
      <TableOfContents className='toc-list' />
      <MDXRenderer>{mdx.body}</MDXRenderer>
      <CommonFooter>
        <a href='https://github.com/R2B1/physref'>Edit this page on GitHub</a>
        <br/><br/><br/>
      </CommonFooter>
    </CommonPageStyles>
  )
}

const TableOfContents = styled.ol`
  margin: 0.75em 0;
  padding: 0 0 0 1.25em;
  li {
    counter-increment: list;
    list-style-type: none;
    position: relative;
    &::before {
      color: ${props => props.theme.primary.base};
      content: counter(list) '.';
      position: absolute;
      left: -1.25em;
      text-align: left;
      width: 1em;
    }
  }
`

const CommonFooter = styled.footer`
  padding-top: 0.8rem;
`
