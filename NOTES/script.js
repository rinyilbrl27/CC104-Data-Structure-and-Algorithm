let notes = loadNotes();

document.getElementById('add-note-btn').addEventListener('click', addNote);

function addNote() {
  const noteInput = document.getElementById('note-input');
  const noteText = noteInput.value.trim();

  if (noteText !== '') {
    try {
      notes.push(noteText);
      noteInput.value = '';
      displayNotes();
      saveData();
    } catch (error) {
      console.error('Error adding note:', error);
    }
  }
}

function displayNotes() {
  const notesList = document.getElementById('notes-list');
  notesList.innerHTML = '';

  notes.forEach((note, index) => {
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');
    noteElement.innerHTML = `
      <p>${note}</p>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;
    notesList.appendChild(noteElement);
  });

  document.querySelectorAll('.delete-btn').forEach((btn) => {
    btn.addEventListener('click', deleteNote);
  });
}

function deleteNote(event) {
  const index = event.target.dataset.index;
  try {
    notes.splice(index, 1);
    displayNotes();
    saveData();
  } catch (error) {
    console.error('Error deleting note:', error);
  }
}

function saveData() {
  try {
    localStorage.setItem('notes', JSON.stringify(notes));
  } catch (error) {
    console.error('Error saving data:', error);
  }
}

function loadNotes() {
  try {
    const storedNotes = localStorage.getItem('notes');
    return storedNotes ? JSON.parse(storedNotes) : [];
  } catch (error) {
    console.error('Error loading notes:', error);
    return [];
  }
}

displayNotes();
