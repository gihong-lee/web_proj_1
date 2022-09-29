const { account } = require("./DB_Info");

function topic(topic) {
  return `
  <div style="margin:10px;">
    <a href="/topic/${topic.id}" >${topic.title}</a>
  </div>`
}

module.exports = {
  html :function(title, login, control, context, footer){
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
    </head>
    <body>
      ${login}
      <h1><a href = '/'>Home</a></h1>
      <h1>${title}</h1>
      ${control}
      ${context}
      ${footer}
    </body>
    </html>`;
  
    return html;
  },

  beNumOrDef: function (something, def = 0){
    if(isNaN(something)){
      return def;
    } else{
      const num = Math.round(Number(something));
      return num;
    }
  },

  isLogined: function (req, res){
    console.log(req.session);
    if(false){
      return `
      <a href= "/auth/account/${req.session.userId}" id ="userName">
        ${req.session.name}
      </a>
      <span> | </span>
      <a href = "/auth/logout_process">Logout</a>`;
    } else {
      return `
      <a href="/auth/login">login</a>
      <a href= "/auth/join">Join</a>`;
    }
  },

  borad:{
    pagebar:function(lastPage, currentpage){
      let html = '<div>';
      if(currentpage !== 0){
        html += `<a href="/board/?page=${currentpage-1}" style="margin: 10px 8px;">이전</a>`
      }
      for(let i = 0; i < lastPage; i++){
        let href = `href=/board/?page=${i}`
        if(i === currentpage) href = '';
        html += `<a ${href} style="margin: 10px 8px;">${i+1}</a>`
      }
      if(currentpage+1 !== lastPage){
        html += `<a href="/board/?page=${currentpage+1}" style="margin: 10px 8px;">다음</a>`;
      }
      html += '</div>';
      return html;
    },

    board:function(topics){
      let html = '<div style="display: flex; flex-direction: column;">';
      for(let i =0; i < Object.keys(topics).length; i++){
        html += topic(topics[i]);
      }
      html += '</div>';
    
      return html;
    }
  },

  topic:{
    contorl:function(enable){
      if(!enable) return '';
      else{
        const controlTag = `
        <div id = "topicEditWrap">
          <button id = "topicEdit">EDIT</button>
        </div>`
        
        return controlTag;
      }
    },
    context:function(topic){
      const title = topic.title,
      time = topic.created,
      description = topic.context,
      author = topic.name;
  
      const constextTag = `
      <div style="display: flex; flex-direction: column; align-items: center;">
        <header style="text-align: center;">
          <h2 id = "topicTitle" style="display: inline-block;">${title}</h2>
          <br>
          <h6 style="display: inline-block; margin-top: 0px">${author} created at : ${time}</h6>
        </header>
        <div>
          <p id = "topicContext" style="display: inline-block;">${description}</p>
        </div>
      </div>`;
  
    return constextTag;
    },
    commentCreate:function(topic){
      const commentTag = `
      <div class = "cmtCWrap">
        <p>
          <textarea id = "cmtContext" name="comment" placeholder="comment"></textarea>
          <input type="submit" id = "cmtCreate">
        </p>
      </Wrap>`;
  
      return commentTag;
    },
    comment:function(comments,sessionID){
      let html = '<footer class="cmtWrap"style="display: flex; flex-direction: column; align-items: center;">';
      for(let i =0; i < Object.keys(comments).length; i++){
        const author=comments[i].name,time=comments[i].created;
        html += `
        <div class = "cmtWrap" id = comment_${comments[i].id} style="margin: 10px;">
          <h6>${author} created at : ${time} </h6>
          <span>${comments[i].context}</span>`;
  
        if(comments[i].author_id == sessionID){
          html += `
            <div class = "cmtUDWrap">
              <button id = "cmtDel">Delete</button>
              <button id = "cmtUpdate">Update</button>
            </div>
          </div>`;
        }else {
          html += '</div>';
        }  
      }
      html += '</footer>';
    
      return html;
    }
  },

  account:{
    html:function(session){return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Account</title>
      <style>
        .submit{
          margin:15px; 
        }
        .processWrap{
          margin: 60px 0px; 
          border: 2px ridge black; 
          display: flex; 
          flex-direction: column; 
          align-items: center;
        }
        .accountWrap{
          padding: 20px 0px;
        }
      </style>
    </head>
    <body>
      <h1><a href = '/'>Home</a></h1>
      <h1>${session.name}'s Account</h1>
        <div class="accountWrap">
          <div class = "processWrap" id="PWWrap">
            <h4>비밀번호 변경</h4>
            <p><input type="password" id = "lastPW" name="lastPW" placeholder="PASSWORD"></p>
            <p><input type="password" id = "newPW" name="newPW" placeholder="newPW"></p>
            <p>
              <input type= "password" id = "PWCheck" placeholder="PASSWORD Check">
            </p>
            <p><span id="checkMsg">변경 할 비밀번호를 입력해 주세요</span>
            </p>
            <button class="submit">Submit</button>
          </div>
          <div class = "processWrap" id = "nameWrap">
            <h4>Nickname 변경</h4>
            <p>
              <input type="text" name="name" placeholder="Nickname">
              <button id = "nameCheck">중복확인</button>
            </p>
            <button class="submit">Submit</button>
          </div>
          <div class = "processWrap" id="delWrap">
            <h4>회원탈퇴</h4>
            <p><input type="password" name="delPW" placeholder="PASSWORD"></p>
            <button class="submit">Submit</button>
          </div>
        </div>
      <script src="../../javascript/accountApp.js"></script>
    </body>
    </html>`}
  }
}