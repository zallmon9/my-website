const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxxxxxxx/exec";

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

const table = document.getElementById("https://script.google.com/macros/s/AKfycbzwR8wrv6o-IRyq8AtWkEXHFQOnQt1T-PZ7dmXJg0mcL4TbpO5J0yf3DhiTVEXyGHhoWQ/exec");

questions.forEach((q,i)=>{
  table.innerHTML += `
  <tr>
    <td>${i+1}</td>
    <td class="text-start">${q}</td>
    <td>
      ${[1,2,3,4,5].map(n=>`
        <input type="radio" name="q${i}" value="${n}">
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

  fetch(SCRIPT_URL,{
    method:"POST",
    body: JSON.stringify({
      teacher,
      scores,
      comment: document.getElementById("comment").value
    })
  })
  .then(()=>alert("✅ บันทึกข้อมูลเรียบร้อย"))
  .catch(()=>alert("❌ บันทึกไม่สำเร็จ"));
}
