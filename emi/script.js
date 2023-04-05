function calculateEMI() {
	var loanAmount = parseFloat(document.getElementById("loanAmount").value);
	var interestRate = parseFloat(document.getElementById("interestRate").value);
	var loanTerm = parseFloat(document.getElementById("loanTerm").value);

	const monthlyInterestRate = (interestRate / 100) / 12;
	const numPayments = loanTerm;
	const monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numPayments));
	const totalPayment = monthlyPayment * numPayments;
	const totalInterest = totalPayment - loanAmount;

	document.getElementById("emiResult").innerHTML = `
		<p>Monthly Payment: &#x20B9;${monthlyPayment.toFixed(2)}</p>
		<p>Total Payment: &#x20B9;${totalPayment.toFixed(2)}</p>
		<p>Total Interest: &#x20B9;${totalInterest.toFixed(2)}</p>`;
}

