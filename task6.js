document.getElementById('calculateButton').addEventListener('click', () => {
    const january = parseFloat(document.getElementById('january').value) || 0;
    const february = parseFloat(document.getElementById('february').value) || 0;
    const march = parseFloat(document.getElementById('march').value) || 0;
    const april = parseFloat(document.getElementById('april').value) || 0;
    const may = parseFloat(document.getElementById('may').value) || 0;
    const june = parseFloat(document.getElementById('june').value) || 0;

    const totalSalary = january + february + march + april + may + june;
    const averageSalary = totalSalary / 6;

    document.getElementById('averageSalary').value = averageSalary.toFixed(2);
});