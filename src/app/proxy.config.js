const PROXY_CONFIG = [
  {
      context: [
          "/users",
          "/many"
      ],
      target: "http://localhost:8080",
      secure: false,
       logLevel : "debug",
       changeOrigin: true
      }
]

module.exports = PROXY_CONFIG;
