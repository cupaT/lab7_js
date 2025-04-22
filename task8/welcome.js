// JavaScript для страницы "Добро пожаловать"
document.getElementById('start-registration').addEventListener('click', () => {
    // Скрываем страницу "Добро пожаловать"
    document.getElementById('welcome-section').style.display = 'none';

    // Отображаем лоадер
    document.getElementById('loader-section').style.display = 'flex';

    // Запускаем лоадинг процесс
    const loaderScript = document.createElement('script');
    loaderScript.src = 'loader.js';
    document.body.appendChild(loaderScript);
});