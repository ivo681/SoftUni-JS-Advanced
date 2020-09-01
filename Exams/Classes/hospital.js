class VeterinaryClinic{
    constructor(clinicName, capacity){
        this.clinicName = clinicName;
        this.capacity = Number(capacity);
        this.clients = [];
        this.totalProfit = 0;
        this.currentWorkload = 0;
    }

    newCustomer(ownerName, petName, kind, procedures){
        if(this.currentWorkload === this.capacity){
            throw new Error('Sorry, we are not able to accept more patients!');
        }

        let existingCustomer = this.clients.find(currCustomer => currCustomer.name === ownerName);
        if(existingCustomer === undefined){
            let newCustomer = {name: ownerName, pets: []};
            newCustomer.pets.push({petName, kind, procedures});
            this.clients.push(newCustomer);
            this.currentWorkload+=1;
        } else{
            let existingPet = existingCustomer.pets.find(currPet => currPet.petName === petName && currPet.kind.toLowerCase() === kind.toLowerCase());
            if(existingPet !== undefined){
                if(existingPet.procedures.length > 0){
                throw new Error(`This pet is already registered under ${ownerName} name! ${petName} is on our lists, waiting for ` + existingPet.procedures.join(', ') + `.`);
                } else{
                    existingPet.procedures = procedures;
                    this.currentWorkload+=1;
                }
            } else{
                existingCustomer.pets.push({petName, kind, procedures});
                this.currentWorkload+=1;
            }
        }
        return `Welcome ${petName}!`
    }

    onLeaving(ownerName, petName){
        let existingCustomer = this.clients.find(currCustomer => currCustomer.name === ownerName);
        if(existingCustomer === undefined){
            throw new Error('Sorry, there is no such client!');
        }
        let existingPet = existingCustomer.pets.find(currPet => currPet.petName === petName);
        if(existingPet === undefined || existingPet.procedures.length === 0){
            throw new Error(`Sorry, there are no procedures for ${petName}!`)
        }
        let clientBill = existingPet.procedures.length * 500;
        existingPet.procedures = [];
        this.totalProfit += clientBill;
        this.currentWorkload-=1;
        return `Goodbye ${petName}. Stay safe!`
    }

    toString(){
        let output = [];
        output.push(`${this.clinicName} is ${Math.floor((this.currentWorkload / this.capacity) * 100)}% busy today!`)
        output.push(`Total profit: ${this.totalProfit.toFixed(2)}$`);
        this.clients.sort((ownerA, ownerB) => ownerA.name.toLowerCase().localeCompare(ownerB.name.toLowerCase())).forEach(owner =>{
            output.push(`${owner.name} with:`);
            owner.pets.sort((petA, petB) => petA.petName.toLowerCase().localeCompare(petB.petName.toLowerCase())).forEach(pet => {
                output.push(`---${pet.petName} - a ${pet.kind.toLowerCase()} that needs: ` + pet.procedures.join(', '));
            })
        })

        return output.join('\n');
    }
}

let clinic = new VeterinaryClinic('SoftCare', 10);
console.log(clinic.newCustomer('Jim Jones', 'Tom', 'Cat', ['A154B', '2C32B', '12CDB']));
console.log(clinic.newCustomer('Anna Morgan', 'Max', 'Dog', ['SK456', 'DFG45', 'KS456']));
console.log(clinic.newCustomer('Jim Jones', 'Tiny', 'Cat', ['A154B'])); 
console.log(clinic.onLeaving('Jim Jones', 'Tiny'));
console.log(clinic.totalProfit);
console.log(clinic.toString())
clinic.newCustomer('Jim Jones', 'Sara', 'Dog', ['A154B']); 
console.log(clinic.toString());




