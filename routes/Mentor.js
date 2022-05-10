import express from 'express';
import { createMentor, getMentor } from '../helper/Mentor_helper.js';

const router = express();

// To Create Mentor
router.post('/create-mentor', async (request, response) => {
	const data = request.body;

	const result = await createMentor(data);

	response.send(result);
});

router.get('/', async (request, response) => {
	const result = await getMentor();
	response.send(result);
});

router.put('/add-mentee/:id', async (request, response) => {
	const { id } = request.params;

	const data = request.body;

	const mentor_result = await updateMentee(data, id);

	response.send(mentor_result);
});

export const MentorRouter = router;
