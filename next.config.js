/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:
      {
        domains: [
            'cdn2.thecatapi.com',
            '28.media.tumblr.com',
            '24.media.tumblr.com',
            '25.media.tumblr.com',
            '26.media.tumblr.com',
            '30.media.tumblr.com',
            '29.media.tumblr.com',
            '27.media.tumblr.com'
        ],
      },
}

module.exports = nextConfig
