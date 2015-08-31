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
