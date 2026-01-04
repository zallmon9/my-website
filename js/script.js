// สร้างคำถาม
const table = document.getElementById("questionTable");

for (let i = 1; i <= 5; i++) {
    let row = `
    <tr>
        <td>${i}</td>
        <td class="text-start">คำถามตัวอย่างข้อที่ ${i}</td>
        <td colspan="5">
            ${[1,2,3,4,5].map(n => `
                <input type="radio" name="q${i}" value="${n}" 
                       class="rating-radio" id="q${i}_${n}">
                <label for="q${i}_${n}" 
                       class="rating-label" data-score="${n}"></label>
            `).join('')}
        </td>
    </tr>`;
    table.innerHTML += row;
}

// ส่งแบบประเมิน
function submitEval() {
    let scores = [];

    for (let i = 1; i <= 5; i++) {
        let checked = document.querySelector(`input[name="q${i}"]:checked`);
        if (!checked) {
            alert("กรุณาประเมินให้ครบทุกข้อ");
            return;
        }
        scores.push(parseInt(checked.value));
    }

    // ค่าเฉลี่ย
    let avg = (scores.reduce((a,b)=>a+b,0) / scores.length).toFixed(2);

    // แสดงผลลัพธ์
    document.getElementById("resultBox").classList.remove("d-none");

    // ล้างกราฟเก่า (กันซ้อน)
    document.getElementById("resultChart").remove();
    document.getElementById("resultBox").innerHTML +=
        `<canvas id="resultChart" height="200"></canvas>`;

    // วาดกราฟ
    new Chart(document.getElementById("resultChart"), {
        type: 'bar',
        data: {
            labels: ["ข้อ1","ข้อ2","ข้อ3","ข้อ4","ข้อ5"],
            datasets: [{
                label: 'คะแนน',
                data: scores,
                backgroundColor: [
                    "#ff5252",
                    "#ff9800",
                    "#ffeb3b",
                    "#8bc34a",
                    "#4caf50"
                ],
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, max: 5 }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });

    console.log("คะแนนเฉลี่ย =", avg);
}
