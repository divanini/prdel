function calculateMood() {
    const form = document.getElementById('moodSurvey');
    const moodText = document.getElementById('moodText');
    const moodImage = document.getElementById('moodImage');

    let moodCounts = {
        joyful: 0,
        neutral: 0,
        inspired: 0,
        bored: 0,
        anxious: 0,
        calm: 0,
        blue: 0,
        yellow: 0,
        red: 0,
        green: 0,
        purple: 0
    };

    // Обработка ответов на вопросы
    for (let i = 1; i <= 6; i++) {
        const questionName = `question${i}`;
        const selectedOption = form[questionName].value;

        if (selectedOption) {
            moodCounts[selectedOption]++;
        }
    }

    // Проверка на заполнение всех вопросов
    let allFilled = true;
    for (let i = 1; i <= 6; i++) {
        const questionName = `question${i}`;
        if (!form[questionName].value) {
            allFilled = false;
            break;
        }
    }

    if (!allFilled) {
        moodText.textContent = "Пожалуйста, ответьте на все вопросы.";
        moodImage.style.display = 'none'; // Скрываем изображение
        return; // Прерываем выполнение функции
    }


    // Определение эмоции
    let moodEmotion = '';
    
    if (moodCounts.joyful > Math.max(moodCounts.inspired, moodCounts.bored, moodCounts.anxious, moodCounts.calm)) {
        moodEmotion = 'Радостный';
    } else if (moodCounts.inspired > Math.max(moodCounts.joyful, moodCounts.bored)) {
        moodEmotion = 'Вдохновлённый';
    } else if (moodCounts.bored > Math.max(moodCounts.joyful, moodCounts.inspired)) {
        moodEmotion = 'Скучный';
    } else if (moodCounts.anxious > Math.max(moodCounts.joyful, moodCounts.bored)) {
        moodEmotion = 'Тревожный';
    } else if (moodCounts.calm > Math.max(moodCounts.joyful, moodCounts.bored)) {
        moodEmotion = 'Умиротворённый';
    } else {
        moodEmotion = 'Нейтральный';
    }

    // Определение цвета настроения
    let moodColor = '';

    if (moodCounts.blue > Math.max(moodCounts.red, moodCounts.green, moodCounts.yellow)) {
        moodColor = 'blue';
    } else if (moodCounts.red > Math.max(moodCounts.blue, moodCounts.green, moodCounts.yellow)) {
        moodColor = 'red';
    } else if (moodCounts.green > Math.max(moodCounts.red, moodCounts.blue, moodCounts.yellow)) {
        moodColor = 'green';
    } else {
        moodColor = 'yellow'; // Если нет явного предпочтения
    }

    // Вывод текста и изображения на основе эмоции и цвета
    let imageUrl = '';
    let textMessage = '';

    switch (moodEmotion) {

        case 'Радостный':
            imageUrl = 'images/image_joyful.jpg'; 
            textMessage = 'милый и пушистый: сегодня ты воплощение уюта и тепла! твое настроение наполнено добротой и легкостью. ты стремишься создавать вокруг себя комфорт и радовать окружающих своей улыбкой.';
            break;

        case 'Вдохновлённый':
            imageUrl = 'images/image_inspired.jpg';
            textMessage = 'премиальный и роскошный: сегодня ты чувствуешь себя на высоте! все, чего ты касаешься, превращается в успех.';
            break;

        case 'Скучный':
            imageUrl = 'images/image_bored.jpg';
            textMessage = 'удобный и практичный: ты всегда думаешь о комфорте и удобстве. сегодня твой выбор - функциональность и надежность.';
            break;

        case 'Тревожный':
            imageUrl = 'images/image_anxious.jpg';
            textMessage = 'уставший и грустный: сегодня ты чувствуешь себя немного вымотанным, словно весь мир решил проверить свою стойкость. энергия на исходе, и даже любимые дела даются с трудом';
            break;

        case 'Умиротворённый':
            imageUrl = 'images/image_calm.jpg';
            textMessage = 'эко-хартходдер: сегодня твоя энергия направлена на заботу о природе и осознанное потребление. ты ценишь стильные вещи, которые помогают сделать этот мир лучше';
            break;
            
        // default:
        //     imageUrl = 'images/image_neutral.jpg'; 
        //     textMessage = 'Вы выбрали нейтральный картхолдер! Он подходит для любого настроения.';
        //     break;
    }

    // Вывод результата
    if (imageUrl) {
      moodText.textContent = textMessage; // Устанавливаем текстовое сообщение
      moodImage.src = imageUrl;           // Устанавливаем источник изображения
      moodImage.style.display = 'block';   // Показываем изображение
    } else {
      moodText.textContent = "Не удалось определить настроение.";
      moodImage.style.display = 'none';   // Скрываем изображение в случае ошибки
    }
}
