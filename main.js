const curretnNumber = document.querySelector('.currentNumber');
const previousNumber = document.querySelector('.previousNumber');
const mathSign = document.querySelector('.mathSign');
const numberButtons = document.querySelectorAll('.number');
const operatorsButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const calculatorHistory = document.querySelector('.history');
const historyBtn = document.querySelector('.history-btn');

let result = '';

function displayNumbers() {
	if (this.textContent === ',' && curretnNumber.innerHTML.includes('.')) return;
	if (this.textContent === '.' && curretnNumber.innerHTML === '')
		return (curretnNumber.innerHTML = '.0');

	curretnNumber.innerHTML += this.textContent;
}

function operate () {
	if (curretnNumber.innerHTML === '' && this.textContent ==='-') {
		curretnNumber.innerHTML = '-';
		return;
	} else if (curretnNumber.innerHTML === '') {
		return;
	}

	if (mathSign.innerHTML !== '') {
		showResult();
	}

	previousNumber.innerHTML = curretnNumber.innerHTML;
	mathSign.innerHTML = this.textContent;
	curretnNumber.innerHTML = '';
}
function showResult() {
	if (previousNumber.innerHTML === '' || curretnNumber.innerHTML === '') return;

	let a = Number(curretnNumber.innerHTML);
	let b = Number(previousNumber.innerHTML);
	let operator = mathSign.innerHTML;

	switch (operator) {
		case '+':
			result = a + b;
			break;
		case '-':
			result = b - a;
			break;
		case 'x':
			result = a * b;
			break;
		case '÷':
			result = b / a;
			break;
		case '2^':
			result = b ** a;
			break;
	}

	addToHistory();
	historyBtn.classList.add('active');
	curretnNumber.innerHTML = result;
	previousNumber.innerHTML = '';
	mathSign.innerHTML = '';
}

function addToHistory() {
	const newHistoryItem = document.createElement('li');
	newHistoryItem.innerHTML = `${curretnNumber.innerHTML} ${mathSign.innerHTML} ${previousNumber.innerHTML} = ${result} `;
	newHistoryItem.classList.add('history-item');
	calculatorHistory.appendChild(newHistoryItem);
}

function clearHistory() {
    calculatorHistory.textContent = '';
    if(calculatorHistory.textContent === ''){
        historyBtn.classList.remove('active')
    }
}

function clearScreen() {
	result = '';
	curretnNumber.innerHTML = '';
	previousNumber.innerHTML = '';
	mathSign.innerHTML = '';
}

operatorsButtons.forEach((button) => button.addEventListener('click', operate));

equalsButton.addEventListener('click', showResult);

clearButton.addEventListener('click', clearScreen);

numberButtons.forEach((button) =>
	button.addEventListener('click', displayNumbers)
);

historyBtn.addEventListener('click', clearHistory);
