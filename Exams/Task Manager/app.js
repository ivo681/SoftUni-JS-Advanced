function solve() {
    let addBtn = document.querySelector('button');
    let taskInputField = document.querySelectorAll('input').item(0);
    let descriptionInputField = document.querySelector('textarea');
    let dueDateInputField = document.querySelectorAll('input').item(1)
    let openSectionDiv = document.querySelectorAll('section').item(1).children.item(1);
    let inProgressSectionDiv = document.querySelectorAll('section').item(2).children.item(1);
    let completeSectionDiv = document.querySelectorAll('section').item(3).children.item(1);

    addBtn.addEventListener('click', addCourseFunc);

    function addCourseFunc(e){
        e.preventDefault();
        let taskValue = taskInputField.value;
        let descriptionValue = descriptionInputField.value;
        let dueDateValue = dueDateInputField.value;
        if(taskValue.trim() === '' || descriptionValue.trim() === '' || dueDateValue.trim() === ''){
            return;
        }
        let newCourseArticle = document.createElement('article');
        let courseH3 = document.createElement('h3');
        courseH3.textContent = taskValue;
        newCourseArticle.appendChild(courseH3);
        let descriptionP = document.createElement('p');
        descriptionP.textContent = 'Description: ' + descriptionValue;
        newCourseArticle.appendChild(descriptionP);
        let dueDateP = document.createElement('p');
        dueDateP.textContent = 'Due Date: ' + dueDateValue;
        newCourseArticle.appendChild(dueDateP);
        let buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('flex');
        let startBtn = document.createElement('button');
        startBtn.classList.add('green');
        startBtn.textContent = 'Start';
        startBtn.addEventListener('click', startCourseFunc);
        buttonsDiv.appendChild(startBtn);
        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add('red');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', deleteCourseFunc);
        buttonsDiv.appendChild(deleteBtn);
        newCourseArticle.appendChild(buttonsDiv);
        openSectionDiv.appendChild(newCourseArticle);
        taskInputField.value = '';
        descriptionInputField.value = '';
        dueDateInputField.value = '';
    }

    function startCourseFunc(e){
        let currentCourse = e.target.parentNode.parentNode;
        openSectionDiv.removeChild(currentCourse);
        currentCourse.children.item(3).children.item(0).remove();
        let finishBtn = document.createElement('button');
        finishBtn.classList.add('orange');
        finishBtn.textContent = 'Finish';
        finishBtn.addEventListener('click', finishCourseFunc);
        currentCourse.children.item(3).appendChild(finishBtn);
        inProgressSectionDiv.appendChild(currentCourse);
    }

    function deleteCourseFunc(e){
        e.target.parentNode.parentNode.remove();
    }

    function finishCourseFunc(e){
        let currentCourse = e.target.parentNode.parentNode;
        inProgressSectionDiv.removeChild(currentCourse);
        currentCourse.children.item(3).remove();
        completeSectionDiv.appendChild(currentCourse);
    }
}