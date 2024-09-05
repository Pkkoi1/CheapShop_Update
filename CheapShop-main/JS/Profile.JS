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

function ktPass()
{
  let mkS = document.getElementById("password_text").value;
let pattendn = /^\w+?$/;
if(!pattendn.test(mkS))
{
  document.getElementById('ertenpw').innerHTML = "Nhập mật khẩu";
  return false;
}
else 
{
  document.getElementById('ertenpw').innerHTML = "";
  return true;
}
}
function ktrans() {
  let ngaysinh=document.getElementById('datens').value;
  ngaysinh = new Date(ngaysinh);
  let cur= new Date();
  let tuoi=cur.getFullYear()-ngaysinh.getFullYear();
  if(tuoi<18)
  {
      document.getElementById('erns').innerHTML="Tuổi phải từ 18 tuổi trở lên";
      return false;
  }
  else{
      document.getElementById('erns').innerHTML="*";
      return true;
  }
}
function dangky() {
  if(ktratendn()&&ktrans()&&ktrtrungmk())
  {
      let ten=document.getElementById('txttendn').value;
      let ngaysinh=document.getElementById('datens').value;
     let mk=document.getElementById('txtpwd').value;

      let newrow=" <tr> <td>"+ten+"</td>  <td>"+mk+"</td>  <td>"+ngaysinh+"</td> </tr>";
      document.getElementById("tbl").innerHTML+=newrow;
  } 
}
login_form.addEventListener('submit', (event) => {
  event.preventDefault();
  if(ktratendn() && ktPass()) 
  {
    alert('Đăng nhập thành công!');
    // Chuyển hướng đến trang chính của trang web
    window.location.href = 'Main.html';
  } 
  
});
