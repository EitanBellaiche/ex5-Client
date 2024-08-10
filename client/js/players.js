document.addEventListener('DOMContentLoaded', async function() {
    const playerListContainer = document.querySelector('.itemListContainer');

    function addPlayerToList(player) {
        const itemLineWrapper = document.createElement('div');
        itemLineWrapper.className = 'itemLineWrapper';

        const itemTextDiv = document.createElement('div');
        itemTextDiv.className = 'itemText';

        const spanText = document.createElement('span');
        spanText.textContent = player.player_name || player.text;

        const iconsWrapper = document.createElement('div');
        iconsWrapper.className = 'iconsWrapper';

        const editIcon = document.createElement('img');
        editIcon.src = 'images/edit-icon.png';
        editIcon.alt = 'Edit';
        editIcon.className = 'editIcon';

        const trashIcon = document.createElement('img');
        trashIcon.src = 'images/trash-icon.png';
        trashIcon.alt = 'Delete';
        trashIcon.className = 'trashIcon';
        trashIcon.addEventListener('click', async function() {
            const playerName = player.player_name; 
            try {
                const response = await fetch(`https://ex5-server.onrender.com/api/players/${encodeURIComponent(playerName)}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    itemLineWrapper.remove(); 
                    alert('Player deleted successfully.');
                } else {
                    console.error('Failed to delete player.');
                    alert('Failed to delete player.');
                }
            } catch (error) {
                console.error('Error deleting player:', error);
                alert('Error deleting player.');
            }
        });

        iconsWrapper.appendChild(editIcon);
        iconsWrapper.appendChild(trashIcon);

        itemTextDiv.appendChild(spanText);
        itemTextDiv.appendChild(iconsWrapper);

        const itemLine = document.createElement('div');
        itemLine.className = 'itemLine';

        itemLineWrapper.appendChild(itemTextDiv);
        itemLineWrapper.appendChild(itemLine);

        playerListContainer.appendChild(itemLineWrapper);
    }

    try {
        const response = await fetch('https://ex5-server.onrender.com/api/players');
        const players = await response.json();

        players.forEach(player => {
            addPlayerToList(player);
        });
    } catch (error) {
        console.error('Error fetching players:', error);
    }

    document.querySelector('.addPlusButton').addEventListener('click', async function(event) {
        event.preventDefault();

        const form = document.getElementById('playerForm');
        const formData = new FormData(form);
        const data = {
            player_name: formData.get('player_name'),
            player_goals: formData.get('player_goals'),
            player_match_played: formData.get('player_match_played'),
            player_description: formData.get('player_description')
        };

        console.log('Sending data:', data);

        try {
            const response = await fetch('https://ex5-server.onrender.com/api/players/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            let result;
            try {
                result = await response.json();
            } catch (e) {
                result = await response.text();
            }

            if (response.ok) {
                console.log('Success:', result);
                addPlayerToList({ player_name: data.player_name, player_name: data.player_name }); 
                alert(result.message);
                form.reset();
            } else {
                console.error('Server error:', result);
                alert(result.message || 'Failed to process the request.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add player.');
        }
    });
});
