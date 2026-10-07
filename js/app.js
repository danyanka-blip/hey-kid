let currentInput = '';
function openCalculator() { document.getElementById('calc-window').classList.remove('hidden'); }
function closeCalculator() { document.getElementById('calc-window').classList.add('hidden'); }

function pressKey(key) {
    const display = document.getElementById('calc-display');
    if (key === 'C') {
        currentInput = '';
        display.value = '0';
    } else if (key === '=') {
        try {
            // Whimsical Douglas Adams Easter Egg interceptor
            if (currentInput === '6*7' || currentInput === '40+2') {
                display.value = '42 (The Meaning of Life)';
                currentInput = '42';
                return;
            }
            // Input only ever holds digits and + - * / (from the buttons), so evaluating it is safe
            let result = Function('"use strict"; return (' + currentInput + ')')();
            if (!isFinite(result)) throw new Error('bad result');
            display.value = result;
            currentInput = String(result);
        } catch {
            display.value = 'Error';
            currentInput = '';
        }
    } else {
        currentInput += key;
        display.value = currentInput;
    }
}

// Drag windows by their title bar, kept inside the screen
document.querySelectorAll('.window').forEach(win => {
    const bar = win.querySelector('.window-titlebar');
    bar.addEventListener('mousedown', e => {
        if (e.target.classList.contains('close-box')) return;
        const desk = document.getElementById('desktop');
        const startX = e.clientX - win.offsetLeft;
        const startY = e.clientY - win.offsetTop;
        function move(ev) {
            const x = Math.max(0, Math.min(ev.clientX - startX, desk.clientWidth - win.offsetWidth));
            const y = Math.max(20, Math.min(ev.clientY - startY, desk.clientHeight - 20));
            win.style.left = x + 'px';
            win.style.top = y + 'px';
        }
        function up() {
            document.removeEventListener('mousemove', move);
            document.removeEventListener('mouseup', up);
        }
        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', up);
    });
});
