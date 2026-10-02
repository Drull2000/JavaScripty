const distanceInput = document.querySelector('#distance');
const speedsInput = document.querySelector('#speeds');
const startButton = document.querySelector('#start-button');
const car = document.querySelector('#car');
const segmentCards = document.querySelector('#segment-cards');
const segmentMarkers = document.querySelector('#segment-markers');
const status = document.querySelector('#journey-status');
const averageSpeedOutput = document.querySelector('#average-speed');
const totalTimeOutput = document.querySelector('#total-time');
const fuelOutput = document.querySelector('#fuel-used');
const driverText = document.querySelector('#driver-text');
const journeyPanel = document.querySelector('.journey-panel');

const formatNumber = (number, digits = 2) => number.toLocaleString('uk-UA', { maximumFractionDigits: digits });

function getSpeeds() {
  return speedsInput.value.split(',').map(value => Number(value.trim())).filter(value => Number.isFinite(value) && value > 0);
}

function renderRoute(speeds, distance = Number(distanceInput.value) || 300) {
  segmentCards.innerHTML = '';
  segmentMarkers.innerHTML = '';
  speeds.forEach((speed, index) => {
    const card = document.createElement('div');
    card.className = 'segment-card';
    card.innerHTML = `<strong>V${index + 1} = ${formatNumber(speed, 0)}</strong><span>ділянка ${index + 1}</span>`;
    segmentCards.append(card);
    if (index < speeds.length - 1) {
      const marker = document.createElement('div');
      marker.className = 'segment-marker';
      marker.style.left = `${((index + 1) / speeds.length) * 100}%`;
      marker.innerHTML = `<span>${formatNumber(distance / speeds.length, 0)} км</span>`;
      segmentMarkers.append(marker);
    }
  });
}

function resetResults(speeds) {
  renderRoute(speeds);
  averageSpeedOutput.textContent = '—';
  totalTimeOutput.textContent = '—';
  fuelOutput.textContent = '—';
  driverText.textContent = 'Натисніть «Запустити подорож», і водій розповість, як він проїхав маршрут.';
  status.textContent = 'готовий до старту';
  car.style.left = '4%';
}

async function startJourney() {
  const speeds = getSpeeds();
  const distance = Number(distanceInput.value);
  if (!speeds.length || !Number.isFinite(distance) || distance <= 0) {
    status.textContent = 'перевірте дані';
    return;
  }
  renderRoute(speeds);
  startButton.disabled = true;
  journeyPanel.classList.add('is-moving');
  const segmentDistance = distance / speeds.length;
  let totalTime = 0;
  const cards = [...segmentCards.children];
  status.textContent = 'маршрут розпочато';
  car.style.transitionDuration = '1s';
  for (let index = 0; index < speeds.length; index += 1) {
    cards[index].classList.add('active');
    car.style.left = `${4 + ((index + 1) / speeds.length) * 91}%`;
    const segmentTime = segmentDistance / speeds[index];
    totalTime += segmentTime;
    await new Promise(resolve => setTimeout(resolve, 1000));
    cards[index].classList.remove('active');
    cards[index].classList.add('done');
  }
  const averageSpeed = distance / totalTime;
  const fuel = distance * 6.5 / 100;
  averageSpeedOutput.textContent = formatNumber(averageSpeed);
  totalTimeOutput.textContent = formatNumber(totalTime);
  fuelOutput.textContent = formatNumber(fuel);
  document.querySelector('.answer-card:last-child p').textContent = `За всі ${formatNumber(distance, 0)} км маршруту`;
  status.textContent = 'подорож завершено';
  const segmentReport = speeds.map((speed, index) => {
    const segmentTime = segmentDistance / speed;
    return `Ділянка ${index + 1}: ${formatNumber(segmentDistance)} км зі швидкістю ${formatNumber(speed, 0)} км/год. На неї я витратив ${formatNumber(segmentTime)} год.`;
  }).join('\n');
  const arithmeticAverage = speeds.reduce((sum, speed) => sum + speed, 0) / speeds.length;
  driverText.textContent = `Маршрут завершено! Я проїхав ${formatNumber(distance, 0)} км і уважно стежив за кожною ділянкою.

${segmentReport}

Увесь шлях зайняв ${formatNumber(totalTime)} год. Я обчислив середню швидкість не як просте середнє ${formatNumber(arithmeticAverage)} км/год, тому що на повільній ділянці автомобіль проводить більше часу. Спочатку додаємо час кожної ділянки: t = s₁/V₁ + s₂/V₂ + ... + sₙ/Vₙ. Потім ділимо всю відстань на весь час: Vсер = Sзаг / tзаг = ${formatNumber(averageSpeed)} км/год.

Пального при витраті 6,5 л на 100 км знадобилося ${formatNumber(fuel)} л: ${formatNumber(distance, 0)} × 6,5 / 100. Отже, рівні відстані дають гармонійне середнє швидкостей, а не арифметичне.`;
  journeyPanel.classList.remove('is-moving');
  startButton.disabled = false;
}

speedsInput.addEventListener('input', () => renderRoute(getSpeeds()));
startButton.addEventListener('click', startJourney);
resetResults(getSpeeds());