// Coin Flip Script
const flipBtn = document.getElementById('flipBtn');
const resultDiv = document.getElementById('result');
const coinDiv = document.getElementById('coin');

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
    }, 600);
}

// Event listener
flipBtn.addEventListener('click', flipCoin);
