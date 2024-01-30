document.addEventListener('DOMContentLoaded', () => {
    fetchItems();
});

function addNewItem() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    fetch('/items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
    })
    .then(response => response.json())
    .then(item => {
        fetchItems(); // Refresh the item list after adding
    });

    // Clear the form
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
}

function fetchItems() {
    fetch('/items')
        .then(response => response.json())
        .then(items => {
            const itemList = document.getElementById('itemList');
            itemList.innerHTML = ''; // Clear previous items

            items.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `
                    ${item.title} - ${item.description}
                    <button onclick="editItem(${item.id})">Edit</button>
                    <button onclick="deleteItem(${item.id})">Delete</button>
                `;
                itemList.appendChild(li);
            });
        });
}

function editItem(id) {
    const title = prompt('Enter new title:');
    const description = prompt('Enter new description:');

    fetch(`/items/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
    })
    .then(response => response.json())
    .then(item => {
        fetchItems(); // Refresh the item list after editing
    });
}

function deleteItem(id) {
    if (confirm('Are you sure you want to delete this item?')) {
        fetch(`/items/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(item => {
            fetchItems(); // Refresh the item list after deleting
        });
    }
}
