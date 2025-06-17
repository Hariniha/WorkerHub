const express = require('express');
const router = express.Router();
const Worker = require('../models/Worker');
const twilio = require('twilio');




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

const accountSid = 'AC7328967f87f18bdd6ffd71e0b03424d0';
const authToken = '464303bcba2634a0494ce2851348e856';
const verifySid = 'VA238d0d3c2b8ec3741533036ea7125e17';
const client = twilio(accountSid, authToken);

router.post('/send-otp', async (req, res) => {
  console.log('req.body:', req.body);

  const { phone } = req.body;
  try {
    await client.verify.v2.services(verifySid)
      .verifications
      .create({ to: `+91${phone}`, channel: 'sms' });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});


router.post('/verify-otp', async (req, res) => {
  console.log('req.body:', req.body);

  const { phone, otp } = req.body;
  try {
    const verificationCheck = await client.verify.v2.services(verifySid)
      .verificationChecks
      .create({ to: `+91${phone}`, code: otp });
    res.json({ verified: verificationCheck.status === 'approved' });
  } catch (err) {
    console.error(err);
    res.json({ verified: false });
  }
});

module.exports = router;
