const dbConfig = {
  migrations: ['**/migrations/*.js'],
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'katana-db',
  entities: ['**/*.entity.js'],
  synchronize: false,
  cli: {
    migrationsDir: 'migrations',
  },
};

module.exports = dbConfig;
