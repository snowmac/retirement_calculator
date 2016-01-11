$(document).ready(function(){
  $("#compute_button").on("click", function(){
    $("#results").hide();
    $("#charts").hide();
    var current_age = getNumber($("input[name='current_age']").val());
    var retirement_age = getNumber($("input[name='retirement_age']").val());
    var rate = getNumber($("input[name='expected_return']").val());
    var inflation = getNumber($("input[name='inflation']").val());
    var current_income = getNumber($("input[name='current_income']").val());
    var retirement_income = getNumber($("input[name='retirement_income']").val());
    var current_savings = getNumber($("input[name='current_savings']").val());
    var monthly_savings = getNumber($("input[name='monthly_savings']").val());
    var retirement_rate = getNumber($("input[name='retirement_rate']").val());
    var max_age = getNumber($("input[name='lifespan']").val());

    var number_of_years = retirement_age - current_age;
    var annual_savings = monthly_savings * 12; 

    var monies = current_savings; 

    var year_collection = [];

    for(var i = 0; i < number_of_years; i++){
      monies = computeInterest(
        (monies+annual_savings),
        rate,
        12,
        1
      ); 

      year_collection.push({
        year: i,
        saved: monies
      });

    }

    $("#savings").html(numberWithCommas(monies.toFixed(2)));
    $("#cur_savings").html(numberWithCommas(current_savings));
    $("#mon_add").html(numberWithCommas(monthly_savings));


    var saved_for_retirement = monies;
    var retired_years = [];
    var year = retirement_age;
    var expected_retirement_message = null;

    while(saved_for_retirement > 1) {
      saved_for_retirement = computeInterest(
        (saved_for_retirement-retirement_income),
        retirement_rate,
        12,
        1
      );

      year++; 

      retired_years.push({
        year: year,
        money: saved_for_retirement
      });

      if(year >= max_age) {
        expected_retirement_message = "You will never out live your money, it will last longer then you. At "+max_age+" years old you will have: $" +  numberWithCommas(saved_for_retirement.toFixed(2));
        break; 
      }
    }

    if(expected_retirement_message == null){
      expected_retirement_message = year + " years old.";
    }

    $("#retirement_growth").html(retirement_rate); 
    $("#annual_retirement_spending").html(numberWithCommas(retirement_income.toFixed(2))); 
    $("#age_money_runs_out").html(expected_retirement_message);

    $("#results").show();
    $("#charts").show();
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
    if(getNumber(x) < 10000) {
      return x; 
    }

    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

});
