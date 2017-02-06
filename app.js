// BUDGET CONTROLLER
const budgetController = (function(){

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
    //values of field input
    const input = UICtrl.getinput();
    console.log(input);
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
