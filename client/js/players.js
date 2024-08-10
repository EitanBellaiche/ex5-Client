document.addEventListener('DOMContentLoaded', function() {
    const items = [
        { text: "Name of player", id: 1 },
        { text: "Name of player", id: 2 },
        { text: "Name of player", id: 3 },
        { text: "Name of player", id: 4 },
        { text: "Name of player", id: 5 }
    ];

    const itemLineWrappers = document.querySelectorAll('.itemLineWrapper');

    items.forEach((item, index) => {
        if (index < itemLineWrappers.length) {
            const itemTextDiv = itemLineWrappers[index].querySelector('.itemText');
            
            
            const spanText = document.createElement('span');
            spanText.textContent = item.text;

            
            const editIcon = document.createElement('img');
            editIcon.src = 'images/edit-icon.png'; 
            editIcon.alt = 'Edit';
            editIcon.className = 'editIcon';

            const trashIcon = document.createElement('img');
            trashIcon.src = 'images/trash-icon.png'; 
            trashIcon.alt = 'Delete';
            trashIcon.className = 'trashIcon';

        
            itemTextDiv.appendChild(spanText);
            itemTextDiv.appendChild(editIcon);
            itemTextDiv.appendChild(trashIcon);
        }
    });
});
