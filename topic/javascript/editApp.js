const editBtn = document.querySelector('#topicEdit');

function topicUpdateSubmit(){
  const title = document.querySelector('#updatedTitle').value;
  const context = document.querySelector('#updatedContext').value;
  const updateData = {
    method:'PATCH',
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      title:title,
      context:context
    })
  }

  const tid = location.pathname.substr(7);
  fetch(`/topic/${tid}`,updateData)
  .then((res) => {
    if(res.status === 201){
      alert('Update 성공.')
      location.href = `/topic/${tid}`;
    } else {
      alert('Update 실패. 다시시도해 주세요.')
      location.href = `/topic/${tid}/edit`;
    }
  })
}

function update(event){
  const title = document.querySelector('#topicTitle');
  const context = document.querySelector('#topicContext');
  const input = document.createElement('input')
  const textarea = document.createElement('textarea')
  const submitBtn = document.createElement('button')
  const delBtn = document.querySelector('#topicDelBtn');

  input.value = title.innerText;
  textarea.value = context.innerText;
  submitBtn.innerText = 'Submit';
  input.type = 'text'
  input.id = 'updatedTitle';
  submitBtn.id = 'topicUpdateSubmit'
  input.placeholder = 'title';
  textarea.placeholder = 'context';
  textarea.id = 'updatedContext';
  
  delBtn.remove();
  title.parentNode.replaceChild(input, title)
  context.parentNode.replaceChild(textarea, context);
  event.target.parentNode.replaceChild(submitBtn,event.target)

  submitBtn.addEventListener('click',topicUpdateSubmit)
}

function delHandler(){
  const tid = location.pathname.substr(7);
  fetch(`/topic/${tid}`,{ method:'delete' })
  .then((res) => {
    if(res.status === 204){
      alert('삭제됨')
      location.href = '/';
    }
  })
}

function edit(){
  const updateBtn = document.createElement('button')
  const delBtn = document.createElement('button')
  const wrapper = editBtn.parentNode;

  updateBtn.id = 'topicUpdateBtn'
  updateBtn.innerText = 'UPDATE'
  delBtn.id = 'topicDelBtn'
  delBtn.innerText = 'DELETE'

  wrapper.replaceChild(updateBtn,editBtn);
  wrapper.appendChild(delBtn);

  updateBtn.addEventListener('click',update);
  delBtn.addEventListener('click',delHandler);
}

function main() {
  if(editBtn) editBtn.addEventListener('click',edit)
}

main();