const WORKERS_KEY = 'workhub_workers';

export const getStoredWorkers = () => {
  try {
    const stored = localStorage.getItem(WORKERS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const storeWorker = (worker) => {
  try {
    const workers = getStoredWorkers();
    workers.push(worker);
    localStorage.setItem(WORKERS_KEY, JSON.stringify(workers));
  } catch (error) {
    console.error('Failed to store worker:', error);
  }
};

export const getAllWorkers = () => {
  const stored = getStoredWorkers();
  return [...stored];
};
