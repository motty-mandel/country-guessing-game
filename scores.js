// Initialize the game
async function initGame() {
    const scoreList = document.getElementById('score-list');
    // Retrieve user and score from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    console.log(userData);
    if (userData.length > 5) {
        userData.shift();
        localStorage.setItem('userData', JSON.stringify(userData));
    }

    if (userData) {
        // Add each score to the list
        userData.forEach(player => {
            const newLi = document.createElement("li");
            newLi.innerHTML = `${player}`;
            scoreList.appendChild(newLi);
        });
    }

}

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', initGame);


