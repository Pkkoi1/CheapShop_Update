function ktratendn() {
    let pattendn=/^[A-Za-z]+\w{2,}$/;
    let ten=document.getElementById('username_text').value;
    if(!pattendn.test(ten))
    {
        document.getElementById('ertendn').innerHTML="Sai tên đăng nhập. Không được chứa ký tự đặc biệt và dấu cách";
        return false;
    }
    else
    {
        document.getElementById('ertendn').innerHTML="";
        return true;
    }
    
  }
  function ktrtrungmk() {
    let mk=document.getElementById('txtpwd').value;
    let mkre=document.getElementById('txtpwdre').value;
    let result=mk.localeCompare(mkre);
    if(result)
    {
        document.getElementById('erpwdre').innerHTML="Mật khẩu không trùng nhau";
        return false;
    }
    else
    {
        document.getElementById('erpwdre').innerHTML="";
        return true;
  
    }
}  
    function ktTrong(){
    let ten=document.getElementById('username_text').value;
    let mk=document.getElementById('txtpwd').value;
    let mkre=document.getElementById('txtpwdre').value;
    if(ten==""||mk==""||mkre==""){
        document.getElementById('erpwdre').innerHTML="Chưa nhập đủ thông tin";
        return false;
    }
    else{
        document.getElementById('erpwdre').innerHTML="";
        return true;
    }
    }
sign_up_form.addEventListener('submit', (event) => {
    event.preventDefault();
    if(ktratendn() && ktrtrungmk() &&ktTrong()) 
    {
      alert('Đăng ký thành công!');
      // Chuyển hướng đến trang chính của trang web
      window.location.href = 'Main.html';
    } 
    
  });