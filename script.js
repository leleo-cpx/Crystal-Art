const colors = document.querySelectorAll('.color');
const button = document.getElementById('paleta-gerar');

function generateRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function isDark(color) {
    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5;
}

function generatePalette() {
    colors.forEach(colorDiv => {
        const color = generateRandomColor();
        colorDiv.style.backgroundColor = color;

        const hexCode = colorDiv.querySelector('.hex-code');
        hexCode.textContent = color;
        hexCode.style.color = isDark(color) ? 'white' : 'black';
    });
}

button.addEventListener('click', generatePalette);