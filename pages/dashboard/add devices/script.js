function showPopup(name) {
  document.getElementById("popup").style.display = "block";
  document.querySelector(".overlay").style.display = "block";
  document.getElementById("wifi-name").innerText = name;
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
  document.querySelector(".overlay").style.display = "none";
}

function confirmConnect() {
  const wifiName = document.getElementById("wifi-name").innerText;
  const password = document.getElementById("password").value;
  alert("Trying to connect to" + wifiName + "with password" + password);
  closePopup();
}

const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");

togglePassword.addEventListener("click", () => {
  const isPassword = password.type === "password";
  password.type = isPassword ? "text" : "password";
  
  // Toggle icon
  togglePassword.classList.toggle("fa-eye");
  togglePassword.classList.toggle("fa-eye-slash");
});