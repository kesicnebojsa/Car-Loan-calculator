"use strict";

// Input values are read after each user change in inputs
var price, downPay, tradeIn, interestRate, years, tax;
function getInputValues() {
	price = parseInt( $('#car_loan_input_main_1 input').val() );
	downPay = parseInt ( $('#car_loan_input_main_2 input').val() );
	tradeIn = parseInt ( $('#car_loan_input_main_3 input').val() );
	interestRate = parseFloat ( $('#car_loan_input_main_4 input').val() ) / 12 / 100;
	years = parseInt ( $('#car_loan_input_main_5 input').val() );
	tax = parseInt ( $('#car_loan_input_main_6 input').val() ) / 100;


	// console.log(`inputs:`);
	// console.log( price );
	// console.log( downPay );
	// console.log( tradeIn );
	// console.log( interestRate );
	// console.log( years );

}



var mortgageRepayment, totalPaid, interestPaid, loanAmount;
var principalPaid = [0];
var interestsMonthly = [0];
var interestSums = [0];
function calculate() {
	principalPaid = [0];
	interestsMonthly = [0];
	interestSums = [0];
	//Loan Amount
	loanAmount = price * (1 + tax) - downPay - tradeIn;
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

	// all payments
	for (var i = 0; i < (years * 12); i++) {
		interestsMonthly.push( ( loanAmount - principalPaid[i] ) * interestRate  );
		principalPaid.push( principalPaid[i] + mortgageRepayment - interestsMonthly[i+1] );
		interestSums.push( interestSums[i] + interestsMonthly[i+1] );
	}

	console.log('principalPaid', principalPaid);
	console.log('interestsMonthly', interestsMonthly);
	console.log('interestSums', interestSums);

	// console.log(mortgageRepayment);

}

function writeResults() {
	
	var chart = AmCharts.makeChart( "chartdiv", {
	  "type": "pie",
	  "theme": "light",
	  "titles": [
			{
				"text": "Loan Breakdown",
				"size": 15
			}
		],
	  "dataProvider": [ {
	    "label": "Principal",
	    "value": loanAmount
	  }, {
	    "label": "Interest",
	    "value": interestPaid
	  }],
	  "valueField": "value",
	  "titleField": "label",
	   "balloon":{
	   "fixedPosition":true
	  }
	} );

	var dataForLineChart = [{
			"year": 0,
	        "payment": 0,
	        "interest": 0,
	        "balance": loanAmount 
		}];
	for (var i = 0; i < years; i++) {
		dataForLineChart.push({
			"year": i+1,
	        "payment": Math.round( (i+1)*12*mortgageRepayment ),
	        "interest": Math.round( interestSums[(i*12)+12] ),
	        "balance": Math.round( loanAmount - principalPaid[(i*12)+12] )
		});
	}

	var lineChart = AmCharts.makeChart("linechartdiv", {
	    "type": "xy",
	    "theme": "light",
	    "titles": [
			{
				"text": "Amortization Graph",
				"size": 15
			}
		],
	    "dataProvider": dataForLineChart,
	    "graphs": [{
	    	"type": "smoothedLine",
	        "balloonText": "Year:[[year]]<br><b><span style='font-size:14px;'>payment:[[payment]]</span></b>",
	        "bullet": "round",
	        "yField": "payment",
	        "xField": "year",
	        "lineColor": "#8d1cc6",
	        "title": "payment"
	    },{
	        "balloonText": "Year:[[year]]<br><b><span style='font-size:14px;'>interest:[[interest]]</span></b>",
	        "bullet": "round",
	        "xField": "year",
	        "yField": "interest",
	        "title": "interest"
	    },{
	        "balloonText": "Year:[[year]]<br><b><span style='font-size:14px;'>balance:[[balance]]</span></b>",
	        "bullet": "round",
	        "xField": "year",
	        "yField": "balance",
	        "title": "balance"
	    }],
	    "legend":{
		   	"horizontalGap": 10,
		    "maxColumns": 1,
		    "position": "bottom",
		    "useGraphSettings": true,
		    "markerSize": 10,
		    "marginTop": 20,
		    "labelText": "[[title]]"
		},
	    "chartCursor": {
	        "fullWidth":true,
	        "valueLineEabled":true,
	        "valueLineBalloonEnabled":true,
	        "valueLineAlpha":0.5,
	        "cursorAlpha":0
	    }
	});
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

// AJAX - GENERATE LINK
$('#gen_link_btn').click(function(e){
	e.preventDefault();
	$.post("index.php",{
		'generateLink' 			: 'true', 
		'Vehicle_price' 		: $("input[name='Vehicle_price']").val(),
		'Down_payment' 			: $("input[name='Down_payment']").val(),
		'Trade_in_value' 		: $("input[name='Trade_in_value']").val(),
		'Annual_interest_rate' 	: $("input[name='Annual_interest_rate']").val(),
		'Loan_years' 			: $("input[name='Loan_years']").val()
		}).done(function(result) {
			console.log(result);
			if(result != '') {
				$("input[name='Link']").val(result);
				$("input[name='Link']").css('display', 'block');				
			}
		});
});

// function copy(selector){
//   var $temp = $("<div>");
//   $("body").append($temp);
//   $temp.attr("contenteditable", true)
//        .html($(selector).val()).select()
//        .on("focus", function() { document.execCommand('selectAll',false,null) })
//        .focus();
//   document.execCommand("copy");
//   console.log('sada je: ',$temp.html());
//   $temp.remove();
// }

function copy(selector){	
	$(selector).select();
    // .on("focus", function() { document.execCommand('selectAll',false,null) })
    // .focus();
  	document.execCommand("copy");
  	// console.log('sada je: ',$temp.html());
}

$('#link_input').on("click", function(){
	var id = '#link_input';
	copy(id);
})