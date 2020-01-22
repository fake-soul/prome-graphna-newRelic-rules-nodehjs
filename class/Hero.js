class Hero {
    constructor(name, level) {
        this.name = name;
        this.level = level;
    }

    // Adding a method to the constructor
    greet() {
        return `${this.name} says hello.`;
    }
}

class SuperHero extends Hero {
    constructor(name, level, spell) {
        // Chain constructor with super
        super(name, level);

        // Add a new property
        this.spell = spell;
    }
}



module.exports = {
    Hero,
    SuperHero
};