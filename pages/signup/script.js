//script
const togglePassword1 = document.getElementById("togglePassword1");
const password = document.getElementById("password");

const togglePassword2 = document.getElementById("togglePassword2");
const confirmPassword = document.getElementById("confirmPassword");

//HIDE PASSWORD FUNCTION
function toggleVisibility(toggleIcon, inputField) {
    const isPassword = inputField.type === "password";
    inputField.type = isPassword ? "text" : "password";
    toggleIcon.classList.toggle("fa-eye");
    toggleIcon.classList.toggle("fa-eye-slash");
}

togglePassword1.addEventListener("click", () => toggleVisibility(togglePassword1, password));
togglePassword2.addEventListener("click", () => toggleVisibility(togglePassword2, confirmPassword));

//SIGN UP PAGES FUNCTION
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');

nextBtn.addEventListener('click', () => {
  step1.classList.remove('active');
  step2.classList.add('active');
});

prevBtn.addEventListener('click', () => {
  step2.classList.remove('active');
  step1.classList.add('active');
});