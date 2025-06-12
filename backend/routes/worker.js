const express = require('express');
const router = express.Router();
const Worker = require('../models/Worker');

// POST /api/workers - Create a new worker profile
router.post('/', async (req, res) => {
  try {
    const newWorker = new Worker(req.body);
    const savedWorker = await newWorker.save();
    res.status(201).json(savedWorker);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// (Optional) GET /api/workers - List all workers
router.get('/', async (req, res) => {
  const workers = await Worker.find();
  res.json(workers);
});

module.exports = router;
