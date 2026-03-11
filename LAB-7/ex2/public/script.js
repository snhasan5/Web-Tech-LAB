const seedMessage = document.getElementById('seedMessage');
let currentPage = 1;
let currentTotalPages = 1;

async function seedDatabase() {
    try {
        const response = await fetch('/api/seed', { method: 'POST' });
        const result = await response.json();
        seedMessage.innerText = result.message;
        loadCurrentPage(); // Reload main book list
    } catch (err) {
        seedMessage.innerText = `Error seeding: ${err.message}`;
        seedMessage.style.color = 'red';
    }
}

function loadCurrentPage() {
    loadBooks(currentPage);
}

async function loadBooks(page = 1) {
    try {
        const response = await fetch(`/api/books?page=${page}`);
        const data = await response.json();
        
        displayBooks(data.books);
        
        // Update pagination state
        currentPage = data.currentPage;
        currentTotalPages = data.totalPages;
        
        const indicator = document.getElementById('pageIndicator');
        indicator.innerText = `Page ${currentPage} of ${currentTotalPages}`;
        
        // Update button states
        const prevBtn = document.querySelector('.pagination button:first-child');
        const nextBtn = document.querySelector('.pagination button:last-child');
        
        prevBtn.disabled = currentPage <= 1;
        nextBtn.disabled = currentPage >= currentTotalPages;
        
        document.getElementById('paginationControls').style.display = 'flex';
        
    } catch (error) {
        console.error('Error loading books:', error);
    }
}

function prevPage() {
    if (currentPage > 1) {
        loadBooks(currentPage - 1);
    }
}

function nextPage() {
    if (currentPage < currentTotalPages) {
        loadBooks(currentPage + 1);
    }
}

function displayBooks(books) {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';
    
    if (!books || books.length === 0) {
        bookList.innerHTML = '<p>No books found.</p>';
        return;
    }
    
    books.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');
        
        // Stars
        const stars = '★'.repeat(Math.round(book.rating)) + '☆'.repeat(5 - Math.round(book.rating));
        
        bookItem.innerHTML = `
            <div class="book-title">${book.title}</div>
            <div class="book-author">by ${book.author}</div>
            <div class="book-details">
                <span class="rating-badge">${book.rating}</span> <span style="color: gold;">${stars}</span>
                <p>Category: ${book.category}</p>
                <p>Price: $${book.price}</p>
                <p>Year: ${book.year}</p>
            </div>
        `;
        bookList.appendChild(bookItem);
    });
}


function searchBooks() {
    const title = document.getElementById('searchInput').value;
    if (!title) {
        loadBooks(1);
        return;
    }
    
    fetch(`/api/books/search?title=${title}`)
        .then(res => res.json())
        .then(books => {
            displayBooks(books);
            document.getElementById('paginationControls').style.display = 'none'; // Hide pagination
        })
        .catch(err => console.error(err));
}

function filterByCategory() {
    const category = document.getElementById('categorySelect').value;
    if (!category) {
        loadBooks(1);
        return;
    }
    
    fetch(`/api/books/category/${category}`)
        .then(res => res.json())
        .then(books => {
            displayBooks(books);
            document.getElementById('paginationControls').style.display = 'none';
        })
        .catch(err => console.error(err));
}

function sortBooks(type) {
    fetch(`/api/books/sort/${type}`)
        .then(res => res.json())
        .then(books => {
            displayBooks(books);
            document.getElementById('paginationControls').style.display = 'none';
        })
        .catch(err => console.error(err));
}

function getTopRated() {
    fetch('/api/books/top')
        .then(res => res.json())
        .then(books => {
            displayBooks(books);
            document.getElementById('paginationControls').style.display = 'none';
        })
        .catch(err => console.error(err));
}

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    loadBooks(1);
});
