export const config = {
  database: {
    uri: process.env.NEXA_DATABASE_MONGODB_URI,
    name: process.env.NEXA_DATABASE_MONGODB_NAME,
    password: process.env.NEXA_DATABASE_MONGODB_PASSWORD,
    user: process.env.NEXA_DATABASE_MONGODB_USER,
  },
}
