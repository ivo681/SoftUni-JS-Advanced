class Forum {
    constructor() {
        this._users = [];
        this._questions = [];
        this._id = 1;
    }

    register(username, password, repeatPassword, email) {
        if (username === '' || password === '' ||
            repeatPassword === '' || email === '') {
            throw new Error('Input can not be empty');
        }
        if (password !== repeatPassword) {
            throw new Error('Passwords do not match');
        }

        if (this._users.find(user => user.username === username
            || user.email === email) !== undefined) {
            throw new Error('This user already exists!')
        }

        this._users.push({ username, password, email, loggedIn: false });
        return `${username} with ${email} was registered successfully!`
    }

    login(username, password) {
        let currentUser = this._users.find(user => user.username === username);
        if (currentUser === undefined) {
            throw new Error('There is no such user')
        }

        if(currentUser.password === password){
            currentUser.loggedIn = true;
            return `Hello! You have logged in successfully`
        }
    }

    logout(username, password) {
        let currentUser = this._users.find(user => user.username === username);
        if (currentUser === undefined) {
            throw new Error('There is no such user')
        }

        if(currentUser.password === password){
            currentUser.loggedIn = false;
            return `You have logged out successfully`
        }
    }

    postQuestion(username, question){
        let currentUser = this._users.find(user => user.username === username);
        if(currentUser === undefined || currentUser.loggedIn === false){
            throw new Error('You should be logged in to post questions');
        }
        if(question.trim() === ''){
            throw new Error('Invalid question');
        }
        let id = this._id;
        this._id+= 1;
        this._questions.push({id, question, author: username, answers: []});
        return `Your question has been posted successfully`;
    }

    postAnswer(username, questionId, answer){
        let currentUser = this._users.find(user => user.username === username);
        if(currentUser === undefined || currentUser.loggedIn === false){
            throw new Error('You should be logged in to post answers');
        }
        if(answer.trim() === ''){
            throw new Error('Invalid answer');
        }
        let currentQuestion = this._questions.find(question => question.id === questionId);
        if(currentQuestion === undefined){
            throw new Error('There is no such question')
        }
        currentQuestion.answers.push({username, answer});
        return `Your answer has been posted successfully`;
    }

    showQuestions(){
        let output = [];
        this._questions.forEach(question =>{
            output.push(`Question ${question.id} by ${question.author}: ${question.question}`);
            if(question.answers.length > 0){
                question.answers.forEach(answer => {
                    output.push(`---${answer.username}: ${answer.answer}`)
                })
            }
        })
        return output.join('\n');
    }
}