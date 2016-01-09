$(document).ready(function(){
  
  $("#example1").on("click", function(){
    $("input[name='current_age']").val(26);
    $("input[name='retirement_age']").val(65);
    $("input[name='expected_return']").val(7);
    $("input[name='inflation']").val(3);
    $("input[name='current_income']").val(95000);
    $("input[name='retirement_income']").val(60000);
    $("input[name='current_savings']").val(3000);
    $("input[name='monthly_savings']").val(450);
    $("#compute_button").trigger("click");
  });
  
  $("#example2").on("click", function(){
    $("input[name='current_age']").val(65);
    $("input[name='retirement_age']").val(65);
    $("input[name='expected_return']").val(5);
    $("input[name='inflation']").val(3);
    $("input[name='current_income']").val(95000);
    $("input[name='retirement_income']").val(60000);
    $("input[name='current_savings']").val(1183983);
    $("input[name='monthly_savings']").val(0);
    $("#compute_button").trigger("click");
  });

});