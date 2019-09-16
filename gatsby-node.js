const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`)

const getSlugFolders = (slug) => {
  const slugString = slug.substring(1, slug.length-1)
  const slugFolders = slugString.split('/').map(s => {
    s = s.replace(/-/g, ' ')
    s = s.replace(/^\d\d\d\d_/, '')
    return s
  })
  const folderPriorities = slugString.split('/').map(s => {
    s = s.replace(/_.*/, '')
    s = parseInt(s, 10)
    return s
  })
  return [slugFolders, folderPriorities]
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    if (node.fileAbsolutePath.includes('src/formulary/')) {
      let slug = createFilePath({ node, getNode, basePath: `formulary` })
      const [slugFolders, folderPriorities] = getSlugFolders(slug)
      slug = slug.replace(/\d\d\d\d_/g, '')
      createNodeField({
        node,
        name: `pageType`,
        value: `formulary`,
      })
      createNodeField({
        node,
        name: `slug`,
        value: slug,
      })
      createNodeField({
        node,
        name: `slugFolders`,
        value: slugFolders,
      })
      createNodeField({
        node,
        name: `folderPriorities`,
        value: folderPriorities,
      })
    } else if (node.fileAbsolutePath.includes('src/sitePages/')) {
      let slug = createFilePath({ node, getNode, basePath: `sitePages` })
      createNodeField({
        node,
        name: `pageType`,
        value: `site`,
      })
      createNodeField({
        node,
        name: `slug`,
        value: slug,
      })
    }
  } 
}

// Create formulary pages
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  return graphql(`
    query loadPagesQuery {
      allMdx {
        edges {
          node {
            fields {
              slug
              pageType
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }
    return result.data.allMdx.edges.forEach(({ node }) => {

      if (node.fields.pageType === 'formulary') {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`src/templates/formularyPage.jsx`),
          context: {
            slug: node.fields.slug,
            pageType: node.fields.pageType,
          },
        })
      } else if (node.fields.pageType === 'site') {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`src/templates/sitePage.jsx`),
          context: {
            slug: node.fields.slug,
            pageType: node.fields.pageType,
          },
        })
      }
      
    })
  })
}

// Allows importing JSX components in auto-created MDX pages
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  })
}
