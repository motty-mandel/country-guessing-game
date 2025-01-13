// Function to fetch and load the JSON data
async function loadScoreData() {
    try {
        const response = await fetch('scoresheet.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading game data:', error);
        return null;
    }
}

// Initialize the game
async function initGame() {
    const gameData = await loadScoreData();
    if (gameData) {
        const scoreList = document.getElementById('score-list');
        
        // Clear existing list items
        scoreList.innerHTML = '';
        
        // Add each score to the list
        gameData.forEach(score => {
            const newLi = document.createElement("li");
            newLi.innerHTML = `${score.name}: ${score.score}`;
            scoreList.appendChild(newLi);
        });
    }
}

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', initGame);