import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import NavMenuUI from './navMenuUI'

function sortMenuByPriority(menu) {
  menu.sort((a, b) => a.priority - b.priority)
  menu.forEach(node => {
    if (node.children.length > 0) {
      sortMenuByPriority(node.children)
    }
  })
}

function buildMenuTree(graphEdges) {

  let menuTree = []

  graphEdges.forEach(edge => {

    const slugFolders = edge.node.fields.slugFolders
    const folderPriorities = edge.node.fields.folderPriorities
    let newLeafNode = {}
    newLeafNode.title = edge.node.frontmatter.title
    newLeafNode.slug = edge.node.fields.slug
    newLeafNode.priority = folderPriorities[folderPriorities.length-1]
    newLeafNode.tags = edge.node.frontmatter.tags
    newLeafNode.children = []

    let subTree = menuTree  // shallow copy; arrays by ref

    for (let i=0; i<slugFolders.length-1; i++) {

      let nodeIndex = -1
      for (let j = 0;  j < subTree.length;  j++) {
        if(slugFolders[i] === subTree[j].title) {
          // folder already exists here
          nodeIndex = j
          break
        }
      }

      if(nodeIndex < 0) {
        // folder does not exist; add it
        let newParentNode = {}
        newParentNode.title = slugFolders[i]
        newParentNode.slug = ''
        newParentNode.priority = folderPriorities[i]
        newParentNode.tags = []
        newParentNode.children = []

        subTree.push(newParentNode)
        nodeIndex = subTree.length-1
      }
      subTree = subTree[nodeIndex].children
    }
    subTree.push(newLeafNode)
  })
  return menuTree
}

const NavMenu = (props) => {
  const queryData = useStaticQuery(MENU_QUERY)
  const menuTree = buildMenuTree(queryData.allMdx.edges)
  sortMenuByPriority(menuTree)
  console.log(menuTree)
  return (
    <NavMenuUI
      tree={menuTree}
      menuState={props.menuState}
      toggleMenu={props.toggleMenu}  
    />
  )
}

const MENU_QUERY = graphql`
  query MenuQuery {
    allMdx(filter: {fields: {pageType: {eq: "formulary"}}}) {
      edges {
        node {
          frontmatter {
            title
            tags
          }
          fields {
            slug
            slugFolders
            folderPriorities
          }
        }
      }
    }
  }
`

export default NavMenu
