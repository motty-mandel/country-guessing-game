// Initialize the game
async function initGame() {
    const scoreList = document.getElementById('score-list');
    // Retrieve user and score from localStorage
    let userData = JSON.parse(localStorage.getItem('userData'));

    if (userData && userData.length > 0) {
        // Parse scores and sort by highest first
        const parsedScores = userData.map(entry => {
            const [name, score] = entry.split(': ');
            return { name, score: parseInt(score) };
        });

        // Sort by score in descending order
        parsedScores.sort((a, b) => b.score - a.score);

        // Keep only top 5
        const topScores = parsedScores.slice(0, 5);

        // Update localStorage with sorted top scores
        userData = topScores.map(entry => `${entry.name}: ${entry.score}`);
        localStorage.setItem('userData', JSON.stringify(userData));

        // Add each score to the list
        topScores.forEach(player => {
            const newLi = document.createElement("li");
            newLi.innerHTML = `${player.name}: ${player.score}`;
            scoreList.appendChild(newLi);
        });
    }
}

function startTimer5() {
    window.location.href = 'rounds.html'
    localStorage.setItem('rounds', 5);
}

function startTimer1() {
    window.location.href = 'rounds.html'
    localStorage.setItem('rounds', 1);
}

function goBack() {
    window.location.href = "../index.html";
}

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', initGame);