import { ObjectId } from 'mongodb';
import { client } from '../index.js';

async function createMentor(data) {
	return await client.db('student_mentor').collection('mentor').insertOne(data);
}

async function removeMentee(student_id, id) {
	return await client
		.db('student_mentor')
		.collection('mentor')
		.updateOne(
			{ _id: ObjectId(id), mentees_assigned: { $elemMatch: { student_id: student_id } } },
			{ $pull: { mentees_assigned: { student_id: student_id } } }
			// { arrayFilters: [{ 'outer.student_id': student_id }] }
		);
}

async function updateMentee(data, mentor_id) {
	return await client
		.db('student_mentor')
		.collection('mentor')
		.updateOne(
			{ _id: ObjectId(mentor_id) },
			{ $push: { mentees_assigned: data } },
			{ upsert: true }
		);
}

async function getMentor() {
	return await client.db('student_mentor').collection('mentor').find({}).toArray();
}

export { createMentor, removeMentee, updateMentee, getMentor };
