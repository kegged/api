export default { ...(() => {
  const {
    DB_USER,
    DB_PASS,
    DB_NAME,
    DB_HOST,
    DB_PORT,
    NODE_ENV,
    SQLITE_PATH,
  } = process.env
  
  switch (NODE_ENV) {
    case 'test':
      return { dialect: 'sqlite', storage: ':memory:', logging: false }
    case 'development':
      return { dialect: 'sqlite', storage: SQLITE_PATH }
    case 'production':
      return {
        username: DB_USER || 'root',
        port: DB_PORT || 3306,
        password: DB_PASS || '',
        database: DB_NAME || 'kegged_local',
        dialect: 'mysql',
        host: DB_HOST || 'localhost',
      }
  }
})(), operatorsAliases: false}
