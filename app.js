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

// 로컬 스토리지 로드
// function load (){
//   const data = localStorage.getItem('todos');
//   if (data !== null){
//     return JSON.parse(data);
//   }else{
//     return {
//       ID : "",
//       todo: ""
//     }
//   }
// }

//로컬 스토리지 로드도.. 해야해..
//새로고침했을때 떠야지

//로컬 스토리지 저장
function save (data){
  localStorage.setItem('todos', JSON.stringify(data));
}
// todo배열로 만들기
function createTodoArr(li){
  li.id = Date.now();
  const liTodos = document.querySelectorAll('li');
  const todos = {}
  const todoList = [];
  for (let i = 0; i < liTodos.length; i++){
    todos.ID = li.id;
    todos.todo = todoInput.value;
    todoList.push({...todos});
  }
  save(todoList);
}

//투두리스트 그리기
todoAddBtn.addEventListener("click", paintingTodo);
function paintingTodo() {
  const li = document.createElement("li");
  const p = document.createElement("p");
  const btn = document.createElement("button");
  todolist.appendChild(li);
  li.appendChild(p);
  li.appendChild(btn);
  p.innerHTML = todoInput.value;
  btn.innerHTML = "❌";
  createTodoArr(li);
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


