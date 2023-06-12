window.onload = function() {
    calculatePremiums();

    const payrolls = document.getElementsByClassName("payroll");
    for (let i = 0; i < payrolls.length; i++) {
        payrolls[i].addEventListener("input", calculatePremiums);
    }

    document.getElementById("experienceMod").addEventListener("input", calculatePremiums);
    document.getElementById("scheduleModifier").addEventListener("input", calculatePremiums);
    document.getElementById("premiumDiscount").addEventListener("input", calculatePremiums);
    document.getElementById("assumedDividend").addEventListener("input", calculatePremiums);
}

function calculatePremiums() {
    const rates = [5.6192, 4.4288, 0.128];
    let totalPayroll = 0;
    let totalPremium = 0;

    for (let i = 1; i <= 3; i++) {
        const payrollInput = document.querySelector(`#line${i} .payroll`);
        const payroll = Number(payrollInput.value);
        totalPayroll += payroll;

        let premium = Math.round((payroll / 100) * rates[i - 1]);
        totalPremium += premium;

        const premiumDiv = document.querySelector(`#line${i} .premium`);
        premiumDiv.textContent = formatCurrency(premium);
    }

    document.getElementById("totalPayroll").textContent = formatCurrency(totalPayroll);
    document.getElementById("totalPremium").textContent = formatCurrency(totalPremium);

    let waiver = parseFloat(document.getElementById("waiverValue").innerText) / 100; // convert the percentage to a decimal

    const experienceMod = Number(document.getElementById("experienceMod").value);
    const scheduleModifier = Number(document.getElementById("scheduleModifier").value);
    const premiumDiscount = Number(document.getElementById("premiumDiscount").value);
    const assumedDividend = Number(document.getElementById("assumedDividend").value);

    const waiverPremium = totalPremium * waiver;
    document.getElementById("waiverPremium").textContent = formatCurrency(waiverPremium);

    const modifiedPremium = (totalPremium + waiverPremium) * experienceMod;
    document.getElementById("totalModifiedPremium").textContent = formatCurrency(modifiedPremium);

    const scheduleModifiedPremium = modifiedPremium * scheduleModifier;
    document.getElementById("scheduleModifiedPremium").textContent = formatCurrency(scheduleModifiedPremium);

    const discountedPremium = scheduleModifiedPremium * premiumDiscount;
    document.getElementById("discountedPremium").textContent = formatCurrency(discountedPremium);

    const expenseConstant = 200;
    document.getElementById("expenseConstant").textContent = formatCurrency(expenseConstant);

    const terrorismPremium = totalPayroll * 0.05;
    document.getElementById("terrorismPremium").textContent = formatCurrency(terrorismPremium);

    const stateAssessmentPremium = (discountedPremium + expenseConstant + terrorismPremium) * 0.102;
    document.getElementById("stateAssessmentPremium").textContent = formatCurrency(stateAssessmentPremium);

    const totalIncludingStateAssessment = discountedPremium + expenseConstant + terrorismPremium + stateAssessmentPremium;
    document.getElementById("totalIncludingStateAssessment").textContent = formatCurrency(totalIncludingStateAssessment);

    const dividend = discountedPremium * assumedDividend;
    document.getElementById("dividend").textContent = formatCurrency(dividend);

    const totalAfterDividend = totalIncludingStateAssessment - dividend;
    document.getElementById("totalAfterDividend").textContent = formatCurrency(totalAfterDividend);

    const lovellFee = modifiedPremium * 0.10;
    document.getElementById("lovellFee").textContent = formatCurrency(lovellFee);

    const agencyCommission = discountedPremium * 0.10;
    document.getElementById("agencyCommission").textContent = formatCurrency(agencyCommission);

    const finalTotal = totalAfterDividend + lovellFee + agencyCommission;
    document.getElementById("finalTotal").textContent = formatCurrency(finalTotal);
}

function formatCurrency(number) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
}