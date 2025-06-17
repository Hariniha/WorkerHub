// utils/storage.js

// 

export const storeWorker = async (worker) => {
  const response = await fetch('http://localhost:5000/api/workers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(worker),
  });

  if (!response.ok) {
    throw new Error('Failed to create profile');
  }

  return await response.json();
};

export const getAllWorkers = async () => {
  const response = await fetch('http://localhost:5000/api/workers');
  if (!response.ok) {
    throw new Error('Failed to fetch workers');
  }
  return await response.json();
};
export const fetchWorkers = async () => {
  const response = await fetch('http://localhost:5000/api/workers');
  if (!response.ok) {
    throw new Error('Failed to fetch workers');
  }
  return await response.json();
};

export const getAllSkills = async () => {
  const response = await fetch('http://localhost:5000/api/workers');
  if (!response.ok) {
    throw new Error('Failed to fetch skills');
  }
  return response.json();
};

export const updateWorkerById = async (_id, updates) => {
  console.log(_id);
  if (!_id) throw new Error('Worker ID is required for update');

  const response = await fetch(`http://localhost:5000/api/workers/${_id}`, {
    method: 'PATCH', // PATCH is appropriate for partial updates
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error('Failed to update profile');
  }

  return await response.json();
};

export const deleteWorkerById = async (id) => {
  if (!id) throw new Error('Worker id is required for deletion');

  const response = await fetch(`http://localhost:5000/api/workers/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete profile by id');
  }

  return await response.json();
};


export const sendOtp = async (phone) => {
  const response = await fetch('http://localhost:5000/api/workers/send-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone }),
  });

  if (!response.ok) {
    throw new Error('Failed to send OTP');
  }

  return await response.json();
};

export const verifyOtp = async (phone, otp) => {
  const response = await fetch('http://localhost:5000/api/workers/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, otp }),
  });

  if (!response.ok) {
    throw new Error('Failed to verify OTP');
  }

  return await response.json();
};

