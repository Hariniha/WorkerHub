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

export const updateWorkerById = async (worker) => {
  if (!worker.id) throw new Error('Worker id is  for update');

  const response = await fetch(`http://localhost:5000/api/workers/${worker._id}`, {
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

export const deleteWorkerById = async (id) => {
  if (!id) throw new Error('Worker id is required for deletion');

  const response = await fetch(`http://localhost:5000/api/workers/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete profile by id');
  }

  return await response.json(); // or nothing if your backend returns no body
};
