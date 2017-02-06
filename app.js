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


const controller = (function (budgetCtrl, UICtrl){
  const DOM = UICtrl.getDOMstrings();

  const ctrlAddItem = function(){
    //values of field input
    const input = UICtrl.getinput();
    console.log(input);


  }
  document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
  document.addEventListener('keypress', function(e){
    //if the enter key is pressed
    if (e.keyCode === 13 || e.which === 13) {
      ctrlAddItem();
    }
  });

})(budgetController, UIController);

































//
