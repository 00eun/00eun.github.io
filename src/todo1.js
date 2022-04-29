// 투두리스트
const todoInput = document.querySelector(".todo_input input");
const todoAddBtn = document.querySelector(".todo_add_btn");
const todolist = document.querySelector(".todo_list");

//새로고침했을때 불러오기
function load() {
  const data = localStorage.getItem("todos");
  if (data !== null) {
    const todos = JSON.parse(data);
    console.log(todos);
    for (let i = 0; i < todos.length; i++) {
      paintingTodo(todos[i].ID, todos[i].todo);
    }
  }
}
load();

//로컬 스토리지 저장
function save(data) {
  localStorage.setItem("todos", JSON.stringify(data));
}

//리스트 확인 -> 로컬스토리지에 저장
function createTodoArr() {
  const liTodos = document.querySelectorAll("li");
  const todos = {};
  const todoList = [];
  for (let i = 0; i < liTodos.length; i++) {
    todos.ID = liTodos[i].id;
    todos.todo = liTodos[i].childNodes[0].innerHTML;
    todoList.push({ ...todos });
  }
  save(todoList);
}

//최초에 입력
todoAddBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keyup", addEnterKeyTodo);
function addEnterKeyTodo(e) {
  const ENTER = 13;
  if (e.keyCode == ENTER) {
    addTodo();
  }
}

function addTodo() {
  paintingTodo(Date.now(), todoInput.value);
  todoInput.value = ""; // input 초기화
  createTodoArr(); // 리스트 확인 -> 로컬스토리지에 저장
}
//투투 리스트 구조생성 & 내용저장,고유ID부여
function paintingTodo(ID, todo) {
  const li = document.createElement("li");
  const p = document.createElement("p");
  const btn = document.createElement("button");
  todolist.appendChild(li);
  li.appendChild(p);
  li.appendChild(btn);
  p.innerHTML = todo;
  btn.innerHTML = "❌";
  li.id = ID;
}

//투두삭제
todolist.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
    //클릭한 버튼에 해당하는 li그룹 지우기
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    createTodoArr(); //리스트 확인 -> 로컬스토리지에 저장
  }
});

//대체 ID가 왜 필요한 건지 알수 없어짐..
