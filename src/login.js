const usernameInput = document.querySelector("#username_input");
usernameInput.addEventListener("change", usernameHandler);
function usernameHandler() {
  const username = usernameInput.value;
  localStorage.setItem("username", username);
  getUsername();
}

function getUsername() {
  usernameInput.classList.add("invisible");
  const hellouUser = document.querySelector(".username_show");
  hellouUser.innerHTML = `반가워 ${localStorage.getItem("username")}`;
}
// 로컬스토리지 체크
if (localStorage.getItem("username")) {
  getUsername();
} else {
  usernameInput.classList.remove("invisible");
}
