// utils/storage.js

export const storeWorker = async (worker) => {
  const response = await fetch('http://localhost:5000/api/workers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(worker),
  });

  if (!response.ok) {
    throw new Error('Failed to create profile');
  }

  return await response.json();
};

export const updateWorkerByPhone = async (worker) => {
  if (!worker.phone) throw new Error('Worker phone number is required for update');

  const response = await fetch(`http://localhost:5000/api/workers/phone/${worker.phone}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(worker),
  });

  if (!response.ok) {
    throw new Error('Failed to update profile by phone');
  }

  return await response.json();
};

export const deleteWorkerByPhone = async (phone) => {
  if (!phone) throw new Error('Worker phone number is required for deletion');

  const response = await fetch(`http://localhost:5000/api/workers/phone/${phone}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete profile by phone');
  }

  return await response.json(); // or nothing if your backend returns no body
};
