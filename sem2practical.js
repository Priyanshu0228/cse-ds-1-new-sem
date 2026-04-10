function calculate() {
    let s1 = parseFloat(document.getElementById('sub1').value);
    let s2 = parseFloat(document.getElementById('sub2').value);
    let s3 = parseFloat(document.getElementById('sub3').value);
    let s4 = parseFloat(document.getElementById('sub4').value);
    let s5 = parseFloat(document.getElementById('sub5').value);

    
    if (isNaN(s1) || isNaN(s2) || isNaN(s3) || isNaN(s4) || isNaN(s5)) {
        alert("Please enter marks for all subjects");
        return;
    }

    let total = s1 + s2 + s3 + s4 + s5;
    let percentage = (total / 500) * 100;
    let grade = "";
    let resultClass = "pass";

    
    if (s1 < 35 || s2 < 35 || s3 < 35 || s4 < 35 || s5 < 35) {
        grade = "Fail (Failed in one or more subjects)";
        resultClass = "fail";
    } else if (percentage >= 75) {
        grade = "Distinction";
    } else if (percentage >= 60) {
        grade = "First Class";
    } else if (percentage >= 50) {
        grade = "Second Class";
    } else if (percentage >= 35) {
        grade = "Pass Class";
    } else {
        grade = "Fail";
        resultClass = "fail";
    }

    
    document.getElementById('result').innerHTML = `
        <p>Total Marks: ${total} / 500</p>
        <p>Percentage: ${percentage.toFixed(2)}%</p>
        <p class="${resultClass}">Result: ${grade}</p>
    `;
}