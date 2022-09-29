const backBtn = document.querySelector('#back');
const delBtns = document.querySelectorAll('#cmtDel');
const updateBtns = document.querySelectorAll('#cmtUpdate');
const createBtn = document.getElementById('cmtCreate')

function createNode(result){
  const footer = document.getElementsByTagName('footer')
  const cmt = document.createElement("div");
  cmt.id = `comment_${result.id}`;
  cmt.style.margin = '10px';
  const cmtUDWrap = document.createElement("div");
  const cmtInfo = document.createElement("h6");
  cmtInfo.innerText = `${result.name} created at : ${Date()}`
  const cmtContext = document.createElement("span");
  cmtContext.innerText = result.context;
  const cmtDel = document.createElement("button");
  cmtDel.addEventListener('click',delHandler)
  cmtDel.id = 'cmtDel';
  cmtDel.innerText = 'Delete';
  cmtDel.style.margin = '5px';
  const cmtUpdate = document.createElement("button");
  cmtUpdate.id = 'cmtUpdate'
  cmtUpdate.innerText = 'Update'
  cmtUpdate.addEventListener('click',updateHandler)
  cmtUDWrap.appendChild(cmtDel)
  cmtUDWrap.appendChild(cmtUpdate)
  cmt.appendChild(cmtInfo)
  cmt.appendChild(cmtContext)
  cmt.appendChild(cmtUDWrap)
  
  footer[0].appendChild(cmt);
}

function createHandler(){
  const textarea = document.querySelector('#cmtContext');
  const context = textarea.value;
  const userName = document.querySelector('#userName').innerText;
  const tid = location.href.substr(28);
  textarea.value = '';
  if(!userName){
    alert('로그인 후 사용가능 합니다.');
    return false;
  }
  const cmtData = {
    method:'post',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      context: context
    })
  }

  fetch(`/topic/${tid}/comment`,cmtData)
  .then((res) => res.json())
  .then((result) => {
    createNode(result)
  })

}

function updated(event) {
  const cid = event.target.parentElement.parentElement.id;
  const span = document.createElement('span')
  const updateBtn = document.createElement('button');
  const textarea = document.querySelector('#updateContext');

  updateBtn.id = 'cmtUpdate';
  updateBtn.innerText = 'Update';
  span.innerText = textarea.value;

  event.target.parentNode.replaceChild(updateBtn,event.target);
  textarea.parentNode.replaceChild(span,textarea);
  document.querySelector('#cmtUpdate').addEventListener('click',updateHandler);
  updateBtns.forEach(updateBtn => updateBtn.removeAttribute('disabled'));
  delBtns.forEach(delBtn  => delBtn.removeAttribute('disabled'));
}

function updateSubmit(event){
  const tid = location.href.substr(28);
  const cid = event.target.parentElement.parentElement.id;
  const context = document.querySelector('#updateContext').value
  const cmtData = {
    method:'PATCH',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      context: context
    })
  }

  fetch(`/topic/${tid}/comment/${cid.substr(8)}`,cmtData)
  .then((res) => {
    if(res.status === 201) updated(event);
    else if(res.status === 401) {
      alert('권한 없음')
      location.reload();
    };
  })
}

function updateHandler(event){
  const cid = event.target.parentElement.parentElement.id;
  const span = document.querySelector(`#${cid}>span`)
  const textarea = document.createElement('textarea');
  const submitBtn = document.createElement('button');

  submitBtn.id = 'cmtUpdateSubmit';
  submitBtn.innerText = 'submit';
  textarea.id = 'updateContext';
  textarea.innerText = span.innerText;

  event.target.parentNode.replaceChild(submitBtn,event.target);
  span.parentNode.replaceChild(textarea, span);
  document.querySelector('#cmtUpdateSubmit').addEventListener('click',updateSubmit)
  updateBtns.forEach(updateBtn => updateBtn.setAttribute('disabled',''));
  delBtns.forEach(delBtn  => delBtn.setAttribute('disabled',''));
}

function delHandler(event){
  const cid = event.target.parentElement.parentElement.id;
  const tid = location.href.substr(28);

  fetch(`/topic/${tid}/comment/${cid.substr(8)}`, { method: "delete" })
  .then((res) => {
    if(res.status === 201) document.getElementById(cid).remove();
    else if(res.status === 401){
      alert('권한 없음')
      location.reload();
    }
  })
}

function main(){
  createBtn.addEventListener('click',createHandler)
  delBtns.forEach(delBtn  => delBtn.addEventListener('click',delHandler))
  updateBtns.forEach(updateBtn => updateBtn.addEventListener('click',updateHandler))
  backBtn.addEventListener('click',()=>{history.back()});
  backBtn.addEventListener('mouseover',()=>{backBtn.style.cursor = 'pointer';})
}

main();