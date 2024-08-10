document.addEventListener('DOMContentLoaded', function() {
    const items = [
        { text: "Name of player 1", id: 1 },
        { text: "Name of player 2", id: 2 },
        { text: "Name of player 3", id: 3 },
        { text: "Name of player 4", id: 4 },
        { text: "Name of player 5", id: 5 }
    ];

    function addPlayerToList(player) {
        const itemLineWrapper = document.createElement('div');
        itemLineWrapper.className = 'itemLineWrapper';

        const itemTextDiv = document.createElement('div');
        itemTextDiv.className = 'itemText';

        const spanText = document.createElement('span');
        spanText.textContent = player.text;

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

        itemLineWrapper.appendChild(itemTextDiv);
        document.querySelector('.itemListContainer').appendChild(itemLineWrapper);
    }

    items.forEach((item) => {
        addPlayerToList(item);
    });

    document.querySelector('.addPlusButton').addEventListener('click', async function(event) {
        event.preventDefault();

        const form = document.getElementById('playerForm');
        const formData = new FormData(form);
        const data = {
            player_id: formData.get('player_id'), 
            player_name: formData.get('player_name'),
            player_goals: formData.get('player_goals'),
            player_match_played: formData.get('player_match_played'),
            player_description: formData.get('player_description')
        };

        try {
            const response = await fetch('https://ex5-server.onrender.com/api/players/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (response.ok) {
                addPlayerToList({ text: data.player_name, id: result.player_id });
                alert(result.message);
                form.reset();
            } else {
                console.error('Server error:', result.error);
                alert(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add player.');
        }
    });
});
