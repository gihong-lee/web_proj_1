const newPW = document.querySelector('#newPW');
const PWCheck = document.querySelector('#PWCheck');
const nameDupBtn = document.querySelector('#nameCheck');
const allSubmit = document.querySelectorAll('.submit')

let PWOk = false;
let nameOk = false;
const uid = location.pathname.substr(14);

function updateSubmit(isPW, data){
  if(isPW){
    if(!PWOk) {
      alert('비밀번호를 확인해 주세요.')
      return false
    }
  } else {
    if(!nameOk) {
      alert('중복확인 해주세요.')
      return false
    }
  }
  const dd = {
    method:'PATCH',
    headers:{
      'content-type':'application/json'
    },
    body: JSON.stringify(data)
  }
  fetch(`/auth/account/${uid}`, dd)
  .then(res => {
    const status = res.status;
    if(status === 201){
      alert('수정됨.');
      location.href = '/';
    }else if(status === 401){
      alert('비밀번호를 확인 하세요.');
    }
  })
}

function delSubmit(data){
  const dd = {
    method:'DELETE',
    headers:{
      'content-type':'application/json'
    },
    body: JSON.stringify({
      delPW : data.delPW
    })
  }
  fetch(`/auth/account/${uid}`,dd)
  .then(res => {
    const status = res.status;
    if(status === 201){
      alert('삭제됨')
      location.href = '/'
    } else if(status === 401){
      alert('비밀번호를 확인 하세요.');
      location.href = location.href;
    }
  })
}

function submitHandler(event){
  const inputData = {};
  const allInput = event.target.parentNode.querySelectorAll('input')
  const wrapId = event.target.parentNode.id;
  allInput.forEach(input => {
    if(input.name) {
      inputData[input.name] = input.value;
    }
  })

  if(wrapId === 'delWrap') delSubmit(inputData);
  else {
    let isPW;
    if(wrapId === 'PWWrap') isPW = true;
    else isPW = false;
    inputData['isPW'] = isPW;
    updateSubmit(isPW, inputData);
  }  
}

function checkAbled(input){
  if(input.getAttribute('disabled')===''){
    return false;
  }
  else {
    return true;
  }
}

function nameCheckHandler(event){
  const input = nameDupBtn.parentNode.children[0];
  const abled = checkAbled(input);

  if(abled){//중복확인 절차
    fetch(`/auth/account/${uid}/check_dup/?name=${input.value}`, {method: "GET"})
    .then((response) => response.json())
    .then((data) => {
      if(data.ok){// 사용 가능
        input.setAttribute('disabled','');
        nameDupBtn.innerText = '취소';
        alert('사용 가능합니다')
        nameOk = true;
      }else {
        alert('NickName이 중복됩니다.');
        nameOk = false;
      }
    })
  } else{//취소 절차
    input.removeAttribute("disabled");
    nameDupBtn.innerText = '중복확인';
    nameOk = false;
  }
}

function PWCheackHandler(){
  const PWValue = newPW.value;
  const PWCheackValue = PWCheck.value;
  const msg = document.querySelector('#checkMsg')
  if(PWValue === PWCheackValue){
    msg.innerText = '비밀번호가 일치합니다.';
    msg.style.color = 'blue';
    PWOk = true;
  }
  else {
    msg.innerText = '비밀번호가 일치하지 않습니다.';
    msg.style.color = 'red';
    PWOk = false;
  }

  if(PWValue.length < 4){
    msg.innerText = '비밀번호를 4자리 이상입력하세요.';
    msg.style.color = 'red';
    PWOk = false;
  }
}


function main(){
  newPW.addEventListener('input',PWCheackHandler)
  PWCheck.addEventListener('input',PWCheackHandler)
  nameDupBtn.addEventListener('click',nameCheckHandler)
  allSubmit.forEach(submit => submit.addEventListener('click',submitHandler))
}

main();