// JavaScript для функционирования лоадера
document.addEventListener('DOMContentLoaded', () => {
    const progressFill = document.querySelector('.progress-fill');
    const loaderSection = document.getElementById('loader-section');
    const mainContent = document.getElementById('main-content');
    const frame1 = document.getElementById('frame_1'); // Первая секция в main

    // Добавляем слушатель события окончания анимации
    progressFill.addEventListener('animationend', () => {
        // Скрываем лоадер
        loaderSection.style.display = 'none';

        // Показываем основной контент и секцию frame_1
        mainContent.style.display = 'block';
        frame1.style.display = 'block'; // Убедимся, что виден frame_1
    });

    // Запускаем CSS-анимацию заполнения
    progressFill.style.animation = 'fillProgress 3s linear forwards';
});