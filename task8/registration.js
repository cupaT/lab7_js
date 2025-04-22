// JavaScript для страницы регистрации
const countries = [
    "Россия", "США", "Канада", "Германия", "Франция", "Япония", "Италия", "Китай", "Индия", "Бразилия"
];

document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('progress-bar');

    // Функция обновления прогресса
    const updateProgress = (step) => {
        const progressPercentages = {
            1: '0%',
            2: '33%',
            3: '66%',
            4: '100%'
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
        updateProgress(1);
    });

    // Обработка кнопки "Далее" на первом шаге
    nextButton.addEventListener('click', () => {
        document.getElementById('frame_1').style.display = 'none';
        document.getElementById('frame_2').style.display = 'block';
        updateProgress(2);
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
        let rawValue = phoneNumberInput.value.replace(/\D/g, '');

        if (e.inputType === 'deleteContentBackward' && rawValue.length <= 1) {
            phoneNumberInput.value = '';
            sendCodeButton.disabled = true;
            return;
        }

        if (rawValue.startsWith('7')) {
            rawValue = rawValue.substring(1);
        }

        rawValue = rawValue.substring(0, 10);

        const formattedValue = rawValue
            .replace(/^/, '+7 (')
            .replace(/(\d{3})(\d)/, '$1) $2')
            .replace(/(\d{3})(\d)/, '$1-$2')
            .replace(/(\d{2})(\d{2})$/, '$1-$2');

        phoneNumberInput.value = formattedValue;

        sendCodeButton.disabled = rawValue.length !== 10;
    });

    // Отображение поля для ввода кода подтверждения
    sendCodeButton.addEventListener('click', () => {
        verificationCodeSection.style.display = 'block';
    });

    // Ограничение ввода только цифрами для кода
    verificationCodeInput.addEventListener('input', () => {
        verificationCodeInput.value = verificationCodeInput.value.replace(/\D/g, '');
        verifyCodeButton.disabled = verificationCodeInput.value.length !== 4;
    });

    // Активация кнопки "Далее" после проверки кода
    verifyCodeButton.addEventListener('click', () => {
        verifyCodeButton.disabled = true;
        nextStepButton.disabled = false;
    });

    backButtonFrame2.addEventListener('click', () => {
        document.getElementById('frame_2').style.display = 'none';
        document.getElementById('frame_1').style.display = 'block';
        updateProgress(1);
    });

    nextStepButton.addEventListener('click', () => {
        document.getElementById('frame_2').style.display = 'none';
        document.getElementById('frame_3').style.display = 'block';
        updateProgress(3);
    });

    const cardInputs = document.querySelectorAll('.card-number-inputs input');
    const cardExpiry = document.getElementById('card-expiry');
    const cardCvv = document.getElementById('card-cvv');
    const finishButton = document.getElementById('finish-button');
    const backButtonFrame3 = document.getElementById('back-button');

    // Ограничение ввода только цифр для всех полей
    const restrictToNumbers = (input) => {
        input.value = input.value.replace(/\D/g, '');
    };

    // Автоматический переход между полями ввода номера карты
    cardInputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            restrictToNumbers(input);
            if (input.value.length === 4 && index < cardInputs.length - 1) {
                cardInputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && input.value.length === 0 && index > 0) {
                cardInputs[index - 1].focus();
                cardInputs[index - 1].value = cardInputs[index - 1].value.slice(0, -1);
                e.preventDefault();
            }
        });
    });

    // Автоматическое добавление "/" в поле "Месяц/Год"
    cardExpiry.addEventListener('input', (e) => {
        let value = cardExpiry.value.replace(/[^0-9\/]/g, '');
        const cursorPosition = cardExpiry.selectionStart;

        if (e.inputType === 'deleteContentBackward' && cursorPosition === 3 && value.includes('/')) {
            value = value.slice(0, 2);
        }

        if (value.length > 2 && !value.includes('/')) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        }

        if (value.length > 5) {
            value = value.slice(0, 5);
        }

        cardExpiry.value = value;
    });

    // Ограничение ввода только цифр для CVV
    cardCvv.addEventListener('input', () => {
        restrictToNumbers(cardCvv);
        if (cardCvv.value.length > 3) {
            cardCvv.value = cardCvv.value.slice(0, 3);
        }
    });

    // Проверяем заполненность всех полей
    const validateForm = () => {
        const allCardFilled = Array.from(cardInputs).every(input => input.value.length === 4);
        const expiryValid = /^\d{2}\/\d{2}$/.test(cardExpiry.value);
        const cvvValid = /^\d{3}$/.test(cardCvv.value);
        finishButton.disabled = !(allCardFilled && expiryValid && cvvValid);
    };

    // Валидация формы при вводе данных
    cardInputs.forEach(input => input.addEventListener('input', validateForm));
    cardExpiry.addEventListener('input', validateForm);
    cardCvv.addEventListener('input', validateForm);

    backButtonFrame3.addEventListener('click', () => {
        document.getElementById('frame_3').style.display = 'none';
        document.getElementById('frame_2').style.display = 'block';
        updateProgress(2);
    });

    finishButton.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('frame_3').style.display = 'none';
        document.getElementById('frame_4').style.display = 'block';
        updateProgress(4);
    });
});