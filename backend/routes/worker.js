const express = require('express');
const router = express.Router();
const Worker = require('../models/Worker');



const skills = [
  { id: 'plumber', name: 'Plumber', icon: 'Wrench' },
  { id: 'electrician', name: 'Electrician', icon: 'Zap' },
  { id: 'painter', name: 'Painter', icon: 'Paintbrush' },
  { id: 'carpenter', name: 'Carpenter', icon: 'Hammer' },
  { id: 'mechanic', name: 'Mechanic', icon: 'Settings' },
  { id: 'gardener', name: 'Gardener', icon: 'TreePine' },
];
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

router.get('/skills', (req, res) => {
  // Always return 200 with skills array, even if empty
  res.status(200).json(skills);
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


router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedWorker = await Worker.findByIdAndUpdate(id, updates, {
      new: true, // returns updated doc
      runValidators: true,
    });

    if (!updatedWorker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    res.json(updatedWorker);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Update failed' });
  }
});



// DELETE worker by Id
router.delete('/:id', async (req, res) => {
  try {
    
    const deleted = await Worker.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: 'Worker not found' });
    }

    res.json({ message: 'Worker deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
