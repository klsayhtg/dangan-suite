import express from 'express';
import Users from '../models/users';

const router = express.Router();

/*
  ACCOUNT SIGNUP: POST /api/user/signup
  BODY SAMPLE: { "username": "test", "password": "test" }
  ERROR CODES:
    1: BAD USERNAME
    2: BAD PASSWORD
    3: USERNAM EXISTS
*/
router.post('/signup', (req, res) => {
  const {username, password} = req.body;
  // check username format
  const usernameRegex = /^[a-z0-9]+$/;
  if (!usernameRegex.test(username)) {
    return res.status(400).json({
      error: 'BAD USERNAME',
      code: 1
    });
  }

  // check pass length
  if (password.length < 6 || typeof password !== 'string') {
    return res.status(400).json({
      error: 'BAD PASSWORD',
      code: 2
    });
  }

  // check user existance
  Users.findOne({username: req.body.username}, (err, exists) => {
    if (err) throw err;
    if (exists) {
      return res.status(409).json({
        error: 'USERNAME EXISTS',
        code: 3
      });
    }

    // create user
    const user = new Users({
      username: req.body.username,
      password: req.body.password,
    });

    user.password = user.generateHash(user.password);

    // save in the database
    user.save(err => {
      if (err) throw err;
      return res.json({success: true});
    });
  });
});

/*
  ACCOUNT SIGNIN: POST /api/user/signin
  BODY SAMPLE: { "username": "test", "password": "test" }
  ERROR CODES:
    1: LOGIN FAILED
*/
router.post('/signin', (req, res) => {
  const {username, password} = req.body;
  if (typeof password !== 'string') {
    return res.status(401).json({
      error: 'LOGIN FAILED',
      code: 1
    });
  }

  // find the user by username
  Users.findOne({username: username}, (err, user) => {
    if (err) throw err;
    // check account existancy
    if (!user) {
      return res.status(401).json({
        error: 'login failed',
        code: 1
      });
    }

    // check whether the password is valid
    if (!user.validateHash(password)) {
      return res.status(401).json({
        error: 'login failed',
        code: 1
      });
    }

    // alter session
    const session = req.session;
    session.loginInfo = {
      _id: user._id,
      username: user.username
    };

    // return success
    return res.json({
      success: true
    })
  });
});

/*
  GET CURRENT USER INFO GET /api/user/get_info
*/
router.get('/get_info', (req, res) => {
  if (!req.session.loginInfo) {
    return res.status(401).json({
      error: 1
    });
  }

  res.json({info: req.session.loginInfo});
});

/*
    LOGOUT: POST /api/user/logout
*/
router.post('/logout', (req, res) => {
  req.session.destroy(err => { if (err) throw err; });
  return res.json({ success: true });
});

export default router;