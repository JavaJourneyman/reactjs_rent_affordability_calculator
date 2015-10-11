(function(Reflux, global) {
    'use strict';

    // Each action is like an event channel for one specific event. Actions are called by components.
    // The store is listening to all actions, and the components in turn are listening to the store.
    // Thus the flow is: User interaction -> component calls action -> store reacts and triggers -> components update

    global.Actions = Reflux.createActions([
        "costChange", // called by individual cost item input    
        "withholdingChange", // called by individual cost item input
        "deleteItem", // called by delete button on cost item input
        "incomeChange" // called by changing income input field
    ]);

})(window.Reflux, window);

(function(Reflux, Actions, global) {
    'use strict';

    global.creatorStore = Reflux.createStore({
        init: function(){
            // listens to handleChange in CalcRow component
            this.listenTo(Actions.costChange, this.output);
        },
        // listens for mod and iVal
        output: function(mod, iVal){
            // passes mod and iVal to CalcApp
            this.trigger(mod, iVal);
        }
        });

    global.deleterStore = Reflux.createStore({
        init: function(){
            // listens to handleDelete on CalcRow component 
            this.listenTo(Actions.deleteItem, this.onDeleteItem);
        },
        onDeleteItem: function (item){
            this.trigger(item);
        }
    });

    global.incomeStore = Reflux.createStore({
        init: function(){
            // listens to handleDelete on CalcRow component 
            this.listenTo(Actions.incomeChange, this.onIncomeChange);
        },
        onIncomeChange: function (inc){
            this.trigger(inc);
        }
    });

        global.withholdingStore = Reflux.createStore({
        init: function(){
            // listens to handleChange in CalcRow component
            this.listenTo(Actions.withholdingChange, this.onChangeWitholdingAmount);
        },
        // listens for mod and iVal
        onChangeWitholdingAmount: function(mod, iVal){
            // passes mod and iVal to CalcApp
            // alert(iVal+'store');
            this.trigger(mod, iVal);
        }
    });



})(window.Reflux, window.Actions, window);


$('.calcApp_selectorButton').on('click', function(){
    $('.calcApp_selectorButton').removeClass('_calcApp_selectorButton--active');
    $(this).addClass('_calcApp_selectorButton--active');
    $('#calcApp_mainApp').addClass('calcApp_effect6');
    $('#calcApp_mainApp').css('background','white');
});

/** @jsx React.DOM */

(function(React, ReactRouter, Reflux, Actions, global) {
// (function(React, ReactRouter, Reflux, Actions, creatorStore, global) {

        mountNode = document.getElementById("calcApp_mainApp");

var catOne =  [
    {name  : 'Rent', value : '', icon : 'calcApp_expenseIcon calcAppFont calcAppFont-rent4', key : 0},
    {name  : 'Food', value : '', icon : 'calcApp_expenseIcon calcAppFont calcAppFont-plate7', key : 1},
    {name  : 'Transportation', value : '', icon : 'calcApp_expenseIcon calcAppFont calcAppFont-rolling', key : 2},
    {name  : 'Medical & Dental', value : '', icon : 'calcApp_expenseIcon calcAppFont calcAppFont-hospital32', key : 3},
    {name  : 'Fitness & Gym Membership', value : '', icon : 'calcApp_expenseIcon calcAppFont calcAppFont-weightlifter3', key : 4},
    {name  : 'Cell Phone', value : '', icon : 'calcApp_expenseIcon calcAppFont calcAppFont-cellphone96', key : 5},
    {name  : 'Debt Repayment', value : '', icon : 'calcApp_expenseIcon calcAppFont calcAppFont-money425', key : 6},
    {name  : 'Video Streaming / Cable', value : '', icon : 'calcApp_expenseIcon calcAppFont calcAppFont-video189', key : 7},
    {name  : 'Internet', value : '', icon : 'calcApp_expenseIcon calcAppFont calcAppFont-laptopcomputer8', key : 8},
    {name  : 'Utilities', value : '', icon : 'calcApp_expenseIcon calcAppFont calcAppFont-poor', key : 9},
    {name  : 'Clothing', value : '', icon : 'calcApp_expenseIcon calcAppFont calcAppFont-hanger22', key : 10},
    {name  : 'Entertainment', value : '', icon : 'calcApp_expenseIcon calcAppFont calcAppFont-disco', key : 11},
    {name  : 'Vacation Savings', value : '', icon : 'calcApp_expenseIcon calcAppFont calcAppFont-money360', key : 12}
      ],

    catTwo =  [
    {name  : 'Federal Income Tax', value : 20, key : 1},
    {name  : 'State & Local Income Tax', value : 10, key : 2},
    {name  : 'Social Security & Other', value : 5, key : 3}
];

// helper function can be called in to sum obj.values 
 var sumVals = function(sumThis){
    // setting up variables to sum all expense inputs 
    var i = 0; 
    var sum = 0;
    var s = sumThis; 
    // summing expense inputs 
    do {
        var c = s[i].value;
            if (isNaN(c)!== true) {
                sum = sum + Number(c); 
            }
        ++i;
    } while (i <= s.length-1);
    return sum;
 }

var CalcTable = React.createClass({displayName: "CalcTable",
  render: function() {

   income = this.props.income;

    var withHoldingsStyle = {
      maxHeight:'0px'
    };

    if (income > 0){
      withHoldingsStyle = {
        maxHeight:'1500px'
      };
    } 

    var ExpRows = [];
    this.props.cat1.forEach(function(item){
        ExpRows.push(
            React.createElement(CalcRow, {item: item, key: item.key, tabindex: item.key})
        );
    });
    //
    var WithHoldRows = [];
    this.props.cat2.forEach(function(item){
        WithHoldRows.push(
            React.createElement(WithholdingsRow, {item: item, key: item.key, income: income})
        );
    });
    return(
    React.createElement("div", {className: "calcApp_sectionContainer"}, 
    React.createElement("div", {style: this.props.showCalcApp, className: "calcApp_fadeInTransition"}, 

    React.createElement("h3", {className: "calcApp_sectionTitle"}, "Taxes and Other Monthly Paycheck Withholdings"), 
      React.createElement("p", {style: this.props.showCalcApp, className: "calcApp_instructions calcApp_fadeInTransition"}, React.createElement("span", {className: "calcApp_instructionsLabel"}, "Instructions: "), " Adjust the percentages below to estimate your paycheck withholdings"), 
      React.createElement("table", null, 
        React.createElement("tbody", null, 
          WithHoldRows
          )
      )
      ), 
      React.createElement("div", {className: "calcApp_sectionContainer calcApp_fadeInTransition", style: withHoldingsStyle}, 
      React.createElement("h3", {className: "calcApp_sectionTitle"}, "Monthly Expenses"), 
      React.createElement("p", {style: this.props.showCalcApp, className: "calcApp_instructions calcApp_fadeInTransition"}, React.createElement("span", {className: "calcApp_instructionsLabel"}, "Instructions: "), "Enter your monthly expenses below.  Remove an expense by clicking its orange button, or add a new expense with the form"), 
      React.createElement("table", null, 
        React.createElement("tbody", null, 
          ExpRows
          )
      )
      )
    )
    )
  }
});

var WithholdingsRow = React.createClass({displayName: "WithholdingsRow",
onWithholdChange: function(evt){

  // this tracks the key of the modified input
  var mod = evt -1;

  // value of modified input
  var iVal = event.target.value;

  Actions.withholdingChange(mod, iVal);
},
render: function(){

netincome = (income*this.props.item.value)/100/12;

  return(
    React.createElement("tr", null, 
      React.createElement("td", {className: "calcApp_expenseNameField"}, React.createElement("span", {className: "calcAppFont calcAppFont-money425 calcApp_expenseIcon"}), React.createElement("span", null, this.props.item.name)), 
      React.createElement("td", null, React.createElement("span", {className: "calcApp_inputIcon"}, "%"), React.createElement("input", {className: "calcApp_calcInsertExpenseField", value: numeral(this.props.item.value).format('0'), onChange: this.onWithholdChange.bind(this, this.props.item.key), placeholder: "Enter Value"})), 
      React.createElement("td", null, numeral(netincome).format('$0'))
    )
    )
}
});

var CalcRow = React.createClass({displayName: "CalcRow",
  handleChange: function(evt){
        // links to action in store.js
        //modified input
        var mod = evt; 
        // value of input
        var iVal = event.target.value;
        // sends mod and iVal to store
        Actions.costChange(mod, iVal);
  },
  handleDelete: function(item){
    // alert(item);
    Actions.deleteItem(item);
  },
  render: function() {
        return(
        React.createElement("tr", null, 
            React.createElement("td", {className: "calcApp_expenseNameField"}, React.createElement("span", {className: this.props.item.icon}), React.createElement("span", null, this.props.item.name)), 
            React.createElement("td", null, React.createElement("span", {className: "calcApp_inputIcon"}, "$"), React.createElement("input", {
                        type: "number", 
                        className: "calcApp_calcInsertExpenseField", 
                        placeholder: "Enter Amount", 
                        value: this.props.item.value, 
                        onChange: this.handleChange.bind(this, this.props.item.key)}
                      )
            ), 
            React.createElement("td", null, 
                React.createElement("button", {
                    onClick: this.handleDelete.bind(this, this.props.item.key), 
                    className: "calcApp_deleteButton calcAppFont calcAppFont-wrong"
                    })
            )
        )
        )
    }
});

var AddRowButton = React.createClass({displayName: "AddRowButton", 
     handleSubmit: function(e) {
        var newItem = this.refs.addNewItem.getDOMNode().value;
      e.preventDefault();
      // sends event to  handleSubmit function in CalcApp component
      this.props.onSubmit(newItem);
  },
  render: function(){
    return(
        React.createElement("form", {onSubmit: this.handleSubmit}, 
          React.createElement("input", {
          placeholder: "add new expense", 
          ref: "addNewItem", 
          className: "calcApp_addNewExpenseField"}
          ), 
          React.createElement("button", {className: "calApp_AddExpenseButton"}, "Add")
        )
      )
  }
});

var SectionSummary = React.createClass({displayName: "SectionSummary",
  render: function(){

var lessWithHoldings = (this.props.income*sumVals(this.props.cat2))/100/12; 
var currentSum = this.props.income/12 - sumVals(this.props.cat1);
currentSum = currentSum - lessWithHoldings;
currentSum =  numeral(currentSum).format('$0,0');

  return(
    React.createElement("div", {id: "calcApp_summaryWrapper", className: "calcApp_fadeInTransition", style: this.props.showCalcApp}, 
        React.createElement("div", {className: "table-summary"}, 
         React.createElement("h3", null, "How Much Money Will You Have Left Over?"), 
        React.createElement("p", {id: "calcApp_sumedFunds"}, currentSum)
        )
    )
    );
  }
});

var InputIncome = React.createClass({displayName: "InputIncome",
  getInitialState: function(){
    return{
      income: ''
    }
  },
  handleIncomeInput: function (){
   var inc = event.target.value;
  this.setState({
    income : inc
  });

  Actions.incomeChange(inc);
},
  render: function(){
    return(
      React.createElement("div", {id: "incomeInputWrap"}, 
        React.createElement("input", {className: "calcApp_incomeInputField", value: this.state.income, name: "currency", placeholder: "Enter Your Annual Income", onChange: this.handleIncomeInput, min: "0", step: "1", id: "calcIncomeInput"})
      )
      )
  }
});

var CalcApp = React.createClass({displayName: "CalcApp",
        getInitialState: function(){
            return{
                cat1: catOne,
                cat2: catTwo,
                income: '',
                showCalcApp : {maxHeight:'0px', padding: '0px' }
            }
         },
        onStatusChange: function(mod, iVal) {
            var v = this.state.cat1; 
            v[mod].value = iVal;
            this.setState({
                cat1: v
            });
        },
        onRowDelete: function(item){
            var BBB = this.state.cat1; 
            // removing the clicked row 
            BBB.splice(item, 1);
            var arL = BBB.length; 
            var i = 0; 
             // re-sets key values 
            do {
                    BBB[i].key = i; 
                    ++i;
            } while (i <= arL-1);
            this.setState({
                cat1:BBB
            });
        },
        onWithHoldInputChange: function(mod, iVal){
         var v = this.state.cat2;
         v[mod].value = Number(iVal);

         this.setState({
          cat2: v
         });

        },
        onIncomeInputChange: function(inc){
          if(inc > 0){
          this.setState({
            showCalcApp : { maxHeight:'1000px' }
          });
          } else {
            this.setState({
            showCalcApp : {maxHeight:'0px', padding: '0px' }
          });
          }
          this.setState({
            income: inc
          });
        },
        componentDidMount: function() {
        this.unsubscribe = creatorStore.listen(this.onStatusChange);
        this.blahblah = deleterStore.listen(this.onRowDelete);
        this.incomeIncomeIncome = incomeStore.listen(this.onIncomeInputChange);
        this.changeWithholdingAmounts = withholdingStore.listen(this.onWithHoldInputChange);
        },
        componentWillUnmount: function() {
        this.unsubscribe();
        this.blahblah();
        this.incomeIncomeIncome();
        },
        handleSubmit: function(newItem) {
        var newKeyVal = this.state.cat1.length;
        c1 = this.state.cat1; 
        c1.push({name : newItem, value : event.target.value, key : newKeyVal, icon : 'calcApp_expenseIcon calcAppFont calcAppFont-money132'});
        this.setState({
        cat1:c1
      });
    },
  render: function() {
    return (
      React.createElement("div", null, 
          React.createElement("h3", {className: "calcApp_calcTitle"}, "Detailed Rent Calculator"), 
          React.createElement(InputIncome, null), 
          React.createElement(CalcTable, {cat1: this.state.cat1, cat2: this.state.cat2, income: this.state.income, showCalcApp: this.state.showCalcApp}), 
         React.createElement("div", {id: "calcApp_addExpenseWrap", className: "calcApp_effect6", style: this.state.showCalcApp}, 
         React.createElement("h3", null, "Add Another Expense:"), 
            React.createElement(AddRowButton, {cat1: this.state.cat1, ref: "addNewItem", onSubmit: this.handleSubmit, showCalcApp: this.state.showCalcApp})
          ), 
            React.createElement(SectionSummary, {cat1: this.state.cat1, cat2: this.state.cat2, income: this.state.income, showCalcApp: this.state.showCalcApp})
      )
    );
  }
});

var simpleCalcApp = React.createClass({displayName: "simpleCalcApp",
  getInitialState: function(){
    return {
      simpleCalcVal: '',
      simpleEstimate: '0'
    }
  },
handleSimpleCalcChange: function(){

  var simVal = event.target.value;


  this.setState({
    simpleCalcVal : simVal,
    simpleEstimate:  numeral(simVal*.30/12).format('$0,000') 
  });
},
render: function(){
    var showSection = {maxHeight: '0px', overflow: 'hidden', minHeight: '0px', padding: '0px'}; 

 if( this.state.simpleCalcVal > 0 ){
    showSection = {maxHeight: '400px'}    
  }

  unformatedSimpEst = numeral(this.state.simpleEstimate).format('0');

  return(
    React.createElement("div", {className: "calcApp_simpleCalcApp"}, 
    React.createElement("h3", {className: "calcApp_calcTitle"}, "Simple Rent Calculator"), 
    React.createElement("input", {className: "calcApp_incomeInputField", value: this.state.simpleCalcVal, placeholder: 'Enter Your Annual Income', onChange: this.handleSimpleCalcChange}), 
    React.createElement("div", {className: "simpleCalc_moneyleft calcApp_fadeInTransition", style: showSection}, React.createElement("h3", null, "Your Maximum Recommended Rent is:"), React.createElement("p", {className: "simpleCalc_output"}, this.state.simpleEstimate), 
        React.createElement("p", {className: "calcApp_summaryText"}, "Your maximum suggested rent is ", this.state.simpleEstimate, " and you will have $", numeral(this.state.simpleCalcVal/12-unformatedSimpEst).format('0,0'), " left over before taxes and other deductions")
    )
  )
  )
}
});

var calcapp_intro = React.createClass({displayName: "calcapp_intro",
  render: function(){
    return(
    React.createElement("div", {className: "calcApp_descriptionContainer"}, 
      React.createElement("div", {className: "calcApp_typeDescription"}, 
        React.createElement("span", {className: "calcAppFont calcAppFont-keyboard53 calcApp_typeArrow"}), 
        React.createElement("p", {className: "calcApp_typeDescriptionText"}, "(Takes 20 Seconds ", React.createElement("br", null), " to Complete)")
      ), 
      React.createElement("div", {className: "calcApp_typeDescription"}, 
        React.createElement("span", {className: "calcAppFont calcAppFont-keyboard53 calcApp_typeArrow"}), 
        React.createElement("p", {className: "calcApp_typeDescriptionText"}, "(Takes 5 to 10 Minutes ", React.createElement("br", null), " to Complete)")
      )
    )
    )
  }
});

var App = React.createClass({displayName: "App",
render: function(){
  var Child;
  switch (this.props.route){
    case 'calcapp': Child= CalcApp; break;
    case 'simpleCalcApp': Child = simpleCalcApp; break;
    case 'calcapp_intro': Child = calcapp_intro; break;
    default: Child = CalcApp; break; 
  }

  return(
    React.createElement("div", null, 
      React.createElement(Child, null)
    )
    )
}
});

function render(evt){
React.render(React.createElement(App, {route: evt}), mountNode);
}

// this code auto renders the calc app --- remove it when finsihed workoing on calc app
  var calcType = 'calcapp_intro';
  render(calcType);

document.getElementById("calcApp_detailedCalc").addEventListener("click", function(){
  var calcType = 'calcapp';
  render(calcType);
});

document.getElementById("calcApp_simpleCalc").addEventListener("click", function(){
  var calcType = 'simpleCalcApp';
  render(calcType);
});

// render();

})(window.React, window.ReactRouter, window.Reflux, window.Actions, window.creatorStore, window);
