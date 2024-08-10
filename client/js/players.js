document.addEventListener('DOMContentLoaded', async function() {
    const playerListContainer = document.querySelector('.itemListContainer');

    function addPlayerToList(player) {
        const itemLineWrapper = document.createElement('div');
        itemLineWrapper.className = 'itemLineWrapper';

        const itemTextDiv = document.createElement('div');
        itemTextDiv.className = 'itemText';

        const spanText = document.createElement('span');
        spanText.textContent = player.player_name || player.text;

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

        // יצירת הקו האופקי
        const itemLine = document.createElement('div');
        itemLine.className = 'itemLine';

        // הוספת השחקן והאייקונים ולאחר מכן את הקו
        itemLineWrapper.appendChild(itemTextDiv);
        itemLineWrapper.appendChild(itemLine);

        playerListContainer.appendChild(itemLineWrapper);
    }

    // הבאת השחקנים מהדאטה בייס בעת טעינת הדף
    try {
        const response = await fetch('https://ex5-server.onrender.com/api/players');
        const players = await response.json();

        players.forEach(player => {
            addPlayerToList(player);
        });
    } catch (error) {
        console.error('Error fetching players:', error);
    }

    // הוספת שחקן חדש עם לחיצה על כפתור ההוספה
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
                addPlayerToList({ player_name: data.player_name }); // הוספת השחקן החדש עם הקו
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
