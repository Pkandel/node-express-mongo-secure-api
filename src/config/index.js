import dotenv from 'dotenv';
// Automatically load env variables from .env to process.env
dotenv.load();

const config = {
	node_env: process.env.NODE_ENV,
	port: process.env.PORT,
	jwt_secret: process.env.JWT_SECRET,
	mongo_url: process.env.MONGO_URL,
	mongo_port: process.env.MONGO_PORT
};

export default config;
