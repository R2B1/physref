module.exports = {
  siteMetadata: {
    title: `physref`,
    siteUrl: `https://physref.com`,
    description: `An open-source physics formulary`,
    author: `@ryan_b_royle`,
  },
  plugins: [
    `gatsby-plugin-emotion`,
    `gatsby-plugin-layout`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-katex`,
            options: {
              strict: `ignore`
            }
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'images',
            }
          }
        ],
      },
      defaultLayouts: {
        sitePages: require.resolve('./src/templates/sitePage.jsx'),
        formulary: require.resolve('./src/templates/formularyPage.jsx'),
        default: require.resolve('./src/templates/formularyPage.jsx'),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `sitePages`,
        path: `${__dirname}/src/sitePages/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `formulary`,
        path: `${__dirname}/src/formulary/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        fields: [`title`, `tags`],
        resolvers: {
          Mdx: {
            title: node => node.frontmatter.title,
            tags: node => node.frontmatter.tags,
            slug: node => node.fields.slug,
          },
        },
        filter: (node, getNode) => !node.frontmatter.tags.includes('exempt'),
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `physref`,
        short_name: `physref`,
        start_url: `/`,
        background_color: `#f7f7f7`,
        theme_color: `#24b8bf`,
        display: `standalone`,
        icon: `src/images/icons/physref-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
  ],
}
