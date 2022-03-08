// Declaring an array with one user data
var tableData = [
    { firstName: 'John', lastName: 'Doe', address: 'Palo Alto', pincode: '94020', gender: 'Male', choiceOfFood: ['Italian',  'French'], state: 'San Mateo County', country: 'United States' }
]


// Getting the tbody element with id formData
let tableRows = document.querySelector("#formData");

// Rendering the table with the data
const renderTable = () => {
    let rows = '', temp = tableData;
    for (let i of temp) {
        i.choiceOfFood = `<ul>${i.choiceOfFood.map((choice) => `<li>${choice}</li>`).join('')}</ul>`
        rows += `<tr>${Object.values(i).map((val)=>`<td>${val}</td>`).join('')}</tr>`;
    }

    // Injecting the row data to the tbody using innerHTML 
    tableRows.innerHTML = rows;
}


// Creating a form object which contains all the form elements and methods to manupulate the form
const form = {
    firstName: document.getElementById('firstName'),
    lastName: document.getElementById('lastName'),
    address: document.getElementById('address'),
    pincode: document.getElementById('pincode'),
    gender: document.getElementsByName('gender'),
    choiceOfFood: document.getElementsByName('choiceOfFood'),
    state: document.getElementById('state'),
    country: document.getElementById('country'),
    message: document.getElementById('message'),
    isChoiceOfFoodSelected: function () {
        let noOfFoodSelected = 0
        for (let i = 0; i < this.choiceOfFood.length; i++)
            if (this.choiceOfFood[i].checked) noOfFoodSelected += 1;
        
        if(noOfFoodSelected === 0) return [0, 'Choice of food cannot be empty!']
        else if (noOfFoodSelected >= 2) return [1]
        else return [3, 'You must select atleast 2 food choices!'];
        
    },
    getChoiceOFFoods: function () {
        let choiceOfFoodSelected = [];
        for (let i = 0; i < this.choiceOfFood.length; i++)
            if (this.choiceOfFood[i].checked)
                    choiceOfFoodSelected.push(`${this.choiceOfFood[i].value}`);
        return choiceOfFoodSelected;
    },
    isGenderSelected: function () {
        for (let i = 0; i < this.gender.length; i++)
            if (this.gender[i].checked) return 1;
        
        return 0;
    },
    getGenderSelected: function () {
          for (let i = 0; i < this.gender.length; i++)
            if (this.gender[i].checked) return this.gender[i].value;
    },
    isFormValid: () => {
        let choiceOfFoodStatus = form.isChoiceOfFoodSelected();
        console.log(choiceOfFoodStatus)
        if (this.firstName.value.length === 0) return [0, 'First Name cannot be empty'];
        else if (this.lastName.value.length === 0) return [0, 'Last Name cannot be empty'];
        else if (form.isGenderSelected() === 0) return [0, 'Gender cannot be empty'];
        else if (choiceOfFoodStatus[0] !== 1) {
            choiceOfFoodStatus[0] = 0;
            return choiceOfFoodStatus;
        }
        else if (this.address.value.length === 0) return [0, 'Address cannot be empty'];
        else if (this.state.value.length === 0) return [0, 'State cannot be empty'];        
        else if (this.country.value.length === 0) return [0, 'Country cannot be empty'];
        else if (this.pincode.value.length === 0) return [0, 'Pincode cannot be empty'];
        else return [1, 'Data added successfully!'];
    },
    setMessage: (message) => {
        if (message[0] === 0) {
            this.message.className = 'error__message';
            this.message.innerText = message[1];
            let toastBody = document.getElementById('toast-body');
            toastBody.className = 'error__toast';
            toastBody.innerText = message[1];
            var toastLive = document.getElementById('liveToast')
            var toast = new bootstrap.Toast(toastLive)
            toast.show();
            return false;
        } else {
            this.message.className = 'success__message';
            this.message.innerText = 'User was added successfully!'
            let toastBody = document.getElementById('toast-body');
            toastBody.className = 'success__toast';
            toastBody.innerText = 'User was added successfully!'
            var toastLive = document.getElementById('liveToast')
            var toast = new bootstrap.Toast(toastLive)
            toast.show();
            return true;
        }
    },
    removeMessage: () => {
        this.message.innerText = '';
    },
    addData: () => {
        tableData.push({
            firstName: this.firstName.value,
            lastName: this.lastName.value,
            address: this.address.value,
            pincode: this.pincode.value,
            gender: form.getGenderSelected(),
            choiceOfFood: form.getChoiceOFFoods(),
            state: this.state.value,
            country: this.country.value

        })

        renderTable();
    },
    clearForm: () => {
        this.firstName.value = '';
        this.lastName.value = '';
        this.address.value = '';
        this.pincode.value = '';

        let genders = document.getElementsByName('gender');
        for (let i = 0; i < genders.length; i++)
            if (genders[i].checked) genders[i].checked = false;
        
        let choices = document.getElementsByName('choiceOfFood');
        for (let i = 0; i < choices.length; i++)
            if(choices[i].checked)choices[i].checked = false;
        this.state.value = '';
        this.country.value = '';
    }
}





var Form = document.getElementById("userForm");
const addData = (event) => {
    // To prevent the page from getting refreshed
    event.preventDefault();

    // Removing the error/success message
    form.removeMessage();

    // Form validation
    if (form.setMessage(form.isFormValid())) {
        // if form is valid the adding it to the table
        form.addData();

         // Clearing the form
        form.clearForm();   
    }

   
}

// Add event listener for listening submit event triggered by the form on clicking the add user button
Form.addEventListener('submit', addData);  