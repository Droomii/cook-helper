window.onload = () => {
    const inputs = Array(3).fill(0).map((v, i) => document.getElementById(`input${i + 1}`));
    const bars = Array(3).fill(0).map((v, i) => document.getElementById(`bar${i + 1}`));
    const message = document.getElementById('message');
    const closeButton = document.getElementById('close');

    const changeHandler = e => {
        e.currentTarget.valueAsNumber = Math.floor(Math.min(e.currentTarget.valueAsNumber, 100));
        const total = inputs.reduce((acc, v) => acc + v.valueAsNumber, 0);

        bars.forEach((v, i) => {
            const val = Math.round((inputs[i].valueAsNumber / total) * 100)
            v.style.width = val + '%';
        })
        e.currentTarget.blur();
    }

    inputs.forEach(v => v.addEventListener('change', changeHandler))
    window.addEventListener('resize', e => {
        message.innerText = `너비: ${window.innerWidth}px`
    })

    closeButton.addEventListener('click', e => {
        window.close();
    })
}