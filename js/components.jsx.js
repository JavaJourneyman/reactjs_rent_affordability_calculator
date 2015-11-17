
$('.calcApp_selectorButton').on('click', function(){
    $('.calcApp_selectorButton').removeClass('_calcApp_selectorButton--active');
    $(this).addClass('_calcApp_selectorButton--active');
    $('#calcApp_mainApp').addClass('calcApp_effect6');
    $('#calcApp_mainApp').addClass('calcApp_mainApp--white');
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

var CalcTable = React.createClass({
  render: function() {

   income = this.props.income;

    var withHoldingsStyle = 'calcApp_hideShowWithHoldings--hide '

    if (income > 0){
      withHoldingsStyle = 'calcApp_hideShowWithHoldings--show '
    } 

    var ExpRows = [];
    this.props.cat1.forEach(function(item){
        ExpRows.push(
            <CalcRow item={item} key={item.key} tabindex={item.key}/>
        );
    });
    //
    var WithHoldRows = [];
    this.props.cat2.forEach(function(item){
        WithHoldRows.push(
            <WithholdingsRow item={item} key={item.key} income={income}/>
        );
    });
    return(
    <div className="calcApp_sectionContainer">
    <div className={'calcApp_fadeInTransition '+this.props.showCalcApp}>

    <h3 className="calcApp_sectionTitle">Taxes and Other Monthly Paycheck Withholdings</h3>
      <p className={'calcApp_instructions calcApp_fadeInTransition'+this.props.showCalcApp}><span className="calcApp_instructionsLabel">Instructions: </span> Adjust the percentages below to estimate your paycheck withholdings</p>
      <table>
        <tbody>
          {WithHoldRows}
          </tbody>
      </table>
      </div>
      <div className={withHoldingsStyle+"calcApp_sectionContainer calcApp_fadeInTransition"}>
      <h3 className="calcApp_sectionTitle">Monthly Expenses</h3>
      <p className={'calcApp_instructions calcApp_fadeInTransition'+this.props.showCalcApp}><span className="calcApp_instructionsLabel">Instructions: </span>Enter your monthly expenses below.  Remove an expense by clicking its orange button, or add a new expense with the form</p>
      <table>
        <tbody>
          {ExpRows}
          </tbody>
      </table>
      </div>
    </div>
    )
  }
});

var WithholdingsRow = React.createClass({
onWithholdChange: function(evt, event){

  // this tracks the key of the modified input
  var mod = evt -1;

  // value of modified input
  var iVal = event.target.value;

  Actions.withholdingChange(mod, iVal);
},
render: function(){

netincome = (income*this.props.item.value)/100/12;

  return(
    <tr>
    <td className="calcAppFont calcAppFont-money425 calcApp_expenseIcon"></td>
      <td className="calcApp_expenseNameField">{this.props.item.name}</td>
      <td><span className="calcApp_inputIcon">%</span><input className="calcApp_calcInsertExpenseField" value={numeral(this.props.item.value).format('0')} onChange={this.onWithholdChange.bind(this, this.props.item.key)} placeholder="Enter Value"/></td>
      <td>{numeral(netincome).format('$0,000')}</td>
    </tr>
    )
}
});

var CalcRow = React.createClass({
  handleChange: function(evt, event){

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
        <tr>
            <td className={this.props.item.icon}></td>
            <td className="calcApp_expenseNameField">{this.props.item.name}</td>
            <td><span className="calcApp_inputIcon">$</span><input 
                        type="number" 
                        className="calcApp_calcInsertExpenseField" 
                        placeholder="Enter Amount"
                        value={this.props.item.value}   
                        onChange={this.handleChange.bind(this, this.props.item.key)}
                      />
            </td>
            <td>
                <button 
                    onClick={this.handleDelete.bind(this, this.props.item.key)}
                    className="calcApp_deleteButton calcAppFont calcAppFont-wrong"
                    ></button>
            </td>
        </tr>
        )
    }
});

var AddRowButton = React.createClass({ 
     handleSubmit: function(e) {
        var newItem = this.refs.addNewItem.getDOMNode().value;
      e.preventDefault();
      // sends event to  handleSubmit function in CalcApp component
      this.props.onSubmit(newItem);
  },
  render: function(){
    return(
        <form onSubmit={this.handleSubmit} >
          <input 
          placeholder="add new expense" 
          ref="addNewItem"
          className="calcApp_addNewExpenseField"
          />
          <button className="calApp_AddExpenseButton">Add</button>
        </form>
      )
  }
});

var SectionSummary = React.createClass({
  render: function(){

var lessWithHoldings = (this.props.income*sumVals(this.props.cat2))/100/12; 
var currentSum = this.props.income/12 - sumVals(this.props.cat1);
currentSum = currentSum - lessWithHoldings;
currentSum =  numeral(currentSum).format('$0,0');

  return(
    <div id="calcApp_summaryWrapper" className={'calcApp_fadeInTransition '+this.props.showCalcApp}>
         <h3>How Much Money Will You Have Left Over?</h3>
        <p id="calcApp_sumedFunds">{currentSum}</p>
    </div>
    );
  }
});

var InputIncome = React.createClass({
  getInitialState: function(){
    return{
      income: ''
    }
  },
  handleIncomeInput: function (event){
   var inc = event.target.value;
  this.setState({
    income : inc
  });

  Actions.incomeChange(inc);
},
  render: function(){
    return(
      <div id="incomeInputWrap">
        <input className="calcApp_incomeInputField" value={this.state.income} name="currency" placeholder="Enter Your Annual Income" onChange={this.handleIncomeInput} min="0" step="1" id="calcIncomeInput"/>
      </div>
      )
  }
});

var CalcApp = React.createClass({
        getInitialState: function(){
            return{
                cat1: catOne,
                cat2: catTwo,
                income: '',
                showCalcApp : 'calcApp_hideShowSummary--hide '
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
            showCalcApp : 'calcApp_hideShowSummary--show '
          });
          } else {
            this.setState({
            showCalcApp : 'calcApp_hideShowSummary--hide '
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
      <div>
          <h3 className="calcApp_calcTitle">Detailed Rent Calculator</h3>
          <InputIncome/>
          <CalcTable  cat1={this.state.cat1} cat2={this.state.cat2} income={this.state.income} showCalcApp={this.state.showCalcApp}/>
         <div id="calcApp_addExpenseWrap" className={'calcApp_effect6 '+this.state.showCalcApp}>
         <h3>Add Another Expense:</h3>
            <AddRowButton cat1={this.state.cat1} ref="addNewItem" onSubmit={this.handleSubmit} showCalcApp={this.state.showCalcApp} />
          </div>
            <SectionSummary cat1={this.state.cat1} cat2={this.state.cat2} income={this.state.income} showCalcApp={this.state.showCalcApp} />
      </div>
    );
  }
});

var simpleCalcApp = React.createClass({
  getInitialState: function(){
    return {
      simpleCalcVal: '',
      simpleEstimate: '0'
    }
  },
handleSimpleCalcChange: function(event){
  var simVal = event.target.value;

  this.setState({
    simpleCalcVal : simVal,
    simpleEstimate:  numeral(simVal*.30/12).format('$0,000') 
  });
},
render: function(){
    var showSection = 'calcApp_hideShowClass--hide ' 

 if( this.state.simpleCalcVal > 0 ){
    showSection = 'calcApp_hideShowClass--show '    
  }

  unformatedSimpEst = numeral(this.state.simpleEstimate).format('0');

  return(
    <div className="calcApp_simpleCalcApp">
    <h3 className="calcApp_calcTitle">Simple Rent Calculator</h3>
    <input className="calcApp_incomeInputField" value={this.state.simpleCalcVal} placeholder={'Enter Your Annual Income'} onChange={this.handleSimpleCalcChange}/>
    <div className={showSection+'simpleCalc_moneyleft calcApp_fadeInTransition'}><h3>Your Maximum Recommended Rent is:</h3><p className="simpleCalc_output">{this.state.simpleEstimate}</p>
        <p className="calcApp_summaryText">Your maximum suggested rent is {this.state.simpleEstimate} and you will have ${numeral(this.state.simpleCalcVal/12-unformatedSimpEst).format('0,0')} left over before taxes and other deductions</p>
    </div>
  </div>
  )
}
});

var calcapp_intro = React.createClass({
  render: function(){
    return(
    <div className="calcApp_descriptionContainer">
      <div className="calcApp_typeDescription">
        <span className="calcAppFont calcAppFont-keyboard53 calcApp_typeArrow"></span>
        <p className="calcApp_typeDescriptionText">(Takes 20 Seconds <br/> to Complete)</p>
      </div>
      <div className="calcApp_typeDescription">
        <span className="calcAppFont calcAppFont-keyboard53 calcApp_typeArrow"></span>
        <p className="calcApp_typeDescriptionText">(Takes 5 to 10 Minutes <br/> to Complete)</p>
      </div>
    </div>
    )
  }
});

var App = React.createClass({
render: function(){
  var Child;
  switch (this.props.route){
    case 'calcapp': Child= CalcApp; break;
    case 'simpleCalcApp': Child = simpleCalcApp; break;
    case 'calcapp_intro': Child = calcapp_intro; break;
    default: Child = CalcApp; break; 
  }

  return(
    <div>
      <Child/>
    </div>
    )
}
});

function render(evt){
React.render(<App route={evt} />, mountNode);
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
