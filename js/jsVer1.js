"use strict";

// Input values are read after each user change in inputs
var price, downPay, tradeIn, interestRate, years;
function getInputValues() {
	price = parseInt( $('#car_loan_input_main_1 input').val() );
	downPay = parseInt ( $('#car_loan_input_main_2 input').val() );
	tradeIn = parseInt ( $('#car_loan_input_main_3 input').val() );
	interestRate = parseFloat ( $('#car_loan_input_main_4 input').val() ) / 12 / 100;
	years = parseInt ( $('#car_loan_input_main_5 input').val() );


	console.log(`inputs:`);
	console.log( price );
	console.log( downPay );
	console.log( tradeIn );
	console.log( interestRate );
	console.log( years );

}




function calculate() {

}



function writeResults() {
	
}




$('input, select').on("change",function() {
	getInputValues();
	calculate();
	writeResults();
});
$(function(){
	getInputValues();
	calculate();
	writeResults();

	//  ****** CHECK FOR DOUBLE NAMES

  // Warning Duplicate IDs
  $('[id]').each(function(){
    var ids = $('[id="'+this.id+'"]');
    if(ids.length>1 && ids[0]==this)
      console.warn('Multiple IDs #'+this.id);
  });

  $('[name]').each(function(){
    var names = $('[name="'+this.name+'"]');
    if(names.length>1 && names[0]==this)
      console.warn('Multiple names #'+this.name);
  });

});