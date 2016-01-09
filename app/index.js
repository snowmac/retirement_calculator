$(document).ready(function(){
  $("#compute_button").on("click", function(){
    var current_age = getNumber($("input[name='current_age']").val());
    var retirement_age = getNumber($("input[name='retirement_age']").val());
    var rate = getNumber($("input[name='expected_return']").val());
    var inflation = getNumber($("input[name='inflation']").val());
    var current_income = getNumber($("input[name='current_income']").val());
    var retirement_income = getNumber($("input[name='retirement_income']").val());
    var current_savings = getNumber($("input[name='current_savings']").val());
    var monthly_savings = getNumber($("input[name='monthly_savings']").val());

    var number_of_years = retirement_age - current_age;
    var annual_savings = monthly_savings * 12; 

    var monies = current_savings; 


    for(var i = 0; i < number_of_years; i++){
      monies = computeInterest(
        (monies+annual_savings),
        rate,
        12,
        1
      ); 
    }

    $("#savings").html(numberWithCommas(monies.toFixed(2)));
    $("#cur_savings").html(current_savings);
    $("#mon_add").html(monthly_savings);
  });

  var computeInterest = function(principal, rate, number_of_compounded, number_of_years){
    var p = principal;
    var r = rate * .01; 
    var n = number_of_compounded; 
    var t = number_of_years; 

    var middle = (1 + (r/n)); 
    var middleToPow = Math.pow(middle, (n*t));

    return (p * middleToPow); 
  };

  var getNumber = function(num){
    if(isNaN(num) || num == "" || num.length == 0){
      return 0;
    }
    return parseInt(num);
  };

  var numberWithCommas = function(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

});
