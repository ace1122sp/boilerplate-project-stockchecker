module.exports = {
  app: {
    port: process.env.PORT,
    env: 'PRODUCTION'
  },
  db: {
    mongoURI: process.env.DB_URI
  }
}