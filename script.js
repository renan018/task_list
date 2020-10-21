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
}
function titles(){
  'use strict';
  let title = document.getElementById('title').textContent;
  localStorage.setItem('title', title);
}
function remove(){
  'use strict';
  Array.from(document.querySelectorAll('span.riscado')).forEach(node=>{
	node.previousElementSibling.remove();
	node.nextElementSibling.remove();
	localStorage.removeItem(node.textContent);
	node.remove();
  });
}
function deleteAll(){
  'use strict';
  Array.from(document.querySelectorAll('span')).forEach(node=>{
	node.previousElementSibling.remove();
	node.nextElementSibling.remove();
	localStorage.removeItem(node.textContent);
	node.remove();
  });
  document.querySelector('dialog').removeAttribute('open');
}
function adiciona() {
  'use strict';
  let taskText = document.getElementById('task').value;
  if(!localStorage.getItem(taskText) && taskText !== undefined && taskText !== '') {
    let taskHTML = `<input type="checkbox" onclick="risca(this)"> <span contentEditable="true">`+taskText+"</span><br>";
    el.innerHTML += taskHTML;
    salva();
  }
  document.getElementById('task').value = "";
}
function risca(el) {
  'use strict';
  if(el.checked){
  el.nextElementSibling.setAttribute("class","riscado");
  }else
   el.nextElementSibling.removeAttribute("class");
}
function salva(){
  'use strict';
  Array.from(document.getElementsByTagName('span')).forEach(node=>{
    if(!localStorage.getItem(node.textContent)){
      var d = new Date();
      localStorage.setItem(node.textContent,d.getTime());
    }
  });
}
function openConfirmAction(event) {
	event.preventDefault();
	document.querySelector('dialog').showModal(); 
}