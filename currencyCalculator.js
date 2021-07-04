var select1 = document.getElementById("fromCurrency");
var select2 = document.getElementById("toCurrency");
var resultData = "";
var currencies = "";
var currenciesValues = "";

var button = document.getElementById("button");

document.getElementById("fromTo").disabled = true;

//Creates request and gets all ISO codes with their values
function createRequest()
{
    var request = new XMLHttpRequest();
    var url = "https://v6.exchangerate-api.com/v6/6cc3a5ae8ac9f95fba56a279/latest/PLN";

    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
        {
            var responseData = JSON.parse(this.responseText);
            displayIsoCodes(responseData['conversion_rates']);
            
            //console.log(responseData['conversion_rates']);
        }
    };
    request.open("GET", url, true);
    request.send();  
}

// Display iso codes in select options in html file
function displayIsoCodes(currData)
{
    currencies = Object.keys(currData);
    currenciesValues = Object.values(currData);
    console.log(currencies);
    
    for(var data of currencies)
    {
        var child = document.createElement("option");
        var child2 = document.createElement("option");

        child.text = data;
        child.value = data;
        child2.text = data;
        child2.value = data;
        
        select1.appendChild(child);
        select2.appendChild(child2);

    }
}
// Second request that returns all currencies based on selected "from" currency
function resultRequest(value)
{
    var request = new XMLHttpRequest();
    var val = value;
    var url = "https://v6.exchangerate-api.com/v6/6cc3a5ae8ac9f95fba56a279/latest/" + val;
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
        {
            resultData = JSON.parse(this.responseText);
            calculateResult(resultData['conversion_rates']);

            //console.log(responseData['conversion_rates']);
        }
    };
    request.open("GET", url, true);
    request.send();
}
function calculateResult(value)
{
    currencies = Object.keys(value);
    currenciesValues = Object.values(value);

    console.log(currencies);

    /*var firstCurrency = select;
    var secondCurrency = select2;
    var inputAmount = document.getElementById("amount");
    var result = "";


    if(firstCurrency != secondCurrency)
    {
        result = inputAmount * currenciesValues[secondCurrency];
        console.log(result);
    }
*/
    document.getElementById("result").innerHTML = result;
}

//var selectedValue = document.getElementById("fromCurrency").value;
window.onload = createRequest;
//button.onclick = resultRequest(selectedValue);

