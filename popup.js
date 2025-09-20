document.getElementById("apply").addEventListener("click", async () => {
  let data = {
    chk1: document.getElementById("chk1").checked,
    sel1: document.getElementById("sel1").value,
    rng1: document.getElementById("rng1").value
  };

  // знаходимо активну вкладку
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // виконуємо код у цій вкладці
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: applySettings,
    args: [data]
  });
});

function applySettings(data) {
  // тут міняємо DOM на сторінці (приклад)
  let checkbox = document.querySelector("#checkbox1");
  if (checkbox) checkbox.checked = data.chk1;

  let select = document.querySelector("#select1");
  if (select) select.value = data.sel1;

  let range = document.querySelector("#range1");
  if (range) range.value = data.rng1;

  // тригеримо події
  [checkbox, select, range].forEach(el => {
    if (el) {
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.dispatchEvent(new Event("change", { bubbles: true }));
    }
  });
}