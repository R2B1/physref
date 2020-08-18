import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { useLocation } from "@reach/router"
import styled from '@emotion/styled'
import clsx from 'clsx'
import { device } from '../styles/device'


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
    newLeafNode.type = 'link'

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
        newParentNode.type = 'category'

        subTree.push(newParentNode)
        nodeIndex = subTree.length-1
      }
      subTree = subTree[nodeIndex].children
    }
    subTree.push(newLeafNode)
  })
  return menuTree
}

const isActiveMenuItem = (item, activePath) => {
  if (item.type === 'link') {
    return item.slug === activePath
  }
  if (item.type === 'category') {
    return item.children.some((item) => isActiveMenuItem(item, activePath))
  }
  return false
}

function NavMenuItemCategory({
  item, activePath, expanded, setExpanded, onLinkClick
}) {
  const {children, title} = item
  const isActive = isActiveMenuItem(item, activePath)
  const isExpanded = (title === expanded)

  // Initially open active category
  React.useEffect(() => {
    if(isActive) {
      setExpanded(item.title)
    }
  }, [])

  const handleClick = () => {
    if (isExpanded) {
      setExpanded(null)
    } else {
      setExpanded(item.title)
    }
  }

  if (children.length === 0) {
    return null
  }

  return (
    <li className="menu__list-item" key={title}>
      <MenuCategoryButton
        className={clsx({'active' : isActive, 'expanded' : isExpanded})}
        onClick={handleClick}
      >
        <div>{title}</div>
        <div>
          <i className={clsx('material-icons', {'expanded' : isExpanded})}>expand_more</i>
        </div>
      </MenuCategoryButton>
      <MenuList
        className={clsx('submenu', {'expanded' : isExpanded})}
      >
        {children.map((node) => (
          <NavMenuItem
            key={node.title}
            tabIndex={isExpanded ? '0' : '-1'}
            item={node}
            activePath={activePath}
            onLinkClick={onLinkClick}
          />
        ))}
      </MenuList>
    </li>
  )
}

function NavMenuItemLink({item, activePath, onLinkClick}) {
  const {slug, title} = item
  const isActive = isActiveMenuItem(item, activePath)
  return (
    <li className="menu__list-item" key={title}>
      <Link className="menu__link" to={slug} onClick={onLinkClick}>
        <MenuLink
          className={clsx({'active' : isActive})}
        >
          {title}
        </MenuLink>
      </Link>
    </li>
  )
}

function NavMenuItem(props) {
  switch (props.item.type) {
    case 'category':
      return <NavMenuItemCategory {...props} />;
    case 'link':
    default:
      return <NavMenuItemLink {...props} />;
  }
}

const NavMenu = () => {

  const queryData = useStaticQuery(MENU_QUERY)
  const activePath = useLocation().pathname
  const [expandedCategory, setExpandedCategory] = React.useState(null)
  const [showResponsiveMenu, setShowResponsiveMenu] = React.useState(false)

  // Only build menu tree when page loads
  const menuTree = React.useMemo(() => {
    const menuTree = buildMenuTree(queryData.allMdx.edges)
    sortMenuByPriority(menuTree)
    return menuTree
  }, [])

  return (
    <>
      <ResponsiveMenuButton
        aria-label={showResponsiveMenu ? 'Close Menu' : 'Open Menu'}
        aria-haspopup="true"
        className="menu__button"
        type="button"
        onClick={() => {
          setShowResponsiveMenu(!showResponsiveMenu);
        }}
      >
        {showResponsiveMenu ? (
          <i className='material-icons'>close</i>
        ) : (
          <i className='material-icons'>menu_book</i>
        )}
      </ResponsiveMenuButton>    
      <MenuWrapper className={clsx('menu', {'show' : showResponsiveMenu})}>
        <MenuList className="menu__list">
          {menuTree.map((node) => (
            <NavMenuItem 
              key={node.title}
              item={node}
              activePath={activePath}
              expanded={expandedCategory}
              setExpanded={setExpandedCategory}
              onLinkClick={(e) => {
                e.target.blur();
                setShowResponsiveMenu(false)
              }}
            />
          ))}
        </MenuList>
      </MenuWrapper>
    </>
  )
}

const MenuWrapper = styled.div`
  display: none;
  position: fixed;
  top: 6rem;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.background[0]};
  border: 0;
  z-index: 20;
  padding: 1rem;
  &.show {
    display: inherit;
  }
  @media ${device.large} {
    display: block;
    position: static;
    border-left: 1px solid ${props => props.theme.background[1]};
    padding: 0;
  }
`

const ResponsiveMenuButton = styled.button`
  position: fixed;
  bottom: 4rem;
  right: 2rem;
  background-color: ${props => props.theme.primary.base};
  border: 0;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 20px;
  padding: 0.8rem;
  cursor: pointer;
  outline: none;
  width: 6.4rem;
  height: 6.4rem;
  z-index: 30;
  @media ${device.large} {
    display: none;
  }
  .material-icons {
    font-size: 3.6rem;
    color: ${props => props.theme.background[0]};
  }
`

const MenuList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  &.submenu {
    height: 0;
    overflow: hidden;
    transition: height 0.3s ease;
    &.expanded {
      border-left: 0.8rem solid ${props => props.theme.background[1]};
      height: auto;
      transition: height 0.3s ease;
    }
  }
`

const MenuLink = styled.div`
  background-color: ${props => props.theme.background[0]};
  color: ${props => props.theme.text[0]};
  font-size: 1.3rem;
  font-weight: lighter;
  padding: 0.8rem 0 0.8rem 1.6rem;
  &.active {
    color: ${props => props.theme.primary.base};
  }
  @media ${device.large} {
    &:hover {
      color: ${props => props.theme.text[2]};
    }
  }  
`

const MenuCategoryButton = styled.button`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  background-color: ${props => props.theme.background[0]};
  color: ${props => props.theme.text[0]};
  border: 0;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  outline: none;
  padding: 0 0 0.0 1.6rem;
  text-align: left;
  height: 4.2rem;
  width: 100%;
  @media ${device.large} {
    &:hover {
      background-color: ${props => props.theme.background[1]};
    }
  }  
  &.expanded {
    background-color: ${props => props.theme.background[1]};
    border-color: ${props => props.theme.background[1]};
    color: ${props => props.theme.text[0]};
  }
  &.active {
    color: ${props => props.theme.primary.base};
  }
  .material-icons {
    font-size: 1.8rem;
    color: ${props => props.theme.text[0]};
    padding: 0 0.6rem 0 0.6rem;
    transition: transform 0.3s ease;
    &.expanded {
      transition: transform 0.3s ease;
      transform: rotateZ(-180deg);
    }
  }
`

export default NavMenu
