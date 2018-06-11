"use strict";

// Input values are read after each user change in inputs
var price, downPay, tradeIn, interestRate, years;
function getInputValues() {
	price = parseInt( $('#car_loan_input_main_1 input').val() );
	downPay = parseInt ( $('#car_loan_input_main_2 input').val() );
	tradeIn = parseInt ( $('#car_loan_input_main_3 input').val() );
	interestRate = parseFloat ( $('#car_loan_input_main_4 input').val() ) / 12 / 100;
	years = parseInt ( $('#car_loan_input_main_5 input').val() );


	// console.log(`inputs:`);
	// console.log( price );
	// console.log( downPay );
	// console.log( tradeIn );
	// console.log( interestRate );
	// console.log( years );

}



var mortgageRepayment, totalPaid, interestPaid;
function calculate() {
	//Loan Amount
	var loanAmount = price - downPay - tradeIn;
	$('#car_loan_output_main_1 h2 span').text(`$${loanAmount.toLocaleString('es-US', { maximumFractionDigits : 0 })}` );

	// monthly repayment
	mortgageRepayment = ( loanAmount * interestRate * Math.pow( 1 + interestRate , years*12) ) / ( Math.pow( 1 + interestRate , years*12 ) - 1 );
	$('#car_loan_output_main_2 h2 span').text(`$${mortgageRepayment.toLocaleString('es-US', { maximumFractionDigits : 2 , minimumFractionDigits : 2 })}` );

	// total amount paid
	totalPaid = mortgageRepayment * years * 12;
	$('#car_loan_output_main_3 h2 span').text(`$${totalPaid.toLocaleString('es-US', { maximumFractionDigits : 2 , minimumFractionDigits : 2 })}` );

	// interest paid
	interestPaid = totalPaid - loanAmount;
	$('#car_loan_output_main_4 h2 span').text(`$${interestPaid.toLocaleString('es-US', { maximumFractionDigits : 2 , minimumFractionDigits : 2 })}` );







	// console.log(mortgageRepayment);

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