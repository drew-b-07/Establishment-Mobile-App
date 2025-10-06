function openDetails(deviceName) {
  document.getElementById("historyPage").classList.remove("active");
  document.getElementById("detailsPage").classList.add("active");
  document.getElementById("deviceName").textContent = deviceName;
}

function goBack() {
  document.getElementById("detailsPage").classList.remove("active");
  document.getElementById("historyPage").classList.add("active");
}

function showPopup() {
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

function confirmDelete() {
  alert("Evidence deleted!");
  closePopup();
}