// @ts-check

// GitHub Pages serves the site from /Curriculum-Legacy/ until a custom domain
// is configured. Set SITE_URL and BASE_URL (e.g. https://legacy.curriculum.sigmalabs.co.uk and /)
// in the deploy workflow once DNS is in place.
const url = process.env.SITE_URL || 'https://sigma-labs-xyz.github.io'
const baseUrl = process.env.BASE_URL || '/Curriculum-Legacy/'

module.exports = async function createConfigAsync() {
  /** @type {import('@docusaurus/types').Config} */
  return {
    title: 'Sigma Labs: Legacy Curriculum',
    tagline: 'Pre-AI workshop notes for coaches',
    url,
    baseUrl,
    trailingSlash: false,
    onBrokenLinks: 'throw',
    onBrokenAnchors: 'ignore',
    favicon: 'img/favicon.png',
    organizationName: 'Sigma-Labs-XYZ',
    projectName: 'Curriculum-Legacy',
    noIndex: true,
    plugins: [require.resolve('docusaurus-lunr-search')],
    markdown: {
      mermaid: true,
      hooks: {
        onBrokenMarkdownLinks: 'throw'
      }
    },
    future: {
      faster: true,
      v4: {
        removeLegacyPostBuildHeadAttribute: true
      }
    },
    themes: ['@docusaurus/theme-mermaid'],
    presets: [
      [
        'classic',
        {
          docs: {
            routeBasePath: '/',
            sidebarPath: require.resolve('./sidebars.js'),
            remarkPlugins: [(await import('remark-math')).default],
            rehypePlugins: [
              [(await import('rehype-katex')).default, { output: 'html' }]
            ],
            admonitions: {
              keywords: ['ai-suggestion'],
              extendDefaults: true
            }
          },
          blog: false,
          theme: {
            customCss: require.resolve('./src/css/custom.css')
          }
        }
      ]
    ],
    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        announcementBar: {
          id: 'legacy-snapshot',
          content:
            `This is a frozen copy of the workshops from before the AI coach changes. We don't update it. For the current curriculum, go to <a href="https://curriculum.sigmalabs.co.uk/">curriculum.sigmalabs.co.uk</a>.`,
          backgroundColor: '#fff3cd',
          textColor: '#664d03',
          isCloseable: false
        },
        navbar: {
          title: 'Legacy Curriculum',
          logo: {
            alt: 'Sigma Labs Logo',
            src: 'img/sigmalogo.jpeg'
          },
          hideOnScroll: true,
          items: [
            {
              label: 'Fundamentals',
              items: [
                {
                  type: 'docSidebar',
                  sidebarId: 'SoftwareFundamentals',
                  label: 'Software Fundamentals'
                },
                {
                  type: 'docSidebar',
                  sidebarId: 'CloudFundamentals',
                  label: 'Cloud Fundamentals'
                },
                {
                  type: 'docSidebar',
                  sidebarId: 'DataAnalysisFundamentals',
                  label: 'Data Analysis Fundamentals'
                }
              ]
            },
            {
              type: 'docSidebar',
              sidebarId: 'AdvancedData',
              label: 'Advanced Data'
            },
            {
              type: 'docSidebar',
              sidebarId: 'TechnicalBusinessAnalyst',
              label: 'Technical Business Analyst'
            },
            {
              href: 'https://curriculum.sigmalabs.co.uk/',
              label: 'Current curriculum',
              position: 'right'
            }
          ]
        },
        footer: {
          style: 'dark',
          copyright: `Copyright © ${new Date().getFullYear()} Sigma Labs XYZ`
        },
        docs: {
          sidebar: {
            hideable: true
          }
        },
        colorMode: {
          defaultMode: 'light',
          disableSwitch: true
        },
        stylesheets: [
          {
            href: 'https://cdn.jsdelivr.net/npm/katex@0.16.25/dist/katex.min.css',
            type: 'text/css',
            crossorigin: 'anonymous'
          }
        ]
      })
  }
}
