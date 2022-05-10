import express from 'express';
import { addMentor, createStudents, getStudent, getStudents } from '../helper/Student_helper.js';
import { removeMentee, updateMentee } from '../helper/Mentor_helper.js';

const router = express.Router();

// To create studetns
router.post('/create-student', async (request, response) => {
	const data = request.body;

	const result = await createStudents(data);
	response.send(result);
});

// To get all student data
router.get('/', async (request, response) => {
	const result = await getStudents();
	response.send(result);
});

// To get one student data
router.get('/:id', async (request, response) => {
	const { id } = request.params;
	const result = await getStudent(id);
	response.send(result);
});

// To edit or add mentor
router.put('/add-mentor/:id', async (request, response) => {
	const { id } = request.params;
	const { student_id, student_name, mentor_id, mentor_name, old_mentor_id } = request.body;

	// To add mentor into students data
	await addMentor({ mentor_id: mentor_id, mentor_name: mentor_name }, id);

	// To remove student as mentee from previous mentor
	if (old_mentor_id) {
		await removeMentee(student_id, old_mentor_id);
	}

	// To add student as mentee into new mentor
	const mentor_result = await updateMentee(
		{ student_id: student_id, student_name: student_name },
		mentor_id
	);

	response.send(mentor_result);
	// response.send('hui');
});

export const StudentRouter = router;
