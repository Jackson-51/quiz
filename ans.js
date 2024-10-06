let corr = document.querySelector('.data');
let corr_data = JSON.parse(localStorage.getItem('correction'));
let res;

document.addEventListener('DOMContentLoaded', async () => {
    await fetch('question_bank.json')
     .then(res => res.json())
     .then(data => {
        res = data;
        console.log(res);
        log();
     });
     MathJax.typesetPromise();
 });

function log(){
    let template = '';
    res.forEach(element => {
        template += `
            <div class="each_ans">
                <p>${element.question}</p>
                <div class="correction">
                    ${(Object.keys(corr_data[element.number - 1])[0] === 'wrong')?
                        '<div class="one"><i class="fa-solid fa-plus"></i></div>':
                        '<div class="one_2"><i class="fa-solid fa-check"></i></div>'
                    }
                    <div class="two">ans: ${corr_data[element.number - 1].corr_opt}</div>
                </div>
                <span>${element.number}</span>
            </div>
        `;
    });

    corr.innerHTML = template;
}