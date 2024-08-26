const quizData = [
    { question: "What is the atomic number of Hydrogen?", answers: ["1", "2", "3", "4"], correct: "1" },
    { question: "Which element is known as the 'King of Chemicals'?", answers: ["Sulfur", "Nitrogen", "Carbon", "Oxygen"], correct: "Carbon" },
    { question: "What is the chemical formula for water?", answers: ["H2O", "CO2", "NaCl", "H2SO4"], correct: "H2O" },
    { question: "What type of bond is formed between two nonmetals?", answers: ["Ionic", "Metallic", "Covalent", "Hydrogen"], correct: "Covalent" },
    { question: "Which element has the symbol 'Na'?", answers: ["Neon", "Nitrogen", "Sodium", "Nickel"], correct: "Sodium" },
    { question: "What is the pH value of a neutral solution?", answers: ["0", "7", "14", "5"], correct: "7" },
    { question: "Which gas is used in the production of ammonia?", answers: ["Oxygen", "Nitrogen", "Hydrogen", "Carbon Dioxide"], correct: "Nitrogen" },
    { question: "What is the common name for Sodium Chloride?", answers: ["Baking Soda", "Salt", "Sugar", "Vinegar"], correct: "Salt" },
    { question: "What is the molecular formula of methane?", answers: ["CH4", "C2H6", "CH3OH", "C6H12O6"], correct: "CH4" },
    { question: "Which law states that the volume of a gas is directly proportional to its temperature at constant pressure?", answers: ["Boyle's Law", "Charles's Law", "Avogadro's Law", "Dalton's Law"], correct: "Charles's Law" },
    { question: "What is the product of the reaction between an acid and a base?", answers: ["Salt and Water", "Acid and Base", "Hydrogen and Oxygen", "Carbon Dioxide and Water"], correct: "Salt and Water" },
    { question: "Which of the following is a noble gas?", answers: ["Oxygen", "Nitrogen", "Argon", "Hydrogen"], correct: "Argon" },
    { question: "What is the oxidation state of Oxygen in most of its compounds?", answers: ["-1", "0", "+1", "-2"], correct: "-2" },
    { question: "Which process involves the addition of oxygen or the removal of hydrogen?", answers: ["Reduction", "Oxidation", "Hydrolysis", "Condensation"], correct: "Oxidation" },
    { question: "What is the name of the process by which a solid turns into a gas without passing through the liquid phase?", answers: ["Sublimation", "Deposition", "Evaporation", "Condensation"], correct: "Sublimation" },
    { question: "What is the empirical formula of glucose (C6H12O6)?", answers: ["CH2O", "C6H12O6", "C3H6O3", "CO2"], correct: "CH2O" },
    { question: "What is the main component of natural gas?", answers: ["Methane", "Ethane", "Propane", "Butane"], correct: "Methane" },
    { question: "Which element is used as a primary component in the production of stainless steel?", answers: ["Iron", "Nickel", "Chromium", "Manganese"], correct: "Chromium" },
    { question: "What is the chemical formula for sulfuric acid?", answers: ["H2SO4", "HCl", "HNO3", "H3PO4"], correct: "H2SO4" },
    { question: "Which type of chemical reaction involves the exchange of ions between two compounds?", answers: ["Combination", "Decomposition", "Single Replacement", "Double Replacement"], correct: "Double Replacement" },
    { question: "What is the standard temperature and pressure (STP) in gas laws?", answers: ["0°C and 1 atm", "25°C and 1 atm", "0°C and 0.5 atm", "100°C and 1 atm"], correct: "0°C and 1 atm" },
    { question: "What is the name given to the solid formed in a chemical reaction that is insoluble in the reaction medium?", answers: ["Solution", "Solvent", "Precipitate", "Reagent"], correct: "Precipitate" }
];

let currentLevel = 0;
let totalCoins = 0; // Total coins accumulated across levels
let levelCoins = 0; // Coins for the current level

function loadQuestion(level) {
    const questionData = quizData[level];
    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');
    const levelDisplay = document.getElementById('level');
    const coinsDisplay = document.getElementById('coins');

    questionElement.textContent = questionData.question;
    answersElement.innerHTML = '';

    questionData.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.addEventListener('click', () => checkAnswer(answer));
        answersElement.appendChild(button);
    });

    levelDisplay.textContent = level + 1;
    coinsDisplay.textContent = totalCoins + levelCoins;
}

function showDialog(message, isCorrect) {
    const dialog = document.getElementById('dialog');
    const dialogMessage = document.getElementById('dialog-message');
    const dialogButton = document.getElementById('dialog-btn');

    dialogMessage.textContent = message;
    dialogButton.textContent = isCorrect ? 'Next Level' : 'Continue';

    dialog.style.display = 'block';

    dialogButton.onclick = () => {
        dialog.style.display = 'none';
        if (isCorrect) {
            totalCoins += levelCoins; // Add level coins to total coins
            levelCoins = 0; // Reset level coins for the next level
            nextLevel();
        } else {
            levelCoins = 0; // Reset level coins on wrong answer
            nextLevel();
        }
    };
}

function checkAnswer(answer) {
    const correctAnswer = quizData[currentLevel].correct;

    if (answer === correctAnswer) {
        levelCoins += 10; // Increase coins for the current level
        showDialog(`Correct! You now have ${totalCoins + levelCoins} coins.`, true);
    } else {
        showDialog(`Wrong answer. You have ${totalCoins} coins.`, false);
    }
}

function nextLevel() {
    currentLevel++;
    if (currentLevel < quizData.length) {
        loadQuestion(currentLevel);
    } else {
        showDialog('Congratulations! You have completed all levels.', false);
    }
}

loadQuestion(currentLevel);