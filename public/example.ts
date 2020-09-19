import { asyncLocalStorage, asyncSessionStorage } from '../src';

function getTextFieldValue() {
  return document.getElementById('textfield').value;
}

async function saveToLocal(run = true) {
  if (!run) return;
  const value = getTextFieldValue();
  await asyncLocalStorage.setItem('field', value);
  const result = await asyncLocalStorage.getItem('field');
  document.getElementById('local').innerHTML = JSON.stringify(result);
}

async function saveToSession(run = true) {
  if (!run) return;
  const value = getTextFieldValue();
  await asyncSessionStorage.setItem('field', value);
  const result = await asyncSessionStorage.getItem('field');
  document.getElementById('session').innerHTML = JSON.stringify(result);
}

async function deleteFromLocal(run = true) {
  if (!run) return;
  await asyncLocalStorage.removeItem('field');
  const result = await asyncLocalStorage.getItem('field');
  document.getElementById('local').innerHTML = JSON.stringify(result) || '';
}

async function deleteFromSession(run = true) {
  if (!run) return;
  await asyncSessionStorage.removeItem('field');
  const result = await asyncSessionStorage.getItem('field');
  document.getElementById('session').innerHTML = JSON.stringify(result) || '';
}

saveToLocal(false);
saveToSession(false);
deleteFromLocal(false);
deleteFromSession(false);
