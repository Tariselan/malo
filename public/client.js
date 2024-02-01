// Import the parse function from script.js
import { parse } from './script.js';

//

document.addEventListener('DOMContentLoaded', () => {
    fetchItems();
});

function addNewItem() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const note = document.getElementById('note').value;

    fetch('/items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, note }),
    })
    .then(response => {
        console.log('Raw Response:', response);
        return response.json();
    })
    .then(item => {
        console.log('Parsed JSON:', item);
        fetchItems(); // Refresh the item list after adding
    })
    .catch(error => {
        console.error('Error during fetch:', error);
    });

    // Clear the form
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('note').value = '';
}

document.getElementById('addItemForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting in the traditional way
    addNewItem(); // Call the function to add a new item
});

function fetchItems() {
    // Define handleItemClick function
    function handleItemClick(event) {
        const target = event.target;

        if (target.classList.contains('edit-btn')) {
            event.stopPropagation(); // Stop event propagation
            const itemId = target.closest('.dictionary_entry').dataset.itemId;
            editItem(itemId);
        } else if (target.classList.contains('delete-btn')) {
            event.stopPropagation(); // Stop event propagation
            const itemId = target.closest('.dictionary_entry').dataset.itemId;
            deleteItem(itemId);
        }
    }
    // Clone the itemList element without events
    const newItemList = itemList.cloneNode(true);

    // Replace the original itemList with the cloned one
    itemList.parentNode.replaceChild(newItemList, itemList);

    // Add new event listener to the cloned itemList
    newItemList.addEventListener('click', handleItemClick);

    fetch('/items')
        .then(response => response.json())
        .then(items => {
            const itemList = document.getElementById('itemList');
            itemList.innerHTML = ''; // Clear previous items

            // Custom sorting function
            const customSort = (a, b) => {
                // Assuming titles are single characters in the range 1-9, a-n
                const charOrder = "123456789abcdefghijklmn";
                return charOrder.indexOf(a.title) - charOrder.indexOf(b.title);
            };

            // Sort items using the custom sort function
            items.sort(customSort);

            items.forEach(item => {
                const div = document.createElement('div');
                div.className = 'dictionary_entry';
                div.dataset.itemId = item.id; // Store item id using data attribute
            
                let noteSection = '';
                if (!(item.note == '')) {
                    noteSection = `<br><br><strong>NOTE:</strong>${item.note}`;
                }
            
                div.innerHTML = `
                    <div class="entry-header">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <h2>${parse(item.title, 0)} / ${parse(item.title, 1)}</h2>
                            <span>/${parse(item.title, 2)}/</span>
                        </div>
                        <hr> <!-- Adjusted HR styles -->
                        ${item.description}
                        ${noteSection}
                    </div>
                    <div class="button-container">
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                    </div>
                `;
            
                newItemList.appendChild(div);
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