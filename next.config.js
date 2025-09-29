module.exports = {
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
