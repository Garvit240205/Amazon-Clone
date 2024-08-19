let userNameArr = JSON.parse(localStorage.getItem('usernamearr'))||[];
let passwordArr = JSON.parse(localStorage.getItem('passwordarr'))||[];
let emailArr = JSON.parse(localStorage.getItem('emailarr'))||[];

let get_name = document.getElementById('name');
let get_email=document.getElementById('email');
let get_pass=document.getElementById('password');
let get_pass_again=document.getElementById('password_again');
let bttn = document.getElementById('create'); 
let cnt=0;


bttn.addEventListener('click', () => {
    cnt=0;
    console.log(get_name.value);
    console.log(get_email.value);
    console.log(get_pass.value);
    console.log(get_pass_again.value);
    if(get_name.value===""){
        let name_warning = document.getElementById('name-warning');
        name_warning.style.visibility='visible';
    }
    else{
        let name_warning = document.getElementById('name-warning');
        name_warning.style.visibility='hidden';
        cnt++;
    }
    if(get_email.value===""){
        let name_warning = document.getElementById('email-warning');
        name_warning.style.visibility='visible';
    }
    else{
        let name_warning = document.getElementById('email-warning');
        name_warning.style.visibility='hidden';
        cnt++;
    }
    if(get_pass.value===""){
        let name_warning = document.getElementById('pass-warning');
        name_warning.style.visibility='visible';
    }
    else{
        let name_warning = document.getElementById('pass-warning');
        name_warning.style.visibility='hidden';
        cnt++;
    }
    if(get_pass_again.value===""){
        let name_warning = document.getElementById('warning');
        name_warning.style.visibility='visible';
    }   
    else{
        let name_warning = document.getElementById('warning');
        name_warning.style.visibility='hidden';
        cnt++;
    }
    if(get_pass.value===get_pass_again.value&&get_pass.value!==""){
        console.log("pass are same");
        username.push(get_name.value);
        password.push(get_pass.value);
        email.push(get_email.value);
        let warning=document.getElementById('warning');
        console.log(warning.style.visibility);
        warning.style.visibility="hidden";
        cnt++;
        // window.location.href = 'login.html';
        
    }
    else if(get_pass.value!==get_pass_again.value&&get_pass.value!==""){
        console.log("differnt");
        let warning=document.getElementById('warning');
        console.log(warning.style.visibility);
        warning.innerText="Enter same password in both password field.";
        warning.style.visibility="visible";
    }
    // if(cnt===5){
    //     window.location.href = 'login.html';
    // }
});

document.querySelector('.js-create-account').addEventListener('click',()=>{
    let userName=document.querySelector('.js-your-name').value;
    let email=document.querySelector('.js-email').value;
    let password=document.querySelector('.js-pass').value;

    let password_again=document.querySelector('.js-pass-again').value;

    let flag=0;
    for(let i=0;i<emailArr.length;i++){
        if(emailArr[i]===email){
            flag=1;
            break;
        }
    }
    if(email===''){
        let name_warning = document.getElementById('email-warning');
        name_warning.style.visibility='visible';
    }
    else if(flag===1){
        let name_warning = document.getElementById('email-warning-2');
        name_warning.style.visibility='visible';
    }
    else if(password!==password_again){
        let warning=document.getElementById('warning');
        warning.style.visibility="visible";
    }
    else{
        userNameArr.push(userName);
        emailArr.push(email);
        passwordArr.push(password);
        localStorage.setItem('usernamearr',JSON.stringify(userNameArr));
        localStorage.setItem('emailarr',JSON.stringify(emailArr));
        localStorage.setItem('passwordarr',JSON.stringify(passwordArr));
        window.location.href='login.html';
    }
});

