const balance = document.querySelector('.balance');
const incomes = document.querySelector('.incomes');
const expenses = document.querySelector('.expenses');
const list = document.querySelector('.list');
const amount = document.querySelector('#amount');
const form = document.querySelector('#form');
const text = document.querySelector('#text');
const btn = document.querySelector('.btn');
const deletebtn = document.querySelector('.delete-btn');



const localStorageTransactions = JSON.parse(
    localStorage.getItem('transactions')
  );
  
  let transactions =
    localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

    
    // Generate random ID
 const  generateID = () =>  Math.floor(Math.random() * 1000000);
  

  addTransaction = e => {
    e.preventDefault();
  
    if (text.value.trim() === '' || amount.value.trim() === '') {
      alert('Please add a Text and Amount');
    } 
    
    else {
      const transaction = {
        id: generateID(),
        text: text.value,
        cashValue: +amount.value
      };
  
      transactions.push(transaction);
  
      addTransactionDOM(transaction);
  
      updateValues();
  
      updateLocalStorage();
      text.value = '';
      amount.value = '';
    }
  }

  
// Update local storage transactions
 const updateLocalStorage = () =>  localStorage.setItem('transactions', JSON.stringify(transactions));
 
// Update the balance, income and expense
const  updateValues = () => {
    const cashValues = transactions.map(transaction => transaction.cashValue);
  
    const total = cashValues.reduce((sum, item) => (sum += item), 0);
  
    const income = cashValues
      .filter(item => item > 0)
      .reduce((sum, item) => (sum += item), 0)
  
    const expense = (
      cashValues.filter(item => item < 0)
      .reduce((acc, item) => (acc += item), 0) *  -1
    )
  
    balance.innerText = `#${total}`;
    incomes.innerText = `#${income}`;
    expenses.innerText = `#${expense}`;

  }

  
    // Add transactions to DOM list
 const addTransactionDOM = transaction => {
     // Get sign
    const sign = transaction.cashValue < 0 ? '-' : '+';
    const item = document.createElement('li');
    // Add class based on value
        item.classList.add(transaction.cashValue < 0 ? 'minus' : 'plus');
    
        item.innerHTML = `
            ${transaction.text.toUpperCase()}<span>${sign}${Math.abs(
             transaction.cashValue)}</span><button onclick="removeTransaction(${
            transaction.id})" class="delete-btn" })">X</button> `;
    
        list.appendChild(item);
  }
  

    // Remove transaction by ID
    const  removeTransaction = id => {
        transactions = transactions.filter(transaction => transaction.id !== id);
        updateLocalStorage();
        initApp();
  }

     const initApp = () => {
        list.innerHTML = '';
        transactions.forEach(addTransactionDOM);
        updateValues();
  }

    initApp()
    form.addEventListener('submit', addTransaction);
 