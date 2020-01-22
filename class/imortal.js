var Hero = require('./Hero');


class Imortal extends Hero.SuperHero {
    constructor(name, level, spell, age) {
        // Chain constructor with super
        super(name, level, spell);

        // Add a new property
        this.age = age;
    }
}


module.exports = Imortal;