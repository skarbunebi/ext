// коли сторінка завантажується → беремо налаштування з chrome.storage
chrome.storage.local.get(["am32settings"], (result) => {
  let data = result.am32settings;
  if (!data) return; // нічого не збережено

  console.log("Автозаповнення AM32:", data);

  // приклади (замінити селектори на реальні!)
  let reverseCheckbox = document.querySelector("#reverseRotationCheckbox");
  if (reverseCheckbox) reverseCheckbox.checked = data.reverse;

  let pwmSelect = document.querySelector("#pwmFrequencySelect");
  if (pwmSelect) pwmSelect.value = data.pwmFreq;

  let brakeStopCheckbox = document.querySelector("#brakeOnStopCheckbox");
  if (brakeStopCheckbox) brakeStopCheckbox.checked = data.brakeStop;

  let startupPowerSlider = document.querySelector("#startupPowerRange");
  if (startupPowerSlider) startupPowerSlider.value = data.startupPower;

  // тригеримо події, щоб UI сайту побачив
  [reverseCheckbox, pwmSelect, brakeStopCheckbox, startupPowerSlider].forEach(el => {
    if (el) {
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.dispatchEvent(new Event("change", { bubbles: true }));
    }
  });
});