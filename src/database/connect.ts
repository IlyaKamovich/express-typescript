import mongoose from 'mongoose';
import config from 'config';
import { IConfig } from '@interfaces/config.interface';

const connectToMongoDatabase = async () => {
	try {
		await mongoose.connect(config.get<IConfig>('app').database);
		console.log('MongoDB connected');
	} catch (error) {
		console.error('Failed to connect to MongoDB', error);
		process.exit(1);
	}
};

export { connectToMongoDatabase };
