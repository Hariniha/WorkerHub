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

router.get('/', async (req, res) => {
  const workers = await Worker.find();
  res.json(workers);
});

// GET /api/workers/:id - Get a specific worker by ID
router.get('/:id', async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (!worker) {
      return res.status(404).json({ error: 'Worker not found' });
    }
    res.json(worker);
  } catch (err) {
    res.status(500).json({ error: 'Invalid ID format or server error' });
  }
});


// PUT /api/workers/:id - Update a specific worker
router.put('/phone/:phone', async (req, res) => {
  try {
    const updatedWorker = await Worker.findOneAndUpdate(
      { phone: req.params.phone },  // ✅ Correct filter
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedWorker) {
      return res.status(404).json({ error: 'Worker not found' });
    }

    res.json(updatedWorker);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// DELETE worker by phone
router.delete('/phone/:phone', async (req, res) => {
  try {
    const { phone } = req.params;
    const deleted = await Worker.findOneAndDelete({ phone });

    if (!deleted) {
      return res.status(404).json({ error: 'Worker not found' });
    }

    res.json({ message: 'Worker deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
