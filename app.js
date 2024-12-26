"use strict";

const totalSpent = document.querySelector(".spendings");
const bars = document.querySelector(".bars");
const tooltip = document.querySelector(".tooltip");

const addBar = function (day, height, max) {
  const html = ` 
        <div class="bar">
        <div data-day="${day}"></div>
            <p>${day}</p>
          </div>`;

  bars.insertAdjacentHTML("afterbegin", html);

  const dataAttr = document.querySelector("[data-day]");
  dataAttr.style.height = `${height}px`;

  //   Validate and add color for max value
  if (height === max) dataAttr.classList.add("maxAmount");
};

(async function () {
  const res = await fetch("./data.json");
  const data = await res.json();

  const loop = data.reduce((acc, cur) => acc + cur.amount, 0);
  totalSpent.textContent = `$ ${loop}`;

  const maxAmount = Math.max(...data.map((item) => item.amount));
  const maxHeight = 150; //150px

  data.forEach((item) => {
    const barHeight = (item.amount / maxAmount) * maxHeight;

    addBar(item.day, barHeight, maxHeight);

    bars.addEventListener("mouseover", (e) => {
      if (e.target.dataset.day) {
        const check = e.target.dataset.day;
        e.target.appendChild(tooltip);

        data.forEach((el) => {
          if (el.day === check) tooltip.textContent = `$${el.amount}`;
        });
      }
    });
  });
})();
