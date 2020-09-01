function solve() {
    let addBtn = document.querySelector('button');
    let nameInputField = document.querySelectorAll('input').item(0);
    let ageInputField = document.querySelectorAll('input').item(1);
    let kindInputField = document.querySelectorAll('input').item(2);
    let currentOwnerInputField = document.querySelectorAll('input').item(3);
    let adoptionSectionUl = document.getElementById('adoption').children.item(1);
    let adoptedSectionUl = document.getElementById('adopted').children.item(1);

    addBtn.addEventListener('click', addPetFunc);

    function addPetFunc(e){
        e.preventDefault();
        let nameValue = nameInputField.value;
        let ageValue = Number(ageInputField.value);
        let kindValue = kindInputField.value;
        let currentOwnerValue = currentOwnerInputField.value;
        if(nameValue.trim() === '' || isNaN(ageValue) || kindValue.trim() === '' || currentOwnerValue.trim() === ''){
            return;
        }
        let newPetLi = document.createElement('li');
        let newPetP = document.createElement('p');
        newPetP.innerHTML = `<strong>${nameValue}</strong> is a <strong>${ageValue}</strong> year old <strong>${kindValue}</strong>`;
        newPetLi.appendChild(newPetP);
        let newPetSpan = document.createElement('span');
        newPetSpan.textContent = `Owner: ${currentOwnerValue}`;
        newPetLi.appendChild(newPetSpan);
        let contactOwnerBtn = document.createElement('button');
        contactOwnerBtn.textContent = 'Contact with owner';
        contactOwnerBtn.addEventListener('click', contactOwnerFunc);
        newPetLi.appendChild(contactOwnerBtn);
        adoptionSectionUl.appendChild(newPetLi);
        nameInputField.value = '';
        ageInputField.value = '';
        kindInputField.value = '';
        currentOwnerInputField.value = '';
    }

    function contactOwnerFunc(e){
        let currentPet = e.target.parentNode;
        currentPet.removeChild(currentPet.children.item(2));
        let newDiv = document.createElement('div');
        let newInputField = document.createElement('input');
        newInputField.placeholder = 'Enter your names';
        newDiv.appendChild(newInputField);
        let takeItBtn = document.createElement('button');
        takeItBtn.textContent = 'Yes! I take it!';
        takeItBtn.addEventListener('click', takePetFunc);
        newDiv.appendChild(takeItBtn);
        currentPet.appendChild(newDiv);
    }

    function takePetFunc(e){
        let currentPet = e.target.parentNode.parentNode;
        let ownersInputField = e.target.previousSibling;
        let name = ownersInputField.value;
        if(name.trim() === ''){
            return
        }
        adoptionSectionUl.removeChild(currentPet);
        currentPet.removeChild(currentPet.children.item(2));
        currentPet.removeChild(currentPet.children.item(1));
        let ownerSpan = document.createElement('span');
        ownerSpan.textContent = `New Owner: ${name}`
        currentPet.appendChild(ownerSpan);
        let checkedBtn = document.createElement('button');
        checkedBtn.textContent = 'Checked';
        checkedBtn.addEventListener('click', checkPetFunc);
        currentPet.appendChild(checkedBtn);
        adoptedSectionUl.appendChild(currentPet)
    };

    function checkPetFunc(e){
        e.target.parentNode.remove();
    }
}

