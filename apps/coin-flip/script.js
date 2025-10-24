// Coin Flip Script
const flipBtn = document.getElementById('flipBtn');
const resultDiv = document.getElementById('result');
const coinDiv = document.getElementById('coin');

// Animation duration in milliseconds (matches CSS animation)
const ANIMATION_DURATION_MS = 600;

function flipCoin() {
    // Disable button during animation
    flipBtn.disabled = true;
    resultDiv.textContent = '';
    
    // Add flipping animation
    coinDiv.classList.add('flipping');
    
    // Determine result (0 = Heads, 1 = Tails)
    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
    
    // Show result after animation
    setTimeout(() => {
        coinDiv.classList.remove('flipping');
        resultDiv.textContent = result;
        flipBtn.disabled = false;
    }, ANIMATION_DURATION_MS);
}

// Event listener
flipBtn.addEventListener('click', flipCoin);
