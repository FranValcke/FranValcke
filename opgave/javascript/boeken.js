
addEventListener("load", init, false);

var bestemmingen = ["alicante", "amsterdam", "barcelona", "berlijn", "birmingham", "dublin", "geneve",
   "hamburg", "jersey", "londen", "malaga", "palma", "rome", "southampton", "split", "zurich"];
var prijzen = [220, 170, 240, 210, 220, 340, 130, 100, 140, 200, 80, 100, 220, 80, 100, 80];

// Maak gebruik van de gegeven functienamen!


function init(event)
{
    laadBestemmingen();

    berekenPrijs();
    document.getElementById("retour").addEventListener("change", retourChecked, "false");
    document.getElementById("naam").addEventListener("blur", valideerNaam, "false");
    document.getElementById("idnr").addEventListener("blur", valideerId, "false");
    document.getElementById("vertrekdatum").addEventListener("change", valideerRetourDate, "false");
    document.getElementById("retourdatum").addEventListener("change", valideerRetourDate, "false");
    document.getElementById("bestemming").addEventListener("change", berekenPrijs, "false");
    document.getElementsByTagName("form")[0].addEventListener("submit", formSubmit, "false");
    document.getElementById("betalen").addEventListener("click", betalen, "false");

}

/* 1  laadBestemmingen */
function laadBestemmingen(event)
{
    console.log("in laadBestemmingen");
    var dropdown = document.getElementById("bestemming");
    dropdown.innerHTML = "";

    for (var i = 0; i < bestemmingen.length; i++)
    {
        var optionNode = document.createElement("option");
        var textNode = document.createTextNode(bestemmingen[i]);
        optionNode.appendChild(textNode);
        optionNode.setAttribute("value", bestemmingen[i]);
        dropdown.appendChild(optionNode);
    }
}

// retourChecked (tonen of verbergen)
function retourChecked(event)
{
    console.log("in retour");
    if(!event.target.checked)
    {
        document.getElementById("retourfield").style.display = "none";
    }
    else
    {
        document.getElementById("retourfield").style.display = "block";
    }
}



/* 4  berekenPrijs */
function berekenPrijs(event)
{
    var selected = document.getElementById("bestemming").value;
    var prijs;
    var rnd = Math.round(Math.random() * 1.2) + 1;
    var retour = document.getElementById("retour");

    console.log(selected);

    for (var i = 0; i < bestemmingen.length; i++)
    {
        if (selected == bestemmingen[i])
        {
            prijs = prijzen[i];
        }
    }

    prijs *= rnd;


    //document.getElementById("prijs").innerHTML = "€ " + prijs;
    document.getElementById("prijs").innerHTML = prijs.toEuro(prijs);
}


/* 5  toEuro */
Number.prototype.toEuro = function(number)
{
    var rest = number % 0.01;
    number -= rest;
    return "€ " + number;
}



/* 6  valideerNaam */
function valideerNaam(event)
{
    console.log("in checkname");
    if(!event.target||event.target.value == 0)
    {
        document.getElementById("fbnaam").innerHTML = "Naam moet ingevuld zijn!";
        return false;
    }
    else
    {
        document.getElementById("fbnaam").innerHTML = "";
        return true;
    }
}



/* 7  valideerId */
function valideerId(event)
{
    var regex = /^[0-9]{2}-[0-9]{7}-[0-9]{2}/
    var input = event.target.value;

    if (!regex.test(input))
    {
        document.getElementById("fbid").innerHTML = "Id moet in de vorm van xx-xxxxxxx-xx";
        return false;
    }
    else
    {
        document.getElementById("fbid").innerHTML = "";
        return true;
    }
}



/* 8  formSubmit */
function formSubmit(event)
{

    console.log("in formSubmit");
    var nameOK = valideerNaam();

    var retourOK = valideerRetourDate();

    if (!nameOK || !ID_OK || !retourOK)
    {
        event.preventDefault();
    }

}