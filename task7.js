document.getElementById('applyButton').addEventListener('click', () => {
    const line = document.getElementById('line');

    const alignment = document.querySelector('input[name="alignment"]:checked').value;
    line.style.marginLeft = alignment === 'left' ? '0' : alignment === 'center' ? 'auto' : '';
    line.style.marginRight = alignment === 'right' ? '0' : alignment === 'center' ? 'auto' : '';

    const size = document.getElementById('size').value;
    const width = document.getElementById('width').value;
    line.style.height = `${size}px`;
    line.style.width = `${width}px`;

    const color = document.getElementById('color').value;
    line.style.backgroundColor = color;
});