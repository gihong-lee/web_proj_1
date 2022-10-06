const idBtn = document.querySelector('#idCheck');
const nameBtn = document.querySelector('#nameCheck');
const PWCheck = document.querySelector('#PWCheck');
const PW = document.querySelector('#PW');
const msg = document.querySelector('#PWMsg');
const form = document.querySelector('form');

let idOk = false;
let nameOk = false;
let PWOk = false;

function checkAbled(input){
  if(input.getAttribute('disabled')===''){
    return false;
  }
  else {
    return true;
  }
}

function clickHandler(event){
  let isId = false;
  const input = event.target.parentElement.children[0];
  const btn = event.target;
  const abled = checkAbled(input);

  if(input.getAttribute('name') === 'user_id'){
    isId = true;
  }

  if(abled){//중복확인 절차
    fetch(`/auth/join/check_dup/?value=${input.value}&isId=${isId}`, {method: "GET"})
      .then((response) => response.json())
    .then((data) => {
      if(data.ok){// 사용 가능
        input.setAttribute('disabled','');
        btn.innerText = '취소';
        alert('사용 가능합니다')
        if(isId){//id
          idOk = data.ok;
        } else { // name
          nameOk = data.ok;
        }
      }else {
        if(isId){//id
          alert('ID가 중복됩니다.');
        } else { // name
          alert('NickName이 중복됩니다.');
        }
      }
    })
  } else{//취소 절차
    input.removeAttribute("disabled");
    btn.innerText = '중복확인';
    if(isId){//id`
      idOk = false;
    } else { // name
      nameOk = false;
    }
  }
}

function PWCheackHandler(){
  const PWValue = PW.value;
  const PWCheackValue = PWCheck.value;
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

function submitHandler(event){
  if(!idOk){
    alert('ID 중복확인을 해주십시오.');
    event.preventDefault();
  } else if(!nameOk){
    alert('NickName 중복확인을 해주십시오.');
    event.preventDefault();
  } else if(!PWOk){
    alert('비밀번호가 일치하지 않습니다.');
    event.preventDefault();
  } else {
    const id = idBtn.parentElement.children[0];
    const name = nameBtn.parentElement.children[0];

    id.removeAttribute("disabled");
    name.removeAttribute("disabled");
  }
}

function main(){
  idBtn.addEventListener('click',clickHandler);
  nameBtn.addEventListener('click',clickHandler);
  PWCheck.addEventListener('input',PWCheackHandler);
  PW.addEventListener('input',PWCheackHandler);
  form.addEventListener('submit', submitHandler)
}

main()