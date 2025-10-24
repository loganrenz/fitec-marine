// Dice Roller Script
const rollBtn = document.getElementById('rollBtn');
const resultDiv = document.getElementById('result');
const diceDiv = document.getElementById('dice');

// Dice face emojis
const diceFaces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

function rollDice() {
    // Disable button during animation
    rollBtn.disabled = true;
    
    // Animation: cycle through dice faces
    let count = 0;
    const animationInterval = setInterval(() => {
        const randomFace = Math.floor(Math.random() * 6);
        diceDiv.textContent = diceFaces[randomFace];
        count++;
        
        if (count >= 10) {
            clearInterval(animationInterval);
            
            // Final roll
            const result = Math.floor(Math.random() * 6) + 1;
            diceDiv.textContent = diceFaces[result - 1];
            resultDiv.textContent = `You rolled a ${result}!`;
            
            // Re-enable button
            rollBtn.disabled = false;
        }
    }, 100);
}

// Event listener
rollBtn.addEventListener('click', rollDice);
