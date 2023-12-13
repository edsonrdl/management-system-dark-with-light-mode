const sideMenu =document.querySelector("aside");
 const menuBtn=document.querySelector("#menu-btn");
 const closeBtn =document.querySelector("#close-btn");
 const themeToggler=document.querySelector('.theme-toggler');


 menuBtn.addEventListener('click',()=>{
    sideMenu.style.display='block';
 })

 closeBtn.addEventListener('click',()=>{
    sideMenu.style.display='none';
 })

 themeToggler.addEventListener('click',()=>{
    document.body.classList.toggle('dark-theme-variables');
    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
 })

 function atualizarData() {
  const agora = new Date();
  const dia = agora.getDate();
  const mes = agora.getMonth() + 1; 
  const ano = agora.getFullYear();

  const formatoData = `${dia < 10 ? '0' : ''}${dia}/${mes < 10 ? '0' : ''}${mes}/${ano}`;

  document.getElementById('data-atual').innerText = formatoData;
}


atualizarData();
 
 function showContentMain(contentId) {
   const allContentMain = document.querySelectorAll('.main-contant');
   console.log(allContentMain);
   allContentMain.forEach(contentMain => {
    contentMain.classList.add('disabled-content');
   });

   const contentMainActive = document.getElementById(contentId);
   contentMainActive.classList.remove('disabled-content');
}


 
 const  graphicSales=()=>{
   let circularPorgress =document.querySelector(".circular-progress-sales"),progressValue=document.querySelector(".progress-value-sales");
 
   let progressStartValue=0,
   progressEndValue=90,
   speed=100;
   let progress =setInterval(()=>{
     progressStartValue++;
   
     progressValue.textContent=`${progressStartValue}%`;
     circularPorgress.style.background=`conic-gradient( #BA58EF ${progressStartValue * 3.6}deg ,#ffffff 0deg)`;
     if(progressStartValue==progressEndValue){
       clearInterval(progress);
     }
   },speed);
 }

 graphicSales();

 const  graphicExpenses=()=>{
   let circularPorgress =document.querySelector(".circular-progress-expenses"),progressValue=document.querySelector(".progress-value-expenses");
 
   let progressStartValue=0,
   progressEndValue=50,
   speed=100;
   let progress =setInterval(()=>{
     progressStartValue++;
   
     progressValue.textContent=`${progressStartValue}%`;
     circularPorgress.style.background=`conic-gradient( #BA58EF ${progressStartValue * 3.6}deg ,#ffffff 0deg)`;
     if(progressStartValue==progressEndValue){
       clearInterval(progress);
     }
   },speed);
 }
 graphicExpenses();

 const  graphicIncome=()=>{
   let circularPorgress =document.querySelector(".circular-progress-income"),progressValue=document.querySelector(".progress-value-income");
 
   let progressStartValue=0,
   progressEndValue=30,
   speed=100;
   let progress =setInterval(()=>{
     progressStartValue++;
   
     progressValue.textContent=`${progressStartValue}%`;
     circularPorgress.style.background=`conic-gradient( #BA58EF ${progressStartValue * 3.6}deg ,#ffffff 0deg)`;
     if(progressStartValue==progressEndValue){
       clearInterval(progress);
     }
   },speed);
 }
 graphicIncome();
 
//  Orders.forEach(order => {
//     const tr=document.createElement('tr');
//     const trContent=`
//     <td>${}</td>
//     <td>${}</td>
//     <td>${}</td>
//     <td class="${order.shipping==='Declined'?'danger':order.shipping==='pending'?'Warning':'primary'}">${}</td>
//     <td class="primary">${}</td>`;
//     tr.innerHTML=trContent;
//     document.querySelector('table tbody').appendChild(tr);
    
//  });