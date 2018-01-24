export default (() => {
  const {
    DB_USER,
    DB_PASS,
    DB_NAME,
    DB_HOST,
    NODE_ENV,
    SQLITE_PATH,
  } = process.env
  
  switch (NODE_ENV) {
    case 'test':
      console.log('test!')
      return { dialect: 'sqlite', storage: ':memory:', logging: false }
    case 'development':
      console.log('development!')
      return { dialect: 'sqlite', storage: SQLITE_PATH }
    case 'production':
      console.log('production')
      return {
        username: DB_USER,
        password: DB_PASS,
        database: DB_NAME,
        dialect: 'mysql',
        host: DB_HOST,
      }
  }
})()
