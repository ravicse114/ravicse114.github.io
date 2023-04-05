function calculateFD() {
  // Get user input
  let principal = parseFloat(document.getElementById("principal").value);
  let interestRate = parseFloat(document.getElementById("interestRate").value);
  let tenure = parseFloat(document.getElementById("tenure").value);
  
  // Calculate maturity amount
  let interest = (principal * interestRate * tenure) / 1200;
  let maturityAmount = principal + interest;
  
  // Display result
  document.getElementById("fdResult").innerHTML = `&#x20B9 ${maturityAmount.toFixed(2)}`;
}
