const deckContainerElement = document.getElementById('deck_container');

async function getPetData() {
    const response = await fetch('card.json');
    const data = await response.json();
    console.log(data);

    const petData = data.petData;

    // create a Pet card for each item in petData
    for (let i = 0; i < petData.length; i++) {
        const pet = new Pet(deckContainerElement, petData[i].species, petData[i].image, petData[i].diet,petData[i].Name
        );
        pet.displayPet();
    }
}

getPetData();

class Pet {
    constructor(containerElement, species, image, diet, name) {
        this.containerElement = containerElement;
        this.species = species;
        this.image = image;
        this.diet = diet;
        this.name = name;

        this.cardElement = document.createElement('div');
        this.cardElement.classList.add('card');

        // inner element that rotates on flip
        this.innerElement = document.createElement('div');
        this.innerElement.classList.add('card-inner');

        // font
        this.frontElement = document.createElement('div');
        this.frontElement.classList.add('card-front');

        this.imageElement = document.createElement('img');
        this.imageElement.src = this.image;
        this.imageElement.alt = this.species;

        this.speciesElement = document.createElement('h2');

        this.frontElement.appendChild(this.imageElement);
        this.frontElement.appendChild(this.speciesElement);

        // back
        this.backElement = document.createElement('div');
        this.backElement.classList.add('card-back');

        this.nameElement = document.createElement('h3');
        this.dietElement = document.createElement('p');
        this.dietElement.textContent = this.diet;

        this.backElement.appendChild(this.nameElement);
        this.backElement.appendChild(this.dietElement);


        // assemble the card
        this.innerElement.appendChild(this.frontElement);
        this.innerElement.appendChild(this.backElement);
        this.cardElement.appendChild(this.innerElement);

        // click to flip
        const that = this;
        this.onClick = function () {
            that.flip();
        };
        this.cardElement.addEventListener('click', this.onClick);

        // append the card into the deck container
        this.containerElement.appendChild(this.cardElement);
    }

    displayPet() {
        this.speciesElement.innerText = this.species;
        this.nameElement.innerText = this.name;
    }

    flip() {
        this.cardElement.classList.toggle('flipped');
    }
}
