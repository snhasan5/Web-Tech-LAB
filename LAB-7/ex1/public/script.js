document.addEventListener('DOMContentLoaded', () => {
  fetchNotes();

  // Add Note Form Submit
  const addNoteForm = document.getElementById('addNoteForm');
  addNoteForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const subject = document.getElementById('subject').value;
    const description = document.getElementById('description').value;

    const data = { title, subject, description };

    try {
      const response = await fetch('/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        addNoteForm.reset();
        fetchNotes(); // Refresh list
      } else {
        console.error('Failed to add note');
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  });

  // Edit Note Form Submit
  const editNoteForm = document.getElementById('editNoteForm');
  editNoteForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('editId').value;
    const title = document.getElementById('editTitle').value;
    const subject = document.getElementById('editSubject').value;
    const description = document.getElementById('editDescription').value;

    const data = { title, subject, description };

    try {
      const response = await fetch(`/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        closeModal();
        fetchNotes(); // Refresh list
      } else {
        console.error('Failed to update note');
      }
    } catch (error) {
      console.error('Error updating note:', error);
    }
  });
});

// Fetch Notes
async function fetchNotes() {
  try {
    const response = await fetch('/notes');
    const notes = await response.json();
    displayNotes(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
  }
}

// Display Notes
function displayNotes(notes) {
  const notesList = document.getElementById('notesList');
  notesList.innerHTML = ''; // Clear existing

  if (notes.length === 0) {
    notesList.innerHTML = '<p>No notes found.</p>';
    return;
  }

  const ul = document.createElement('ul');
  notes.forEach(note => {
    const li = document.createElement('li');
    li.classList.add('note-item');
    li.innerHTML = `
      <div class="note-content">
        <span class="note-title"></span> <span class="note-subject"></span>
        <p class="note-description"></p>
        <span class="note-date"></span>
        <button class="btn-edit">Edit</button>
        <button class="btn-delete">Delete</button>
      </div>
    `;

    // Safely set text content
    li.querySelector('.note-title').textContent = note.title;
    li.querySelector('.note-subject').textContent = `(${note.subject})`;
    li.querySelector('.note-description').textContent = note.description;
    li.querySelector('.note-date').textContent = `Created: ${new Date(note.created_date).toLocaleString()}`;

    // Attach event listeners directly
    const editBtn = li.querySelector('.btn-edit');
    editBtn.addEventListener('click', () => openEditModal(note._id, note.title, note.subject, note.description));

    const deleteBtn = li.querySelector('.btn-delete');
    deleteBtn.addEventListener('click', () => deleteNote(note._id));

    ul.appendChild(li);
  });
  notesList.appendChild(ul);
}

// Delete Note
async function deleteNote(id) {
  if (!confirm('Are you sure you want to delete this note?')) return;

  try {
    const response = await fetch(`/notes/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      fetchNotes(); // Refresh list
    } else {
      console.error('Failed to delete note');
    }
  } catch (error) {
    console.error('Error deleting note:', error);
  }
}

// Open Edit Modal
function openEditModal(id, title, subject, description) {
  const modal = document.getElementById('editModal');
  document.getElementById('editId').value = id;
  document.getElementById('editTitle').value = title;
  document.getElementById('editSubject').value = subject;
  document.getElementById('editDescription').value = description;
  modal.style.display = "block";
}

// Close Modal
function closeModal() {
  const modal = document.getElementById('editModal');
  modal.style.display = "none";
}

// Close Modal if clicked outside
window.onclick = function(event) {
  const modal = document.getElementById('editModal');
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
