var select1 = document.getElementById("fromCurrency");
var select2 = document.getElementById("toCurrency");
var resultData = "";
var currencies = "";
var currenciesValues = "";
var inputData = document.getElementById("amount");

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
function resultRequest()
{
    var selectedValue = select1.options[select1.selectedIndex].value;
    console.log(selectedValue);
    var request = new XMLHttpRequest();
    var url = "https://v6.exchangerate-api.com/v6/6cc3a5ae8ac9f95fba56a279/latest/" + selectedValue;
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
        {
            resultData = JSON.parse(this.responseText);
            calculateResult(resultData['conversion_rates']);
        }
    };
    request.open("GET", url, true);
    request.send();

}
function calculateResult(value)
{
    var secondRateValue = select2.options[select2.selectedIndex].value;
    currencies = Object.keys(value).indexOf(secondRateValue);
    currenciesValues = Object.values(value);

    var secondCurrRateValue = value[secondRateValue];

    document.getElementById("result").innerHTML = parseInt(inputData.value) * secondCurrRateValue;
}

window.onload = createRequest;
button.onclick = resultRequest;


