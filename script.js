var el = document.querySelector('section');
function carregaTasks(){
  'use strict';
  for(let v in localStorage){
    if(v === "title") {
	  document.getElementById('title').textContent = localStorage.getItem('title');
    }
    else if(v !== "length"){
      let task = `<input type="checkbox" onclick="risca(this)"> 
	  <span contentEditable="true" title="Content Editable">`+v+"</span><br>";  
      el.innerHTML += task;
    }else{
      break;
    }
  }
  focusEl();
}

function titles(){
  'use strict';
  let title = document.getElementById('title').textContent;
  localStorage.setItem('title', title);
}

function remove(event){
  'use strict';
  event.preventDefault();
  let e = event || window.event;
  if(e.detail !== 0){
  Array.from(document.querySelectorAll('span.riscado')).forEach(node=>{
	node.previousElementSibling.remove();
	node.nextElementSibling.remove();
	localStorage.removeItem(node.textContent);
	node.remove();
  });
  focusEl();
	  
  }
}

function focusEl() {
	document.getElementById('task').focus();
}

function deleteAll(){
  'use strict';
  Array.from(document.querySelectorAll('span')).forEach(node=>{
	node.previousElementSibling.remove(); // checkbox
	node.nextElementSibling.remove(); // br
	localStorage.removeItem(node.textContent);
	node.remove(); // textContent
  });
  document.querySelector('dialog').close();
  focusEl();
}

function risca(el) {
  'use strict';
  if(el.checked){
  el.nextElementSibling.setAttribute("class","riscado");
  }else
   el.nextElementSibling.removeAttribute("class");
}

function openConfirmAction(event) {
	event.preventDefault();
	document.querySelector('dialog').showModal(); 
}

let input = document.getElementById("task");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  event.preventDefault();	
  let valTodo = event.target.value;
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
	if(!localStorage.getItem(valTodo) && valTodo !== undefined && valTodo !== '') {
	  localStorage.setItem(valTodo,false);
	  let taskHTML = `<input type="checkbox" onclick="risca(this)"> <span contentEditable="true">`+valTodo+`</span><br>`;
	  el.innerHTML += taskHTML;
	}
	document.getElementById('task').value = "";
  }else console.log(event.keyCode)
});