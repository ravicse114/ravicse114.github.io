function calculateRD() {
  // Get user input
  let monthlyDeposit = parseFloat(document.getElementById("monthlyDeposit").value);
  let interestRate = parseFloat(document.getElementById("interestRate").value);
  let tenure = parseFloat(document.getElementById("tenure").value);
  
  // Calculate maturity amount
  let interest = (monthlyDeposit * (tenure * (tenure + 1)) * interestRate) / (2 * 12 * 100);
  let maturityAmount = monthlyDeposit * tenure + interest;
  
  // Display result
  document.getElementById("rdResult").innerHTML = `&#x20B9; ${maturityAmount.toFixed(2)}`;
}
