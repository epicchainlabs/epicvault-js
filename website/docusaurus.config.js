module.exports = {
  title: "epicvault-js",
  tagline: "The JS SDK for EpicChain Blockchain is a comprehensive JavaScript library designed to facilitate seamless interaction with the EpicChain blockchain.",
  url: "https://epic-chain.org",
  baseUrl: "/neo3/neon-js/",
  organizationName: "epicchainlabs",
  projectName: "epicvault-js",
  scripts: [
    "https://buttons.github.io/buttons.js",
    // "https://unpkg.com/@epicchainlabs/epicvault-js@next",
  ],
  favicon: "img/favicon.png",
  customFields: {
    users: [
      {
        caption: "EpicVault Wallet",
        image:
          "https://github.com/epicchainlabs/epicvault-desktop/blob/dev/icons/png/512x512.png?raw=true",
        infoLink: "http://epic-chain.org/epicvault-desktop/",
        pinned: true,
      },
    ],
    repoUrl: "https://github.com/epicchainlabs/epicvault-js",
  },
  onBrokenLinks: "log",
  onBrokenMarkdownLinks: "log",
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          path: "../docs",
          sidebarPath: require.resolve("./sidebars.js"),
        },
        blog: false,
        theme: {
          customCss: "../src/css/customTheme.css",
        },
      },
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-client-redirects",
      {
        fromExtensions: ["html"],
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: "neon-js",
      logo: {
        src: "img/logo.svg",
      },
      items: [
        {
          to: "docs/",
          label: "Docs",
          position: "left",
        },
        {
          to: "docs/api",
          label: "API",
          position: "left",
        },
        {
          to: "docs/changelog/latest",
          label: "Changelog",
          position: "left",
        },
        {
          to: "/help",
          label: "Help",
          position: "left",
        },
      ],
    },
    footer: {
      links: [],
      copyright: "Copyright © 2021 Ethan Fast, Yak Jun Xiang",
      logo: {
        src: "img/logo.svg",
      },
    },
  },
};
