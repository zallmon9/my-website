const SCRIPT_URL = "ใส่_URL_จาก_Google_Apps_Script_ตรงนี้";

const questions = [
    "อาจารย์เตรียมการสอนเป็นอย่างดี",
    "อธิบายเนื้อหาเข้าใจง่าย",
    "เปิดโอกาสให้นักศึกษาซักถาม",
    "ใช้สื่อการสอนเหมาะสม",
    "สร้างบรรยากาศการเรียนที่ดี",
    "ตรงต่อเวลา",
    "มีความเป็นธรรมในการให้คะแนน",
    "เชื่อมโยงเนื้อหากับการใช้งานจริง",
    "ให้คำแนะนำที่เป็นประโยชน์",
    "เอาใจใส่นักศึกษา"
];

const table = document.getElementById("questionTable");

questions.forEach((q,i)=>{
    table.innerHTML += `
    <tr>
        <td>${i+1}</td>
        <td class="text-start">${q}</td>
        <td>
            ${[1,2,3,4,5].map(n=>`
                <input type="radio" name="q${i}" value="${n}" class="rating-radio" id="q${i}_${n}">
                <label for="q${i}_${n}" class="rating-label">${n}</label>
            `).join("")}
        </td>
    </tr>`;
});

function submitEval(){
    const teacher = document.getElementById("teacher").value;
    if(!teacher){ alert("กรุณาเลือกอาจารย์"); return; }

    let scores=[];
    for(let i=0;i<questions.length;i++){
        let c=document.querySelector(`input[name="q${i}"]:checked`);
        if(!c){ alert("กรุณาประเมินให้ครบทุกข้อ"); return; }
        scores.push(+c.value);
    }

    const payload = {
        teacher: teacher,
        scores: scores,
        comment: document.getElementById("comment").value
    };

    fetch(SCRIPT_URL,{
        method:"POST",
        body: JSON.stringify(payload)
    });

    document.getElementById("resultBox").classList.remove("d-none");

    new Chart(document.getElementById("resultChart"),{
        type:'bar',
        data:{
            labels: questions.map((_,i)=>`ข้อ ${i+1}`),
            datasets:[{
                data:scores,
                backgroundColor:[
                    "#ff5252","#ff9800","#ffeb3b","#8bc34a","#4caf50",
                    "#4caf50","#8bc34a","#ffeb3b","#ff9800","#ff5252"
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

    alert("✅ ส่งแบบประเมินเรียบร้อย");
}
