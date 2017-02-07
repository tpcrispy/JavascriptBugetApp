// BUDGET CONTROLLER
const budgetController = (function(){


  const Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  const Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  const data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  };

  const calculateTotal = function(type){
    let sum = 0;
    data.allItems[type].forEach(function(cur){
      sum += cur.value;
    });
    data.totals[type] = sum;
  };

  return {
    addItem: function(type, des, val) {
      var newItem, ID;
      //create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }
      //push it to data
      data.allItems[type].push(newItem);
      return newItem;

    },

    deleteItem: function(type, id) {
      let ids = data.allItems[type].map(function(current){
        return current.id;
      });

      let index = ids.indexOf(id);

      if (index !== -1) {
        data.allItems[type].splice(index, 1);

      }
    },

    calculateBudget: function() {
      //calculate total income and expenses
      calculateTotal('inc');
      calculateTotal('exp');
      //calculate the budget
      data.budget = data.totals.inc - data.totals.exp;
      //calc % of income we spent
      if (data.totals.inc) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
        }
      },
    getBudget: function () {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      };
    },

    testing: function(){
      console.log(data);
    }
  };

  })();



// UI CONTROLLER
const UIController = (function (){
  const DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container'
  }

  return {
    getinput: function(){
      return {
        type: document.querySelector(DOMstrings.inputType).value, //Will be either inc or expenses
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      }
    },
    addListItem: function(obj, type){
      var html, newHtml, element;
      if(type=='exp') {
        element = DOMstrings.expensesContainer;
        html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">-%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      } else {
        element = DOMstrings.incomeContainer;
        html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      }
        newHtml = html.replace('%id%', obj.id);
        newHtml = newHtml.replace('%description%', obj.description);
        newHtml = newHtml.replace('%value%', obj.value);

        document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },
    deleteListItem: function(selectorID) {
      var ele = document.getElementById(selectorID)
      ele.parentNode.removeChild(ele);
    },
    clearFields: function() {

      let fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);

      let fieldsArr = Array.prototype.slice.call(fields);
      fieldsArr.forEach(function (current, index, arr) {
        current.value = '';
      });
      fieldsArr[0].focus();
    },
    displayBudget: function(obj){

      document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;

      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';

      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = '---';

      }



    },

    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();

//GLOBAL APP CONTROLLER
const controller = (function (budgetCtrl, UICtrl){
  const setupEventListeners = function(){
    const DOM = UICtrl.getDOMstrings();
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', function(e){
      //if the enter key is pressed
      if (e.keyCode === 13 || e.which === 13) {
        ctrlAddItem();
      }
    });
    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
  };

  const updateBudget = function() {
    //calculate the budget
    budgetCtrl.calculateBudget();

    //returns the budget
    var budget = budgetCtrl.getBudget();

    //display the budget on the UI
    UICtrl.displayBudget(budget);

  }

  const ctrlAddItem = function(){
    var input, newItem;
    //values of field input
     input = UICtrl.getinput();
     if (input.description !== "" && !isNaN(input.value) && input.value > 0){
       // add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        // Add the item to the UI
        UICtrl.addListItem(newItem, input.type);
        //clear the fields
        UICtrl.clearFields();
        //calculate and update the budget
        updateBudget();

     }

  };

  const ctrlDeleteItem = function(e) {
    let itemID = e.target.parentNode.parentNode.parentNode.parentNode.id

    if (itemID) {
      let splitID = itemID.split('-');
      let type = splitID[0];
      let ID = parseInt(splitID[1]);

      //delete the item from the data stuc
        budgetCtrl.deleteItem(type, ID);
      // delete the item from the UI
      UICtrl.deleteListItem(itemID);

      //Update and show the new budget
      updateBudget();


    }
  }

  return {
    init: function(){
      console.log('Application has started.');
      setupEventListeners();
    }
  }
})(budgetController, UIController);

controller.init();































//
