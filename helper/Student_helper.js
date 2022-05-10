import { ObjectId } from 'mongodb';
import { client } from './../index.js';

async function createStudents(data) {
	return await client.db('student_mentor').collection('student').insertOne(data);
}

async function getStudents() {
	return await client.db('student_mentor').collection('student').find({}).toArray();
}

async function getStudent(id) {
	return await client
		.db('student_mentor')
		.collection('student')
		.find({ _id: ObjectId(id) })
		.toArray();
}

async function addMentor(data, id) {
	return await client
		.db('student_mentor')
		.collection('student')
		.updateOne({ _id: ObjectId(id) }, { $set: { mentor_assigned: data } });
}

export { createStudents, getStudents, getStudent, addMentor };
