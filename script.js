document.getElementById("submit").addEventListener("click", function() {
    calculate();
});

const calculate = () =>
{
    let name = document.getElementById("name").value;
    let price = Number(document.getElementById("startBid").value);
    let text = document.getElementById("loveLetter").value;
    let form = document.forms["calc"]

    let selectedEdu = form.elements["education"];
    if(selectedEdu.value == 'blank'){
        return 'Education required';
    } 

    price += Number(form.elements["education"].value);

    let selectedFamilyNet = form.elements["networth"];
    if(selectedFamilyNet.value == 'blank'){
        return 'Family networth required';
    } 
    price += Number(form.elements["networth"].value);

    let selectedCaste = form.elements["caste"];
    if(selectedCaste.value == 'blank')
    {
        return 'Caste required';
    } 
    price += Number(form.elements["caste"].value);

    const skills = document.getElementsByClassName("skills"); 
    price = getCheckboxValuesFilterReduce(skills, price);

    const age = document.getElementsByName("age");
    price = getRadioValue(age, price);

    const reputation = document.getElementsByClassName("reputation");
    price = getCheckboxValuesForLoop(reputation, price)

    let person = {
        bride_name: name,
        bride_price: price,
        letter_to_bride: text
    }
    if(price != '' && name != ''){
        document.getElementById("output").innerHTML = `Your price for ${person.bride_name} is ${person.bride_price}. <br>Love Letter To Bride:<br> ${person.letter_to_bride}`;
    } else{
        alert("Name and Starting Bid required");
    }
}

const getCheckboxValuesFilterReduce = (html_collection, price) => {
    let list = Array.from(html_collection).filter(filteration) 
    let result = list.reduce(reducer, price)
    return result;
}

const reducer = (accumulator, item) => {
    return accumulator + Number(item.value);
}

const filteration = (item) => {
    return item.checked;
}

const getRadioValue = (node_list, price) => {  
    node_list.forEach(item => {
        if (item.checked) {
            price = price * Number(item.value)
        }
    })
    return price;
}

const getCheckboxValuesForLoop = (html_collection, price) => { // Check this one, it should work for values with coefficients and with integers
	for (let i=0; i < html_collection.length; i++) {  
		if (html_collection[i].checked && Number.isInteger(Number(html_collection[i].value))) {
			price = price + Number(html_collection[i].value)
		}
		else if (html_collection[i].checked && !Number.isInteger(html_collection[i].value)) {
			price = price * Number(html_collection[i].value)
		}
	}
	return price;
}

