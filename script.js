window.onload = () => {
    const inputs = Array(3).fill(0).map((v, i) => document.getElementById(`input${i + 1}`));
    const bars = Array(3).fill(0).map((v, i) => document.getElementById(`bar${i + 1}`));
    const message = document.getElementById('message');
    const closeButton = document.getElementById('close');

    const changeHandler = e => {
        const val = Math.floor(Math.max(Math.min(e.currentTarget.valueAsNumber, 100), 0));
        e.currentTarget.valueAsNumber = val;
        if (inputs.reduce((acc, v) => acc + v.valueAsNumber, 0) === 100) {
            bars.forEach((v, i) => {
                v.style.width = inputs[i].valueAsNumber + '%';
            })
            message.innerText = ''
            e.currentTarget.blur();
        } else {
            message.innerText = '비율을 100%로 맞춰주세요.'
        }
    }

    inputs.forEach(v => v.addEventListener('change', changeHandler))
    window.addEventListener('resize', e => {
        message.innerText = `너비: ${window.innerWidth}px`
    })

    closeButton.addEventListener('click', e => {
        window.close();
    })
}