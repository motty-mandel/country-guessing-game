// Initialize the game
async function initGame() {
    const scoreList = document.getElementById('score-list');
    // Retrieve user and score from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
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


function startTimer5() {
    window.location.href = '/rounds.html'
    const rounds = document.getElementById('rounds5').value;
    localStorage.removeItem(rounds);
    localStorage.setItem('rounds', rounds);
}

function startTimer10() {
    window.location.href = '/rounds.html'
    const rounds = document.getElementById('rounds10').value;
    localStorage.removeItem(rounds);
    localStorage.setItem('rounds', rounds);
}

function startTimer15() {
    window.location.href = '/rounds.html'
    const rounds = document.getElementById('rounds15').value;
    localStorage.removeItem(rounds);
    localStorage.setItem('rounds', rounds);
}


// Start the game when the page loads
document.addEventListener('DOMContentLoaded', initGame);