
let students = [];
let chartInstance = null;


fetch("students.json")
    .then(response => response.json())
    .then(data => {
        students = data;
    });




document.getElementById("analyzeBtn")
    .addEventListener("click", analyzePerformance);



function analyzePerformance() {

    const subject = document.getElementById("subject").value;

    const sectionTotal = { A: 0, B: 0, C: 0, D: 0 };
    const sectionCount = { A: 0, B: 0, C: 0, D: 0 };

    students.forEach(student => {
        if (student.subject === subject) {
            sectionTotal[student.section] += student.marks;
            sectionCount[student.section]++;
        }
    });

    const labels = ["A", "B", "C", "D"];
    const averages = [];

    let bestSection = "";
    let bestAverage = 0;

    labels.forEach(sec => {
        const avg = sectionCount[sec]
            ? sectionTotal[sec] / sectionCount[sec]
            : 0;

        averages.push(avg);

        if (avg > bestAverage) {
            bestAverage = avg;
            bestSection = sec;
        }
    });

    displayResult(subject, bestSection, bestAverage);
    drawChart(labels, averages, subject);
}



function displayResult(subject, section, avg) {
    document.getElementById("result").innerText =
        `Best Section in ${subject}: Section ${section}
         (Average: ${avg.toFixed(2)})`;
}




function drawChart(labels, data, subject) {

    const ctx = document.getElementById("chart").getContext("2d");

    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: `Average Marks in ${subject}`,
                data: data,
                backgroundColor: "rgba(54,162,235,0.7)"
            }]
        }
    });
}
