let userNameArr = JSON.parse(localStorage.getItem('usernamearr'))||[];
let passwordArr = JSON.parse(localStorage.getItem('passwordarr'))||[];
let emailArr = JSON.parse(localStorage.getItem('emailarr'))||[];
let currUser=JSON.parse(localStorage.getItem('curruser'))||[];

document.querySelector('.js-sign-in').addEventListener('click',()=>{
  console.log(document.querySelector('.js-sign-in'));
  let email=document.querySelector('.js-email').value;
  let password=document.querySelector('.js-pass').value;


  let flag=0;
  for(let i=0;i<emailArr.length;i++){
      if(emailArr[i]===email && passwordArr[i]===password){
          flag=1;
          break;
      }
  }
//   console.log(email);
  if(email===''){
      let name_warning = document.getElementById('email-warning-3');
      name_warning.style.visibility='visible';
  }
  else if(flag===0){
      let name_warning = document.getElementById('email-warning-3');
      name_warning.style.visibility='visible';
      let pass_warning = document.getElementById('warning-pass');
      pass_warning.style.visibility='visible';
  }
  else{
      localStorage.setItem('curruser',JSON.stringify(email));
      window.location.href='amazon.html';
  }
});