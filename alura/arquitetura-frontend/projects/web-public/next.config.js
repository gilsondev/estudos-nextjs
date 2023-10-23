const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")([
  "@alura/utils",
  "@alura/design-system",
]);

/** @type {import('next').NextConfig} */
const nextConfig = withPlugins([withTM], {
  reactStrictMode: true,
});

module.exports = nextConfig;
