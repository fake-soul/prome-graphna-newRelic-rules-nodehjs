var Hero = require('./class/Hero');

const hero = new Hero.Hero('Bharat', 10);
const superHero = new Hero.SuperHero('Raj', 13, 'die');

console.log(hero.greet());
console.log(superHero);



var Imortal = require('./class/imortal');
const imortal = new Imortal('Bharat Raj', 234, 'livelong', 2424);
console.log(imortal);

