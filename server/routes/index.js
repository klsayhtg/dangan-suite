import express from 'express';
import users from './users';
import memo from './memo';

const router = express.Router();
router.use('/user', users);
router.use('/memo', memo);

export default router;