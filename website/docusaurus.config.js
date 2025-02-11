// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/vsLight");
const darkCodeTheme = require("prism-react-renderer/themes/vsDark");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "OpenBB Docs",
  tagline: "OpenBB Docs",
  url: "https://docs.openbb.co", // Your website URL
  baseUrl: "/",
  projectName: "OpenBBTerminal",
  organizationName: "OpenBB-finance",
  trailingSlash: false,
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: [
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            from: "/terminal/usage/intros/forecasting",
            to: "/terminal/usage/intros/forecast",
          },
          {
            from: "/terminal/quickstart/api-keys",
            to: "/terminal/usage/guides/api-keys",
          },
          {
            from: "/terminal/guides/advanced/data",
            to: "/terminal/usage/guides/data",
          },
          {
            from: "/terminal/guides/advanced/scripts-and-routines",
            to: "/terminal/usage/guides/scripts-and-routines",
          },
          {
            from: "/terminal/guides/basics",
            to: "/terminal/usage/basics",
          },
          {
            from: "/terminal/guides/intros/portfolio",
            to: "/terminal/usage/intros/portfolio",
          },
          {
            from: "/terminal/quickstart/installation",
            to: "/terminal/installation",
          },
          {
            from: "/sdk/quickstart/installation",
            to: "/sdk/installation",
          },
        ],
      },
    ],
    async function twPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
    /*[
      "@docusaurus/plugin-content-docs",
      {
        id: "sdk",
        path: "content/sdk",
        routeBasePath: "sdk",
        editUrl:
          "https://github.com/OpenBB-finance/OpenBBTerminal/edit/main/website/",
        sidebarPath: require.resolve("./sidebars.js"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "bot",
        path: "content/bot",
        routeBasePath: "bot",
        editUrl:
          "https://github.com/OpenBB-finance/OpenBBTerminal/edit/main/website/",
        sidebarPath: require.resolve("./sidebars.js"),
      },
    ],*/
  ],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.com/OpenBB-finance/OpenBBTerminal/edit/main/website/",
          routeBasePath: "/",
          path: "content",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/banner.png",
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      // TODO - Jose can you make this so we get lighter color on main view - like bot docs
      colorMode: {
        defaultMode: "dark",
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      algolia: {
        appId: "7D1HQ0IXAS",
        apiKey: "a2e289977b4b663ed9cf3d4635a438fd",
        indexName: "openbbterminal",
        contextualSearch: false,
      },
    }),
};

module.exports = config;
