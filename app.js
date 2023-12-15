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
   allContentMain.forEach(contentMain => {
    contentMain.classList.add('disabled-content');
   });

   const contentMainActive = document.getElementById(contentId);
   contentMainActive.classList.remove('disabled-content');
}

const valueProgressSales=90;
const valueProgressExpenses=50;
const valueProgressIncome=30;
const valueProgressCanceled=3;
const valueProgressProductivity=23;
const createCircularProgress = (circularProgressSelector, progressValueSelector, progressEndValue) => {
  let circularProgress = document.querySelector(circularProgressSelector);
  let progressValue = document.querySelector(progressValueSelector);

  let progressStartValue = 0;
  let speed = 100;

  let progress = setInterval(() => {
    progressStartValue++;

    progressValue.textContent = `${progressStartValue}%`;
    circularProgress.style.background = `conic-gradient( #BA58EF ${progressStartValue * 3.6}deg ,#ffffff 0deg)`;

    if (progressStartValue === progressEndValue) {
      clearInterval(progress);
    }
  }, speed);
};

createCircularProgress(".circular-progress-sales", ".progress-value-sales", valueProgressSales);
createCircularProgress(".circular-progress-expenses", ".progress-value-expenses", valueProgressExpenses);
createCircularProgress(".circular-progress-income", ".progress-value-income", valueProgressIncome);
createCircularProgress(".circular-progress-income", ".progress-value-canceled", valueProgressCanceled);
createCircularProgress(".circular-progress-income", ".progress-value-productivity", valueProgressProductivity);

 
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

const orderToday = 'ordersToday.json';
const tbodyOrdersRecentToday = document.querySelector('#tbody-orders-today');

const fetchOrdersToday = async () => {
  try {
    const response = await fetch(orderToday);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const orders = await response.json();
    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return null;
  }
}

const loadOrdersToday = async () => {
  const orders = await fetchOrdersToday();

  if (orders) {
    const orderValidate=orders.orders;
    tbodyOrdersRecentToday.innerHTML = '';

    orderValidate.forEach(order => {
      console.log(order);
      const tr = document.createElement('tr');
      const trContent = `
        <td>${order.client}</td>
        <td>${order.numberProduct}</td>
        <td class="${order.status === 'Cancelado' ? 'canceled' : order.status === 'Pendente' ? 'primary' : 'success'}">${order.status}</td>
      `;
      tr.innerHTML = trContent;
      tbodyOrdersRecentToday.appendChild(tr);
      console.log(tbodyOrdersRecentToday); 

    });
  } else {
    console.error('Failed to load orders.');
  }
}

loadOrdersToday();



function showContentMain(contentId) {
   const allContentMain = document.querySelectorAll('.main-contant');
   allContentMain.forEach(contentMain => {
    contentMain.classList.add('disabled-content');
   });

   const contentMainActive = document.getElementById(contentId);
   contentMainActive.classList.remove('disabled-content');
}




const filterOrderCalendar = async (selectedDateCalendar) => {
  try {
    const dateObject = new Date(selectedDateCalendar);
    dateObject.setUTCDate(dateObject.getUTCDate() + 1);

    const formattedDate = formatDateCalendar(dateObject);
    function formatDateCalendar(date) {
      const day = date.getDate();
      const month = date.getMonth() + 1; 
      const year = date.getFullYear();

      const formattedDay = day < 10 ? `0${day}` : day;
      const formattedMonth = month < 10 ? `0${month}` : month;

      return `${formattedDay}/${formattedMonth}/${year}`;
    }

    const url = `http://localhost:8080/order/orders-by-date?orderDate=${formattedDate}`;

    const response = await fetch(url);
    const ordersByDate = await response.json();
    loadOrdersDate (ordersByDate);

    return ordersByDate;
  } catch (error) {
    throw error; 
  }
};

function loadOrdersDate (ordersByDate) {
  const orders = ordersByDate;
  tbodyOrdersDateAll.innerHTML = ''

  orders.forEach(order => {
    const orderTime = new Date(order.orderTime).toLocaleString();
   const tr=document.createElement('tr');
   const trContent=`
   <td>${order.client.name}</td>
    <td>${order.numberOrder}</td>
   <td>${orderTime}</td>
   <td class="${order.orderClientStatus === 'CANCELED' ? 'danger' : order.orderClientStatus === 'PENDING' ? 'primary' : order.orderClientStatus === 'CONCLUDED' ? 'success' : 'success'}">${order.orderClientStatus}</td>
   <td class="item-button" onclick="toggleItemOrder(${order.id})">Ver Itens</td>`;
    tr.innerHTML=trContent;
    document.querySelector('#tbody-orders-date-all').appendChild(tr);


  });
}
//Exibir itens do id pedido
const toggleItemOrder = async (idOrderClient)=> {
  const urlItensOrderClient = `http://localhost:8080/order/${idOrderClient}/items-order`;
  
  const responseUrlItensOrderClient= await fetch(urlItensOrderClient);
  const ItemsOrderClient = await responseUrlItensOrderClient.json();

  const urlTotalValueItens= `http://localhost:8080/order/${idOrderClient}/total-value-items`;
  
  const responseUrlTotalValueItens = await fetch(urlTotalValueItens);
  const totalValueOrder = await responseUrlTotalValueItens.json();


  loaditemsOrderClient(ItemsOrderClient,totalValueOrder);
  
};

function loaditemsOrderClient(ItemsOrderClient, totalValueOrder) {
  tbodyOrderItemsAll.innerHTML = '';

  if (ItemsOrderClient.length > 0) {
    for (const itemOrder of ItemsOrderClient) {
      const totalOrderValeu = document.querySelector('#total-order-value');
      totalOrderValeu.innerText=`Total do Pedido R$ :${totalValueOrder}`;

      const tr = document.createElement('tr');
      const trContent = `
        <td>${itemOrder.number}</td>
        <td>${itemOrder.name}</td>
        <td>${itemOrder.value}</td>
        <td>${itemOrder.amount}</td>`;
      tr.innerHTML = trContent;
      document.querySelector('#tbody-orders-items-all').appendChild(tr);
    }
  } else {
    const tr = document.createElement('tr');
    const trContent = `
      <td>Vazio</td>
      <td>Vazio</td>
      <td>Vazio</td>
      <td>Vazio</td>
      <td>Total do pedido : vazio</td>`;
    tr.innerHTML = trContent;
    document.querySelector('#tbody-orders-items-all').appendChild(tr);
  }
};

