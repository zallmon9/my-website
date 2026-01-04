function submitEval(){
    const scores = document.querySelectorAll('.score');
    let sum = 0;
    scores.forEach(s => sum += parseInt(s.value));
    let avg = (sum / scores.length).toFixed(2);

    document.getElementById('result').classList.remove('d-none');
    document.getElementById('result').innerHTML =
        `✅ ส่งแบบประเมินเรียบร้อย <br> คะแนนเฉลี่ย: <b>${avg}</b>`;
}
