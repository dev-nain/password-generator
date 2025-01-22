tailwind.config = {
  theme: {
    extend: {
      colors: {
        background: "#000000",
        card: "#1C1C22",
        input: "#2A2A31",
        primary: "#FFFFFF",
        accent: "#A3FFB0",
        strength: "#2A2A31",
      },
      fontFamily: {
        sans: ["JetBrains Mono", "monospace"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
};

const lowerCaseChar = "qwertyuiopasdfghjklzxcvbnm";
const upperCaseChar = "QWERTYUIOPASDFGHJKLZXCVBNM";
const digits = "1234567890";
const specialChars = "!@#$%^&*()_+-={}[];<>:";

function onPasswordLengthChange(event) {
  const indicator = document.querySelector("#password-length-indicator");
  indicator.innerHTML = document.querySelector(
    "input[name='password-strength']"
  ).value;
}

function generate() {
  let dictionary = "";
  const hasLowerCase = document.querySelector(
    "input[name='lower-case']"
  ).checked;
  const hasUpperCase = document.querySelector(
    "input[name='upper-case']"
  ).checked;
  const hasDigits = document.querySelector("input[name='digits']").checked;
  const hasSymbols = document.querySelector("input[name='symbols']").checked;
  const passwordLength = document.querySelector(
    "input[name='password-strength']"
  ).value;

  if (hasLowerCase) dictionary += lowerCaseChar;
  if (hasUpperCase) dictionary += upperCaseChar;
  if (hasDigits) dictionary += digits;
  if (hasSymbols) dictionary += specialChars;

  if (passwordLength < 1 || dictionary.length == 0) return;

  let password = "";

  for (let i = 0; i < passwordLength; i++) {
    const pos = Math.floor(Math.random() * dictionary.length);
    password += dictionary[pos];
  }

  showPassword(password);

  const passwordStrength = calculatePasswordStrength(
    password,
    hasLowerCase,
    hasUpperCase,
    hasDigits,
    hasSymbols
  );

  updatePasswordStrength(passwordStrength);
}

function showPassword(password) {
  const passwordElement = document.querySelector("span#password");
  passwordElement.innerHTML = password;

  passwordElement.classList.remove("text-white/50");
  passwordElement.classList.add("text-white");
}

function calculatePasswordStrength(
  password,
  hasLowerCase,
  hasUpperCase,
  hasDigits,
  hasSymbols
) {
  let strength = 0;

  if (password.length >= 8) strength += 1;
  if (password.length >= 12) strength += 1;
  if (password.length >= 16) strength += 1;
  if (password.length >= 20) strength += 1;

  let varietyCount = 0;
  if (hasLowerCase) varietyCount++;
  if (hasUpperCase) varietyCount++;
  if (hasDigits) varietyCount++;
  if (hasSymbols) varietyCount++;

  strength += varietyCount;

  const strengthLevel = Math.min(Math.round(strength / 2), 4);

  return strengthLevel;
}

function updatePasswordStrength(strength) {
  const strengthColors = {
    1: ["bg-red-500", "border-red-500"],
    2: ["bg-orange-500", "border-orange-500"],
    3: ["bg-yellow-500", "border-yellow-500"],
    4: ["bg-green-500", "border-green-500"],
  };

  const allColors = [
    "bg-red-500",
    "border-red-500",
    "bg-orange-500",
    "border-orange-500",
    "bg-yellow-500",
    "border-yellow-500",
    "bg-green-500",
    "border-green-500",
  ];

  const passwordStrengthBars = document.querySelectorAll("#strength-indicator");

  passwordStrengthBars.forEach((bar, index) => {
    bar.classList.remove(...allColors);

    if (index < strength) {
      bar.classList.add(...strengthColors[strength]);
    }
  });
}

function copyPassword() {
  const password = document.querySelector("span#password").textContent;

  navigator.clipboard.writeText(password).then(() => {
    document.querySelector("#tooltip").innerHTML = "copied!";
    setTimeout(() => {
      document.querySelector("#tooltip").innerHTML = "Copy password!";
    }, 3000);
  });
}
