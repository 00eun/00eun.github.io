const todoForm = document.querySelector(".todo_form");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector(".todo_list");

const TODOS_KEY = "todos";
let todos = [];

function saveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  //입력한 값이 모여 있는 todo배열을 저장
  //키 값은 잘 못 적을 수 있으므로, 새로운 변수를 만들어 저장
}

function handleToDoSubmit(e) {
  e.preventDefault(); //이벤트 버블링을 막고
  const newTodo = todoInput.value;
  todoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  }; // li에 id값을 추가하기 위해 객체로 변경
  paintTodo(newTodoObj);
  todos.push(newTodoObj);
  saveTodos();
  //todos에 할일 내용과 아이다가 push해서 따로 넘겨줄 필요없다
  //게다가 todos는 전역 변수이므로 신경 x
}

function deleteTodo(e) {
  const li = e.target.parentNode;
  li.remove();
  todos = todos.filter((todo) => todo.id !== parseInt(li.id));
  //지우고 싶은 아이템을 제외하고 새로운 배열을 생성
  //원래 가지고 있던 배열에 todo변수를 주고, false조건을 주면 삭제됨
  // ex) function sexyFilter(item){retun item !== 3}
  // [1, 2, 3, 4, 5].filter(sexyfilter) // [1, 2, 4, 5]
  // https://nomadcoders.co/javascript-for-beginners/lectures/2921
  saveTodos();
}

function paintTodo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  const btn = document.createElement("button");
  span.innerText = newTodo.text;
  btn.innerText = "❌";
  btn.addEventListener("click", deleteTodo);
  // 버튼을 삭제하는 이벤트도 여기서 걸어줌
  li.appendChild(span);
  li.appendChild(btn);
  todoList.appendChild(li);
  //전부 만들고 마지막에 appendChild로 이어줌
}

todoForm.addEventListener("submit", handleToDoSubmit);
//버튼에 이벤트를 거는게 아니라 form 자체에 걸어야 함

const savedTodos = localStorage.getItem(TODOS_KEY);

if (savedTodos !== null) {
  const parseTodos = JSON.parse(savedTodos);
  todos = parseTodos;
  parseTodos.forEach(paintTodo);
  //위와 같음은 코드 parseTodos.forEach((item) => {paintTodo(item); );
  //ex) paintTodo({text:할일, id:1332})과 같이 parseTodos의 모든 요소를 실행함
}
