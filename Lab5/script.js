let select = document.getElementById('select');
select.addEventListener('change', e => {
    let hiddenBox = document.querySelector('.hidden-div');
    if(e.target.value === '2') {
        hiddenBox.classList.remove('hidden-box');
    } else {
        hiddenBox.classList.add('hidden-box');
    }
})

let textInput = document.querySelector('.text-input');
textInput.addEventListener('keydown', e => {
    if (e.key == 'Enter') {
        alert('Enter was pressed');
    }
})
