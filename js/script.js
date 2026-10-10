document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('calcForm');
  const teacherSelect = document.getElementById('teacherSelect');
  const resultContainer = document.getElementById('result');
  const resultValue = document.getElementById('resultValue');
  const resultComment = document.getElementById('resultComment');

  // База преподавателей и весовые коэффициенты для факторов:
  // academic (успеваемость), teachers (отношение), interest (заинтересованность)
  const teacherCoefficients = {
    default: { academic: 0.333, teachers: 0.333, interest: 0.334 },
    ivanov:  { academic: 0.20,  teachers: 0.20,  interest: 0.60 },  // Главное — огонь в глазах
    petrov:  { academic: 0.60,  teachers: 0.10,  interest: 0.30 },  // Главное — сухие знания и оценки
    sidorov: { academic: 0.15,  teachers: 0.60,  interest: 0.25 }   // Главное — посещаемость и хорошие отношения
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Получаем базовые баллы от студента
    const academic = parseFloat(document.getElementById('academic').value) || 0;
    const teachers = parseFloat(document.getElementById('teachers').value) || 0;
    const interest = parseFloat(document.getElementById('interest').value) || 0;

    // Определяем, какой преподаватель выбран, и берем его коэффициенты
    const selectedTeacher = teacherSelect.value;
    const weights = teacherCoefficients[selectedTeacher] || teacherCoefficients.default;

    // Считаем взвешенный Квазибуплон
    const kvazibuplon = Math.round(
      (academic * weights.academic) + 
      (teachers * weights.teachers) + 
      (interest * weights.interest)
    );

    // Выводим результат с вашим CSS-классом accent
    resultValue.innerHTML = `<span class="accent">${kvazibuplon}</span>`;

    // Формируем комментарий
    let comment = '';
    if (kvazibuplon >= 85) {
      comment = '🌟 Великолепно! Вы идеально подстроились под требования этого преподавателя.';
    } else if (kvazibuplon >= 65) {
      comment = '📈 Хороший уровень! Вы уверенно проходите критерии, но есть зоны для роста.';
    } else if (kvazibuplon >= 40) {
      comment = '⚖️ Средний баланс. Обратите внимание на те факторы, которые этот преподаватель ценит выше всего.';
    } else {
      comment = '🔍 Критическая ситуация. Похоже, ваши приоритеты совсем не совпадают с ожиданиями преподавателя.';
    }

    resultComment.textContent = comment;

    // Показываем блок результатов
    resultContainer.removeAttribute('hidden');
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
});
