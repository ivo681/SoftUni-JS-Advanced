function solution() {
    let inputField = document.querySelector('input');
    let addGiftBtn = document.querySelector('button');
    let listOfGifts = document.querySelectorAll('.card').item(1).children.item(1);
    let sentGifts = document.querySelectorAll('.card').item(2).children.item(1);
    let discardedGifts = document.querySelectorAll('.card').item(3).children.item(1);

    addGiftBtn.addEventListener('click', addGiftFunc);

    function addGiftFunc(e){
        e.preventDefault();
        let input = inputField.value;
        if(input.trim()=== ''){
            return;
        }
        let newGiftLi = document.createElement('li');
        newGiftLi.classList.add('gift');
        newGiftLi.textContent = input;
        let sendBtn = document.createElement('button');
        sendBtn.id = 'sendButton';
        sendBtn.textContent = 'Send'
        sendBtn.addEventListener('click', sendGiftFunc);
        let discardBtn = document.createElement('button');
        discardBtn.id = 'discardButton';
        discardBtn.textContent = 'Discard';
        discardBtn.addEventListener('click', discardGiftFunc);
        newGiftLi.appendChild(sendBtn);
        newGiftLi.appendChild(discardBtn);
        listOfGifts.appendChild(newGiftLi);
        Array.from(listOfGifts.children).sort((a,b) => a.textContent.localeCompare(b.textContent)).forEach(item => listOfGifts.appendChild(item))
        inputField.value = '';
    }

    function sendGiftFunc(e){
        let currentGift = e.target.parentNode;
        listOfGifts.removeChild(currentGift);
        currentGift.removeChild(currentGift.children.item(0));
        currentGift.removeChild(currentGift.children.item(0));
        sentGifts.appendChild(currentGift);
    }

    function discardGiftFunc(e){
        let currentGift = e.target.parentNode;
        listOfGifts.removeChild(currentGift);
        currentGift.removeChild(currentGift.children.item(0));
        currentGift.removeChild(currentGift.children.item(0));
        discardedGifts.appendChild(currentGift);
    }
}