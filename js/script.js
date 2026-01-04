function submitEval(){
    const scores = document.querySelectorAll('.score');
    let sum = 0;
    scores.forEach(s => sum += parseInt(s.value));
    let avg = (sum / scores.length).toFixed(2);

    document.getElementById('result').classList.remove('d-none');
    document.getElementById('result').innerHTML =
        `✅ ส่งแบบประเมินเรียบร้อย <br> คะแนนเฉลี่ย: <b>${avg}</b>`;
}
// สร้างคำถาม
const table = document.getElementById("questionTable");
for(let i=1;i<=5;i++){
    let row = `
    <tr>
        <td>${i}</td>
        <td class="text-start">คำถามตัวอย่างข้อที่ ${i}</td>
        <td colspan="5">
            ${[1,2,3,4,5].map(n=>`
                <input type="radio" name="q${i}" value="${n}" class="rating-radio" id="q${i}_${n}">
                <label for="q${i}_${n}" class="rating-label" data-score="${n}"></label>
            `).join('')}
        </td>
    </tr>`;
    table.innerHTML += row;
}

function submitEval(){
    let scores = [];
    for(let i=1;i<=5;i++){
        let checked = document.querySelector(`input[name="q${i}"]:checked`);
        if(!checked){ alert("กรุณาประเมินให้ครบทุกข้อ"); return; }
        scores.push(parseInt(checked.value));
    }

    let avg = scores.reduce((a,b)=>a+b)/scores.length;

    document.getElementById("resultBox").classList.remove("d-none");

    new Chart(document.getElementById("resultChart"),{
        type:'bar',
        data:{
            labels:["ข้อ1","ข้อ2","ข้อ3","ข้อ4","ข้อ5"],
            datasets:[{
                data:scores,
                backgroundColor:[
                    "#ff5252","#ff9800","#ffeb3b","#8bc34a","#4caf50"
                ]
            }]
        },
        options:{
            responsive:true,
            maintainAspectRatio:false,
            scales:{ y:{ beginAtZero:true, max:5 } },
            plugins:{ legend:{ display:false } }
        }
    });
}
