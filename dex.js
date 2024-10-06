let input = document.querySelector('label input');
let btn = document.querySelector('.inp a');

btn.addEventListener('click', () => {
    (input.value.length === 0)? display() : process() ;
});

function display() {
    document.querySelector('label p').style.display = 'block';
}

function process() {
    localStorage.setItem('username', JSON.stringify(input.value.toLowerCase()));
    document.querySelector('label p').style.display = 'none';
    input.value = '';
    
}