import express from 'express';
import Memo from '../models/memo';
import mongoose from 'mongoose';

const router = express.Router();

/*
  WRITE MEMO: POST /api/memo
  BODY SAMPLE: { contents: "sample "}
  ERROR CODES
    1: NOT LOGGED IN
    2: EMPTY CONTENTS
*/
router.post('/', (req, res) => {
  // check login status
  if (!req.session.loginInfo) {
    return res.status(403).json({
      error: 'NOT LOGGED IN',
      code: 1
    });
  }

  // check contents valid
  if (typeof req.body.contents !== 'string' || req.body.contents === '') {
    return res.status(400).json({
      error: 'EMPTY CONTENTS',
      code: 2
    });
  }

  // create new memo
  const memo = new Memo({
    writer: req.session.loginInfo.username,
    contents: req.body.contents
  });

  // save in database
  memo.save(err => {
    if (err) throw err;
    return res.json({success: true});
  })
});

/*
  READ MEMO: GET /api/memo
*/
router.get('/', (req, res) => {
  Memo.find()
    .sort({'_id': -1})
    .limit(6)
    .exec((err, memos) => {
      if (err) throw err;
      res.json(memos);
    });
});

/*
  DELETE MEMO: DELETE /api/memo/:id
  ERROR CODES
    1: INVALID ID
    2: NOT LOGGED IN
    3: NO RESOURCE
    4: PERMISSION FAILURE
*/
router.delete('/:id', (req, res) => {
  // check memo id validaty
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      error: 'INVALID ID',
      code: 1
    });
  }

  // check login status
  if (!req.session.loginInfo) {
    return res.status(403).json({
      error: 'not logged in',
      code: 2
    });
  }

  // find memo and check for writer
  Memo.findById(req.params.id, (err, memo) => {
    if (err) throw err;

    if (!memo) {
      return res.status(404).json({
        error: 'NO RESOURCE',
        code: 3
      });
    }
    if (memo.writer !== req.session.loginInfo.username) {
      return res.status(403).json({
        error: 'PERMISSION FAILURE',
        code: 4
      })
    }

    // remove the memo
    Memo.remove({_id: req.params.id}, err => {
      if (err) throw err;
      res.json({success: true});
    });
  })
});

/*
  MODIFY MEMO: PUT /api/memo/:id
  BODY SAMPLE: { contents: "sample "}
  ERROR CODES
    1: INVALID ID,
    2: EMPTY CONTENTS
    3: NOT LOGGED IN
    4: NO RESOURCE
    5: PERMISSION FAILURE
*/
router.put('/:id', (req, res) => {
  // check memo id validaty
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      error: 'INVALID ID',
      code: 1
    });
  }

  // check contents valid
  if (typeof req.body.contents !== 'string' || req.body.contents === '') {
    return res.status(400).json({
      error: 'EMPTY CONTENTS',
      code: 2
    });
  }

  // check login status
  if (!req.session.loginInfo) {
    return res.status(403).json({
      error: 'NOT LOGGED IN',
      code: 3
    });
  }

  // find memo
  Memo.findById(req.params.id, (err, memo) => {
    if (err) throw err;

    // if memo dose not exist
    if (!memo) {
      return res.status(404).json({
        error: 'NO RESOURCE',
        code: 4
      });
    }

    // if exists, check writer
    if (memo.writer !== req.session.loginInfo.username) {
      return res.status(403).json({
        error: 'PERMISSION FAILURE',
        code: 5
      })
    }

    // modify and save in database
    memo.contents = req.body.contents;
    memo.date.edited = new Date();
    memo.is_edited = true;

    memo.save((err, memo) => {
      if (err) throw err;
      return res.json({
        success: true,
        memo
      });
    });
  });
});


export default router;