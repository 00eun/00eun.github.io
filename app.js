// 시계
const clock = document.querySelector(".clock");

function callTime() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  clock.innerHTML = `${hours}:${minutes}:${seconds}`;
}
callTime();
setInterval(callTime, 1000);

//로그인
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

// 투두리스트
const todoInput = document.querySelector(".todo_input input");
const todoAddBtn = document.querySelector(".todo_add_btn");
const todolist = document.querySelector(".todo_list");

//투두리스트 생성
todoAddBtn.addEventListener("click", todosHandler);
function todosHandler() {
  const li = document.createElement("li");
  const p = document.createElement("p");
  const btn = document.createElement("button");
  todolist.appendChild(li);
  li.appendChild(p);
  li.appendChild(btn);
  p.innerHTML = todoInput.value;
  btn.innerHTML = "❌";
  li.id = Date.now();
  todoInput.value = "";
}

//투두삭제
todolist.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
    // console.log(e.target);
    // console.dir(e.target.parentNode.parentNode);
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
  }
});
