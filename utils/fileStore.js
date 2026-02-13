const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

const DATA_FILE = path.resolve(__dirname, '..', 'data_store.json');

async function readStore() {
  try {
    const txt = await fsPromises.readFile(DATA_FILE, 'utf8');
    return JSON.parse(txt || '{}');
  } catch (err) {
    if (err.code === 'ENOENT') {
      return { visits: [], enrollments: [] };
    }
    throw err;
  }
}

async function writeStore(obj) {
  const tmp = DATA_FILE + '.tmp';
  const txt = JSON.stringify(obj, null, 2);
  await fsPromises.writeFile(tmp, txt, 'utf8');
  await fsPromises.rename(tmp, DATA_FILE);
}

function makeId(prefix = '') {
  return prefix + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
}

async function saveVisit(visit) {
  const store = await readStore();
  store.visits = store.visits || [];
  const toSave = Object.assign({}, visit, { _id: makeId('v_'), createdAt: new Date().toISOString() });
  store.visits.push(toSave);
  await writeStore(store);
  return toSave;
}

async function saveEnrollment(enroll) {
  const store = await readStore();
  store.enrollments = store.enrollments || [];
  const toSave = Object.assign({}, enroll, { _id: makeId('e_'), createdAt: new Date().toISOString() });
  store.enrollments.push(toSave);
  await writeStore(store);
  return toSave;
}

async function getUniqueVisitorsCount() {
  const store = await readStore();
  const visits = store.visits || [];
  const set = new Set(visits.map(v => v.userId).filter(Boolean));
  return set.size;
}

async function getEnrollments() {
  const store = await readStore();
  return store.enrollments || [];
}

module.exports = {
  saveVisit,
  saveEnrollment,
  getUniqueVisitorsCount,
  getEnrollments,
};
