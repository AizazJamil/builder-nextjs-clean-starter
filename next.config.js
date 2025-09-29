module.exports = {
  basePath: '/next14-pages',
  async headers() {
    return [
      {
        source: "/(.*)", // all routes
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOWALL",
          },
        ],
      },
    ];
  },
};
