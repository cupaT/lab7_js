// JavaScript для страницы регистрации
const countries = [
    "Россия", "США", "Канада", "Германия", "Франция", "Япония", "Италия", "Китай", "Индия", "Бразилия"
];

document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('progress-bar');

    // Функция обновления прогресса
    const updateProgress = (step) => {
        const progressPercentages = {
            1: '0%',   // Первый шаг
            2: '33%',  // Второй шаг
            3: '66%',  // Третий шаг
            4: '100%'  // Финальный шаг
        };
        progressBar.style.width = progressPercentages[step] || '0%';
    };

    // Устанавливаем начальный прогресс
    updateProgress(1);

    // Заполняем список стран
    const countrySelect = document.getElementById('country');
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });

    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const nextButton = document.getElementById('next-button');

    // Проверка на заполненность всех полей
    document.getElementById('personal-data-form').addEventListener('input', () => {
        const allFieldsFilled =
            firstName.value.trim() &&
            lastName.value.trim() &&
            countrySelect.value &&
            password.value &&
            confirmPassword.value &&
            password.value === confirmPassword.value;

        nextButton.disabled = !allFieldsFilled;
    });

    // Обработка кнопки "Отмена"
    document.getElementById('cancel-button').addEventListener('click', () => {
        document.getElementById('frame_1').style.display = 'none';
        document.getElementById('welcome-section').style.display = 'flex';
        updateProgress(1); // Возвращаем прогресс на 0%
    });

    // Обработка кнопки "Далее" на первом шаге
    nextButton.addEventListener('click', () => {
        document.getElementById('frame_1').style.display = 'none';
        document.getElementById('frame_2').style.display = 'block';
        updateProgress(2); // Обновляем прогресс на 33%
    });

    const phoneNumberInput = document.getElementById('phone-number');
    const sendCodeButton = document.getElementById('send-code-button');
    const verificationCodeSection = document.getElementById('verification-code-section');
    const verificationCodeInput = document.getElementById('verification-code');
    const verifyCodeButton = document.getElementById('verify-code-button');
    const nextStepButton = document.getElementById('next-step-button');
    const backButtonFrame2 = document.getElementById('back-button-frame2');

    // Маска ввода для номера телефона
    phoneNumberInput.addEventListener('input', (e) => {
        let rawValue = phoneNumberInput.value.replace(/\D/g, ''); // Убираем все нечисловые символы

        // Если поле полностью очищено, оставляем его пустым
        if (e.inputType === 'deleteContentBackward' && rawValue.length <= 1) {
            phoneNumberInput.value = '';
            sendCodeButton.disabled = true; // Отключаем кнопку, если поле пустое
            return;
        }

        // Если пользователь начинает ввод без +7, добавляем его
        if (rawValue.startsWith('7')) {
            rawValue = rawValue.substring(1); // Убираем первую "7", чтобы избежать дублирования
        }

        // Ограничиваем длину ввода до 10 цифр (без учета +7)
        rawValue = rawValue.substring(0, 10);

        // Форматируем значение
        const formattedValue = rawValue
            .replace(/^/, '+7 (') // Добавляем префикс
            .replace(/(\d{3})(\d)/, '$1) $2') // Код
            .replace(/(\d{3})(\d)/, '$1-$2') // Первая часть номера
            .replace(/(\d{2})(\d{2})$/, '$1-$2'); // Вторая часть номера

        phoneNumberInput.value = formattedValue;

        // Проверяем, корректен ли номер
        sendCodeButton.disabled = rawValue.length !== 10; // Кнопка активна только для полного номера
    });

    // Отображение поля для ввода кода подтверждения
    sendCodeButton.addEventListener('click', () => {
        verificationCodeSection.style.display = 'block';
    });

    // Ограничение ввода только цифрами для кода
    verificationCodeInput.addEventListener('input', () => {
        verificationCodeInput.value = verificationCodeInput.value.replace(/\D/g, ''); // Убираем все нечисловые символы
        verifyCodeButton.disabled = verificationCodeInput.value.length !== 4; // Активируем кнопку только для 4 цифр
    });

    // Активация кнопки "Далее" после проверки кода
    verifyCodeButton.addEventListener('click', () => {
        verifyCodeButton.disabled = true; // Делаем кнопку "Проверить" недоступной после нажатия
        nextStepButton.disabled = false; // Активируем кнопку "Далее"
    });

    backButtonFrame2.addEventListener('click', () => {
        document.getElementById('frame_2').style.display = 'none';
        document.getElementById('frame_1').style.display = 'block';
        updateProgress(1); // Возвращаем прогресс на 0%
    });

    nextStepButton.addEventListener('click', () => {
        document.getElementById('frame_2').style.display = 'none';
        document.getElementById('frame_3').style.display = 'block';
        updateProgress(3); // Обновляем прогресс на 66%
    });

    const cardInputs = document.querySelectorAll('.card-number-inputs input');
    const cardExpiry = document.getElementById('card-expiry');
    const cardCvv = document.getElementById('card-cvv');
    const finishButton = document.getElementById('finish-button');
    const backButtonFrame3 = document.getElementById('back-button');

    // Ограничение ввода только цифр для всех полей
    const restrictToNumbers = (input) => {
        input.value = input.value.replace(/\D/g, ''); // Убираем все нечисловые символы
    };

    // Автоматический переход между полями ввода номера карты
    cardInputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            restrictToNumbers(input); // Ограничиваем ввод только цифрами
            if (input.value.length === 4 && index < cardInputs.length - 1) {
                cardInputs[index + 1].focus();
            }
        });

        // Автоматическое удаление символов и переход к предыдущему полю
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && input.value.length === 0 && index > 0) {
                cardInputs[index - 1].focus(); // Перемещаем фокус на предыдущее поле
                cardInputs[index - 1].value = cardInputs[index - 1].value.slice(0, -1); // Удаляем последний символ из предыдущего поля
                e.preventDefault(); // Предотвращаем стандартное поведение Backspace
            }
        });
    });

    // Автоматическое добавление "/" в поле "Месяц/Год" с возможностью удаления
    cardExpiry.addEventListener('input', (e) => {
        let value = cardExpiry.value.replace(/[^0-9\/]/g, ''); // Убираем все нечисловые символы, кроме "/"
        const cursorPosition = cardExpiry.selectionStart;

        // Если пользователь удаляет "/"
        if (e.inputType === 'deleteContentBackward' && cursorPosition === 3 && value.includes('/')) {
            value = value.slice(0, 2); // Удаляем "/" и оставляем только первые две цифры
        }

        // Автоматически добавляем "/" после первых двух цифр
        if (value.length > 2 && !value.includes('/')) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        }

        // Ограничиваем длину до 5 символов (формат MM/YY)
        if (value.length > 5) {
            value = value.slice(0, 5);
        }

        cardExpiry.value = value;
    });

    // Ограничение ввода только цифр для CVV
    cardCvv.addEventListener('input', () => {
        restrictToNumbers(cardCvv); // Ограничиваем ввод только цифрами
        if (cardCvv.value.length > 3) {
            // Ограничиваем длину до 3 символов
            cardCvv.value = cardCvv.value.slice(0, 3);
        }
    });

    // Проверяем заполненность всех полей
    const validateForm = () => {
        const allCardFilled = Array.from(cardInputs).every(input => input.value.length === 4);
        const expiryValid = /^\d{2}\/\d{2}$/.test(cardExpiry.value); // Проверка формата MM/YY
        const cvvValid = /^\d{3}$/.test(cardCvv.value); // Проверка длины CVV
        finishButton.disabled = !(allCardFilled && expiryValid && cvvValid);
    };

    // Валидация формы при вводе данных
    cardInputs.forEach(input => input.addEventListener('input', validateForm));
    cardExpiry.addEventListener('input', validateForm);
    cardCvv.addEventListener('input', validateForm);

    backButtonFrame3.addEventListener('click', () => {
        document.getElementById('frame_3').style.display = 'none';
        document.getElementById('frame_2').style.display = 'block';
        updateProgress(2); // Возвращаем прогресс на 33%
    });

    finishButton.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('frame_3').style.display = 'none';
        document.getElementById('frame_4').style.display = 'block';
        updateProgress(4); // Устанавливаем прогресс на 100%
    });
});