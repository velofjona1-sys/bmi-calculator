document.addEventListener("DOMContentLoaded", () => {
  const history = JSON.parse(localStorage.getItem("bmiHistory")) || [];
  const historyList = document.getElementById("history");

  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
});

document.getElementById("bmiForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const weight = document.getElementById("weight").value;
  const height = document.getElementById("height").value / 100;

  const bmi = (weight / (height * height)).toFixed(1);
  let kategoria = "";

  if (bmi < 18.5) kategoria = "Nën peshë";
  else if (bmi < 25) kategoria = "Peshë normale";
  else if (bmi < 30) kategoria = "Mbipeshë";
  else kategoria = "Obezitet";

  const rezultati = `BMI: ${bmi} (${kategoria})`;

  document.getElementById("result").textContent = rezultati;

  const history = JSON.parse(localStorage.getItem("bmiHistory")) || [];
  history.push(rezultati);
  localStorage.setItem("bmiHistory", JSON.stringify(history));

  const li = document.createElement("li");
  li.textContent = rezultati;
  document.getElementById("history").appendChild(li);
});

document.getElementById("clearBtn")?.addEventListener("click", () => {
  localStorage.removeItem("bmiHistory");
  document.getElementById("history").innerHTML = "";
});
