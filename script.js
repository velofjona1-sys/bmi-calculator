let chart;

const exerciseTips = [
  "Çdo zgjedhje e shëndetshme që bën sot, është investim për një të nesërme më të fortë.",
  "Trupi yt është tempulli yt; ushqeje me dashuri dhe lëviz me pasion.",
  "Mos numëro kalorite, numëro momentet kur ndihesh i gjallë dhe energjik.",
  "Aktiviteti fizik nuk është dënim, është dhuratë për trupin dhe mendjen tënde.",
  "Shëndeti yt fillon nga pjatat që zgjedh dhe hapat që bën çdo ditë.",
  "Një trup i shëndetshëm është kombinimi perfekt i ushqimit të mençur dhe lëvizjes të vazhdueshme.",
  "Çdo hap dhe çdo kafshim i zgjedhur mirë, të afron më pranë versionit më të mirë të vetes.",
  "Ushqehu për energji, jo për emocione.",
  "Një zakon i vogël i shëndetshëm sot, është fitore e madhe nesër.",
  "Lëviz, sepse çdo trup ka nevojë të ndjehet i gjallë.",
  "Zgjedhjet e mira nuk bëjnë ndryshimin menjëherë, por çdo ditë afron suksesin.",
  "Trupi yt nuk është ndëshkim, është dhuratë; kujdesu për të.",
  "Ushqimi i mirë është ilaç, aktiviteti fizik është magji.",
  "Çdo stërvitje është hap drejt një versioni më të fortë dhe më të lumtur të vetes.",
  "Mos pres motivim; krijo rutinën që të bën të motivohesh automatikisht.",
  "Energjia jote është pasqyrë e zgjedhjeve të tua të përditshme.",
  "Më mirë pak e shëndetshme çdo ditë, se një masë e madhe një herë.",
  "Trupi yt mund gjithçka; është mendja ajo që ka nevojë për ushqim dhe disiplinë.",
  "Shëndeti nuk është modë, është mënyrë jetese.",
  "Kur ushqehu mirë dhe lëviz me gëzim, çdo ditë bëhet një festë e trupit dhe mendjes."
];

function saveToLocalStorage(bmi) {
  let history = JSON.parse(localStorage.getItem('bmiHistory')) || [];
  history.push(bmi);
  localStorage.setItem('bmiHistory', JSON.stringify(history));
}

function getHistory() {
  return JSON.parse(localStorage.getItem('bmiHistory')) || [];
}

function calculateBMI() {
  const weight = document.getElementById("weight").value;
  const height = document.getElementById("height").value / 100;

  if (!weight || !height) {
    document.getElementById("result").innerText = "Plotësoni të gjitha fushat.";
    return;
  }

  const bmi = (weight / (height * height)).toFixed(1);
  let category = "";
  let color = "#00c853";

  if (bmi < 18.5) { category = "Nën peshë"; color = "orange"; }
  else if (bmi < 25) { category = "Normale"; color = "#00c853"; }
  else if (bmi < 30) { category = "Mbipeshë"; color = "red"; }
  else { category = "Obezitet"; color = "darkred"; }

  document.getElementById("result").innerText = `BMI: ${bmi} (${category})`;

  saveToLocalStorage(bmi);
  drawChart(bmi, color);
  renderHistory();
}

function drawChart(bmi, color) {
  const ctx = document.getElementById("bmiChart");
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["BMI juaj"],
      datasets: [{ label: "Vlera BMI", data: [bmi], backgroundColor: [color] }]
    },
    options: { scales: { y: { beginAtZero: true } } }
  });
}

function renderHistory() {
  const history = getHistory();
  const list = document.getElementById("bmiHistoryList");
  list.innerHTML = "";
  history.slice(-5).forEach((b, i) => {
    const li = document.createElement("li");
    li.innerText = `BMI ${i+1}: ${b}`;
    list.appendChild(li);
  });
}

function clearHistory() {
  localStorage.removeItem('bmiHistory');
  renderHistory();
}

function loadExercise() {
  const el = document.getElementById("exercise");
  const randomTip = exerciseTips[Math.floor(Math.random() * exerciseTips.length)];
  el.innerText = randomTip;
  localStorage.setItem('exerciseTip', randomTip);
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

window.onload = function() {
  renderHistory();
  const savedExercise = localStorage.getItem('exerciseTip');
  if (savedExercise) document.getElementById("exercise").innerText = savedExercise;
  else loadExercise();
}

