<?php
define('HOME', 'http://localhost/Car-Loan-calculator/');

//  html escape
function h($string=''){
	return htmlentities($string,ENT_QUOTES,'UTF-8',false);
}
// test die
function die_r($v){
	echo '<pre>';
	print_r($v);
	echo '</pre>';
	die();
}

foreach ($_GET as $key => $value) {
	if(isset($_GET[$key]) && is_numeric($value)) {
		$_GET[$key] = h(trim($value));
	}else{
		header('Location: ' . HOME);
		die;
	}
}

###### REQUEST TO GENERATE LINK ########

if(isset($_POST['generateLink']) && $_SERVER['REQUEST_METHOD'] === 'POST') {
	//die_r($_POST);
	$link = HOME;
	$search_array = ['Vehicle_price','Down_payment','Trade_in_value','Annual_interest_rate','Loan_years'];

	foreach ($search_array as $search_key) {
		if(!array_key_exists($search_key, $_POST)) {
			die;
		}
	}

	foreach ($_POST as $key => $value) {
		if($key === 'Vehicle_price' && is_numeric($value)) {
			$link .= '?Vehicle_price='. urlencode($value);
		}
		elseif($key === 'Down_payment' && is_numeric($value)) {
			$link .= '&Down_payment='. urlencode($value);
		}
		elseif($key === 'Trade_in_value' && is_numeric($value)) {
			$link .= '&Trade_in_value='. urlencode($value);
		}
		elseif($key === 'Annual_interest_rate' && is_numeric($value)) {
			$link .= '&Annual_interest_rate='. urlencode($value);
		}
		elseif($key === 'Loan_years' && is_numeric($value)) {
			$link .= '&Loan_years='. urlencode($value);
		}
	}
	die($link);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Car Loan Calculator</title>
	<link rel="stylesheet" href="css/cssVer2.css">
</head>
<body>
	<div id="car_loan_main_wrapper">
		<h1>Car Loan Caculator</h1>
	    <div id="car_loan_main_inputs" class="inlineBlock">
			<div id="car_loan_input_main_1" class="allInputsMain">
				<p>Vehicle price</p>
				<input  class="" type="number" name="Vehicle_price" value="<?= $_GET['Vehicle_price'] ?? '8000'; ?>" placeholder="$">
			</div>
			<div id="car_loan_input_main_2" class="allInputsMain">
				<p>Down payment</p>
				<input  class="" type="number" name="Down_payment" value="<?= $_GET['Down_payment'] ?? '1000'; ?>" placeholder="$">
			</div>
			<div id="car_loan_input_main_3" class="allInputsMain">
				<p>Trade in value</p>
				<input  class="" type="number" name="Trade_in_value" value="<?= $_GET['Trade_in_value'] ?? '2000'; ?>" placeholder="$">
			</div>
			<div id="car_loan_output_main_1" class="allOutputMain">
				<p>Loan amount</p>
				<h2><span>$5000</span></h2>
			</div>
			<div id="car_loan_input_main_4" class="allInputsMain">
				<p>Annual interest rate</p>
				<input  class="" type="number" name="Annual_interest_rate" value="<?= $_GET['Annual_interest_rate'] ?? '3.35'; ?>" placeholder="%">
			</div>
			<div id="car_loan_input_main_5" class="allInputsMain">
				<p>Loan (years)</p>
				<input  class="" type="number" name="Loan_years" value="<?= $_GET['Loan_years'] ?? '5'; ?>" placeholder="years">
			</div>
		</div>
		<div id="car_loan_main_outputs" class="inlineBlock">
			<h4>Payment details</h4>
			<div id="car_loan_output_main_2" class="allOutputMain">
				<p>Monthly payment</p>
				<h2><span>$555</span></h2>
			</div>
			<div id="car_loan_output_main_3" class="allOutputMain">
				<p>Total amount paid</p>
				<h2><span>$55,555.50</span></h2>
			</div>
			<div id="car_loan_output_main_4" class="allOutputMain">
				<p>Total interest paid</p>
				<h2><span>1,234.20</span></h2>
			</div>
			<div id="car_loan_output_main_5" class="allOutputMain">
				<form method="post">
					<p id="gen_link_btn_p"><input id="gen_link_btn" type="submit" name='generateLink' value="Generate Link"></p>
					<input id="link_input" style="display: none" type="text" name='Link' value="<?= $link ?? ''; ?>">
				</form>
			</div>
		</div>
		<div id="chartdiv"></div>
		<div id="linechartdiv"></div>
	</div><!-- mortgage_main_wrapper -->


<script
  src="https://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  crossorigin="anonymous"></script>
<script src="https://www.amcharts.com/lib/3/amcharts.js"></script>
<script src="https://www.amcharts.com/lib/3/xy.js"></script>
<script src="https://www.amcharts.com/lib/3/pie.js"></script>
<!-- <script src="https://www.amcharts.com/lib/3/plugins/export/export.min.js"></script> -->
<script src="https://www.amcharts.com/lib/3/themes/light.js"></script>
<script src="js/jsVer3.js"></script>
</body>
</html>