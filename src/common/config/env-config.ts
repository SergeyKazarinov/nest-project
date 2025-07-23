interface EnvConfig {
  port: string;
  database: {
    type: string;
    host: string;
    port: string;
    username: string;
    password: string;
    database: string;
  };
  isDev: boolean;
  jwtSecret: string;
}

export const envConfig = (): EnvConfig => ({
  port: process.env.PORT || '3000',
  database: {
    type: process.env.DATABASE_TYPE || 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || '5432',
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: process.env.DATABASE_NAME || 'postgres',
  },
  isDev: process.env.IS_DEV === 'true',
  jwtSecret: process.env.JWT_SECRET || 'secret',
});
