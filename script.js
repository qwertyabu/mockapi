const API_URL = 'https://68091bb31f1a52874cdbea44.mockapi.io/ukam/umber';
const contactList = document.getElementById('contactList');
const addContactBtn = document.getElementById('addContact');

async function fetchContacts() {
  const response = await fetch(API_URL);
  const contacts = await response.json();
  renderContacts(contacts);
}

function renderContacts(contacts) {
  contactList.innerHTML = '';
  contacts.forEach(contact => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${contact.name} - ${contact.number}</span>
      <button class="edit-btn" onclick="editContact(${contact.id})">✏️</button>
      <button class="delete-btn" onclick="deleteContact(${contact.id})">🗑️</button>
    `;
    contactList.appendChild(li);
  });
}

async function addContact() {
  const name = document.getElementById('name').value.trim();
  const number = document.getElementById('number').value.trim();
  if (name && number) {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, number })
    });
    document.getElementById('name').value = '';
    document.getElementById('number').value = '';
    fetchContacts();
  } else {
    alert("Please enter both name and number.");
  }
}

async function deleteContact(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  fetchContacts();
}

async function editContact(id) {
  const newName = prompt('Enter new name:');
  const newNumber = prompt('Enter new number:');
  if (newName && newNumber) {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName, number: newNumber })
    });
    fetchContacts();
  }
}

addContactBtn.addEventListener('click', addContact);
fetchContacts();

