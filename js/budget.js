
var budgetForm = document.getElementById("budgetForm");
var expenseForm = document.getElementById("expenseForm");
var remainingBudgetElement = document.getElementById("remainingBudget");
var expensesBody = document.getElementById("expensesBody");
var overviewBody = document.getElementById("overviewBody");
var totalAmountElement = document.getElementById("totalAmount");
var totalExpensesElement = document.getElementById("totalExpenses");
var remainingBalanceElement = document.getElementById("remainingBalance");

let monthlyBudget = 0;
let expenses = [];

budgetForm.addEventListener("submit", function(event) {
  event.preventDefault();
  var budgetInput = document.getElementById("budgetInput");
  var budget = parseFloat(budgetInput.value);

  if (!isNaN(budget)) {
    monthlyBudget = budget;
    budgetInput.value = "";
    updateRemainingBudget();
    updateOverview();
  }
});

expenseForm.addEventListener("submit", function(event) { 
  event.preventDefault();
  var descriptionInput = document.getElementById("descriptionInput");
  var amountInput = document.getElementById("amountInput");
  var dateInput = document.getElementById("dateInput");

  var description = descriptionInput.value;
  var amount = parseFloat(amountInput.value);
  var date = dateInput.value;

  if (description.trim() === "" || isNaN(amount) || date === "") {
    showError("Please enter valid expense details.");
    return;
  }

  var expense = {
    description,
    amount,
    date
  };

  expenses.push(expense);

  descriptionInput.value = "";
  amountInput.value = "";
  dateInput.value = "";

  displayExpenses();
  updateRemainingBudget();
  updateOverview();
});

function displayExpenses() {
  expensesBody.innerHTML = "";

  for (let i = 0; i < expenses.length; i++) {
    var expense = expenses[i];

    var row = document.createElement("tr");
    row.innerHTML = `
      <td>${expense.description}</td>
      <td>$${expense.amount.toFixed(2)}</td>
      <td>${expense.date}</td>
      
      <td class="actions">
        <button onclick="editExpense(${i})"><i class="fa-regular fa-pen-to-square" style="color: #d77d42;"></i></button>
        <button onclick="deleteExpense(${i})"><i class="fa-solid fa-trash" style="color: #e8994f;"></i></button>
      </td>
    `;

    expensesBody.appendChild(row);
  }
}

function calculateTotalBalance(index) {
  let totalBalance = monthlyBudget;
  for (let i = 0; i < expenses.length; i++) {
    if (i !== index) {
      totalBalance -= expenses[i].amount;
    }
  }
  return totalBalance;
}

function updateRemainingBudget() {
  var totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  var remaining = monthlyBudget - totalExpenses;
  remainingBudgetElement.textContent = `Remaining Budget: $${remaining.toFixed(2)}`;
}

function updateOverview() {
  var totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  var remainingBalance = monthlyBudget - totalExpenses;

  totalAmountElement.textContent = `$${monthlyBudget.toFixed(2)}`;
  totalExpensesElement.textContent = `$${totalExpenses.toFixed(2)}`;
  remainingBalanceElement.textContent = `$${remainingBalance.toFixed(2)}`;
}

function editExpense(index) {
  var expense = expenses[index];

  var descriptionInput = document.getElementById("descriptionInput");
  var amountInput = document.getElementById("amountInput");
  var dateInput = document.getElementById("dateInput");

  descriptionInput.value = expense.description;
  amountInput.value = expense.amount;
  dateInput.value = expense.date;

  expenses.splice(index, 1);
  displayExpenses();
  updateRemainingBudget();
  updateOverview();
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  displayExpenses();
  updateRemainingBudget();
  updateOverview();
}


