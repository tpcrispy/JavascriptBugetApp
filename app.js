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
    }
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
    inputBtn: '.add__btn'
  }

  return {
    getinput: function(){
      return {
        type: document.querySelector(DOMstrings.inputType).value, //Will be either inc or expenses
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
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
  };

  const ctrlAddItem = function(){
    var input, newItem;
    //values of field input
     input = UICtrl.getinput();
     console.log(input);

    // add the item to the budget controller
     newItem = budgetCtrl.addItem(input.type, input.description, input.value);
  };

  return {
    init: function(){
      console.log('Application has started.');
      setupEventListeners();
    }
  }
})(budgetController, UIController);

controller.init();































//
