declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    MONGO_URL: string;
    NODE_ENV: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    CLOUD_NAME: string;
    CLOUD_API_KEY: string;
    CLOUD_API_SECRET: string;
  }
}
