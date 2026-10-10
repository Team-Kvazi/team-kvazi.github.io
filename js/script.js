document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('calcForm');
  const resultContainer = document.getElementById('result');
  const resultValue = document.getElementById('resultValue');
  const resultComment = document.getElementById('resultComment');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Получаем значения из инпутов
    const academic = parseFloat(document.getElementById('academic').value) || 0;
    const teachers = parseFloat(document.getElementById('teachers').value) || 0;
    const interest = parseFloat(document.getElementById('interest').value) || 0;

    // Считаем коэффициент Квазибуплона (среднее арифметическое)
    const kvazibuplon = Math.round((academic + teachers + interest) / 3);

    // Выводим цифровой результат в тег с ярким цветом accent-light из вашего CSS
    resultValue.innerHTML = `<span class="accent">${kvazibuplon}</span>`;

    // Подбираем напутствие и подходящие эмодзи под цветовую гамму интерфейса
    let comment = '';
    if (kvazibuplon >= 85) {
      comment = '🌟 Великолепно! Вы в абсолютной гармонии со своей учебой, преподавателями и будущей профессией.';
    } else if (kvazibuplon >= 65) {
      comment = '📈 Хороший уровень! Вы уверенно стоите на ногах, но всегда есть куда расти.';
    } else if (kvazibuplon >= 40) {
      comment = '⚖️ Средний баланс. Попробуйте подтянуть те сферы, где оценки вышли самыми низкими.';
    } else {
      comment = '🔍 Стоит задуматься. Возможно, выбранное направление не совсем то, что вам искренне интересно.';
    }

    resultComment.textContent = comment;

    // Отображаем блок с результатом (убираем атрибут hidden)
    resultContainer.removeAttribute('hidden');
    
    // Мягкий скролл к блоку ответа для мобильных устройств
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
});
