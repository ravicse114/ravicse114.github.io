const form = document.querySelector('form');
const resultDiv = document.querySelector('#result');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const loanAmount = parseFloat(document.querySelector('#loan-amount').value);
  const interestRate = parseFloat(document.querySelector('#interest-rate').value);
  const loanTerm = parseFloat(document.querySelector('#loan-term').value);

  if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTerm)) {
    resultDiv.innerHTML = '<p>Please enter valid numbers for all fields.</p>';
    return;
  }

  const monthlyInterestRate = (interestRate / 100) / 12;
  const numPayments = loanTerm;
  const monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numPayments));
  const totalPayment = monthlyPayment * numPayments;
  const totalInterest = totalPayment - loanAmount;

  resultDiv.innerHTML = `
    <p>Monthly Payment: &#x20B9;${monthlyPayment.toFixed(2)}</p>
    <p>Total Payment: &#x20B9;${totalPayment.toFixed(2)}</p>
    <p>Total Interest: &#x20B9;${totalInterest.toFixed(2)}</p>
  `;
});
