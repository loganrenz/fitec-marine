// Dice Roller Script
const rollBtn = document.getElementById('rollBtn');
const resultDiv = document.getElementById('result');
const diceDiv = document.getElementById('dice');

// Dice face emojis
const diceFaces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

// Animation constants
const ANIMATION_CYCLES = 10;
const ANIMATION_INTERVAL_MS = 100;

function rollDice() {
    // Disable button during animation
    rollBtn.disabled = true;
    
    // Animation: cycle through dice faces
    let count = 0;
    const animationInterval = setInterval(() => {
        const randomFace = Math.floor(Math.random() * 6);
        diceDiv.textContent = diceFaces[randomFace];
        count++;
        
        if (count >= ANIMATION_CYCLES) {
            clearInterval(animationInterval);
            
            // Final roll
            const result = Math.floor(Math.random() * 6) + 1;
            diceDiv.textContent = diceFaces[result - 1];
            resultDiv.textContent = `You rolled a ${result}!`;
            
            // Re-enable button
            rollBtn.disabled = false;
        }
    }, ANIMATION_INTERVAL_MS);
}

// Event listener
rollBtn.addEventListener('click', rollDice);
