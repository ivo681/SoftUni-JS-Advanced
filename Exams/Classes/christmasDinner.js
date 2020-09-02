class ChristmasDinner{
    constructor(budget){
        if(Number(budget) < 0){
            throw new Error('The budget cannot be a negative number');
        }
        this.budget = Number(budget);
        this.dishes = [];
        this.products = [];
        this.guests = {};
    }

    shopping(arr){
        const [product, price] = [...arr];
        if(Number(price) > this.budget){
            throw new Error('Not enough money to buy this product');
        }
        this.products.push(product);
        this.budget -= Number(price);
        return `You have successfully bought ${product}!`
    }

    recipes(recipeObj){
        recipeObj.productsList.forEach(product => {
            if(!this.products.includes(product)){
                throw new Error('We do not have this product')
            }
        });
        this.dishes.push(recipeObj);
        return `${recipeObj.recipeName} has been successfully cooked!`
    }

    inviteGuests(name, dish){
        let dishContained = false;
        this.dishes.forEach(recipe => {if(recipe.recipeName === dish){dishContained = true}});
        if(!dishContained){
            throw new Error('We do not have this dish')
        }

        Object.keys(this.guests).forEach(guestName => {if(guestName === name){throw new Error ('This guest has already been invited')}});
        this.guests[name] = dish;
        return `You have successfully invited ${name}!`
    }

    showAttendance(){
        let output = []
        Object.entries(this.guests).forEach((guest) =>{
            let list;
            this.dishes.forEach(dish => {if(dish.recipeName === guest[1]){list = dish.productsList}})
            output.push(`${guest[0]} will eat ${guest[1]}, which consists of ${list.join(', ')}`);
        })
        return output.join('\n')
    }
}