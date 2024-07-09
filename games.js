// game.js

import { locations, peoples, weapons, enemys } from './data.js';
import { update, hideButton, showButton } from './utils.js';

export let day = 1;
export let action = 9;
export let charm = 0;
export let charmXp = 0;
export let strength = 0;
export let strengthXp = 0;
export let xp = 0;
export let health = 100;
export let gold = 200;
export let currentItem = 0;
export let fighting;
export let monsterHealth;
export let inventory = ["stick"];

const monsterStats = document.getElementById('monsterStats');
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const text = document.getElementById('text');
const goldText = document.getElementById('goldText');
const healthText = document.getElementById('healthText');
const xpText = document.getElementById('xpText');
const monsterName = document.getElementById('monsterName');
const monsterHealthText = document.getElementById('monsterHealth');

button1.onclick = goBasement;
button2.onclick = goStore;
button3.onclick = fightDragon;
button4.onclick = viewStats;


function viewStats() {
  update(locations[3]);
}

function goBack() {
  // goes back to previous location
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goBasement() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

function buyWeapon() {
  if (currentItem < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentItem++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentItem].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentItem = inventory.shift();
    text.innerText = "You sold a " + currentItem + ".";
    text.innerText += " In your inventory you have: " + inventory + ".";
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function goFight() {
  update(locations[3]);
  monsterHealth = enemys[fighting].health;
  monsterStats.style.display = 'block';
  monsterName.innerText = enemys[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function attack() {
  text.innerText = "The " + enemys[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentItem].name + ".";
  health -= getMonsterAttackValue(enemys[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentItem].power + Math.floor(Math.random() * xp) + 1;
  } else {
    text.innerText += " You miss.";
  }

  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    defeatMonster();
  }
  if (fighting === 2) {
    winGame();
  } else {
    defeatMonster();
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentItem--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + enemys[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(enemys[fighting].level * 6.7);
  xp += enemys[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentItem = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.indexOf(guess) !== -1) {
    text.innerText += "Right! You win 20 gold.";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health.";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}

document.getElementById('button4').onclick = viewStats;

