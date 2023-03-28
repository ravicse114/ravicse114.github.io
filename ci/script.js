function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}
function calculate() {
  // Get the input values
  const principal = parseFloat(document.getElementById("principal").value);
  let rate = parseFloat(document.getElementById("rate").value);
  const rateType = document.getElementById("rateType").value;
  const frequency = document.getElementById("frequency").value;
  const startDate = new Date(document.getElementById("startDate").value);
  const endDate = new Date(document.getElementById("endDate").value);

  // Calculate the number of compounding periods
  if (rateType === "monthly") {
	  rate = rate * 12;
  }
  // Calculate number of days and months
  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
  const diffDays = Math.round(Math.abs((endDate - startDate) / oneDay));
  const totalYears = Math.round(Math.floor(diffDays/365));
  let remainingDays = diffDays - totalYears*365;
  const totalMonths = Math.round(Math.floor(remainingDays/30));
  remainingDays = remainingDays - totalMonths*30;
  // Display result

  // Calculate number of periods and period length
  let result = "";
  const resultDiv = document.getElementById("result");
  if (Number.isNaN(principal)) {
	result = "मूलधन जरुरी है | कृपया उचित आंकड़ा भरें | ";
  } else if (Number.isNaN(rate)) {
	result = "ब्याज दर जरुरी है | कृपया उचित आंकड़ा भरें | ";
  } else if (!isValidDate(startDate)) {
	result = "प्रारम्भ दिनांक जरुरी है | कृपया उचित आंकड़ा भरें | ";
  } else if (!isValidDate(endDate)) {
	result = "अंतिम दिनांक जरुरी है | कृपया उचित आंकड़ा भरें | ";
  } else if (frequency === "annually") {
	result = result + "कुल समय  :: " + totalYears + " वर्ष " + totalMonths + " महीना " +remainingDays + " दिन <br>";
	result = result + "====================================";
	let cumAmount = principal, interest = 0;
    for(let i=0;i<totalYears;i++) {
		interest = Math.floor((cumAmount*rate)/100);
		cumAmount = cumAmount+interest;
		result = result + "<br>" + (i+1) + " वर्ष बाद , ब्याज = " + interest + ", कुल राशि  = " + cumAmount;
	}
	let newRemainingDays = totalMonths*30+remainingDays;
	interest = Math.floor((cumAmount*rate*newRemainingDays)/36500);
	cumAmount = cumAmount+interest;
	result = result + "<br> बचे हुए  " + newRemainingDays + " दिन का ब्याज  = " + interest + ", कुल राशि  = " + cumAmount;
  } else if (frequency === "monthly") {
    let cumAmount = principal, interest = 0;
	let newTotalMonths = totalYears * 12 + totalMonths;
	result = result + "कुल समय  :: " + newTotalMonths + " महीना " + remainingDays + " दिन <br>";
	result = result + "====================================";
    for(let i=0;i<newTotalMonths;i++) {
		interest = Math.floor((cumAmount*rate)/1200);
		cumAmount = cumAmount+interest;
		result = result + "<br>" + (i+1) + " माह बाद , ब्याज = " + interest + ", कुल राशि  = " + cumAmount;
	}
	interest = Math.floor((cumAmount*rate*remainingDays)/36500);
	cumAmount = cumAmount+interest;
	result = result + "<br> बचे हुए  " + remainingDays + " दिन का ब्याज  = " + interest + ", कुल राशि  = " + cumAmount;
  }
  resultDiv.innerHTML = result;
}