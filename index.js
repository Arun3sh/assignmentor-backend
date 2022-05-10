import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
import { StudentRouter } from './routes/Student.js';
import { MentorRouter } from './routes/Mentor.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
	const client = new MongoClient(MONGO_URL);
	await client.connect();
	console.log('Mongodb connected');
	return client;
}

export const client = await createConnection();

app.get('/', (request, response) => {
	response.send('Welcome to Mentor Student Database');
});

app.use('/student', StudentRouter);
app.use('/mentor', MentorRouter);

app.listen(PORT, () => console.log('Port', PORT));
