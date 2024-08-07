let day = 1;
let action = 9; //amount of actions a day 
let charm = 0;
let xp = 0;
let health = 100; //mental psyche
let gold = 200; //money
let currentItem = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const text = document.querySelector('#text');
const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');
const monsterStats = document.querySelector('#monsterStats');
const monsterName = document.querySelector('#monsterName');
const monsterHealthText = document.querySelector('#monsterHealth');
const peoples = [
  {
    name: "Magic Salesman",
    type: "salesman"
  },
  {
    name: "Johnson",
    type: "resident"
  },
  {
    name: "Alice",
    type: "resident"
  },
  {
    name: "Clint",
    type: "postman"
  },
  {
    name: "Al",
    type: "superintendent"
  },
  {
    name: "Ben",
    type: "elevator repairman"
  },
  {
    name: "Chris",
    type: "postman"
  }
]
const weapons = [
    {
      name: "phone",
      power: 5
    },
    {
      name: "keys",
      power: 30
    },
    {
      name: "bat",
      power: 50
    },
    {
      name: "sword",
      power: 100
    }
  ];
  const enemys =[
    {
      name: "slime",
      level: 2,
      health: 15
    },
    {
      name: "fanged beast",
      level: 8,
      health: 60
    },
    {
      name: "dragon",
      level: 20,
      health: 300
    }
  ]
const locations = [{
    name: "Tralfagar Lobby",
    "button text": ['Go to desk','Go to basement','stand outside', 'Stats'],
    'button functions': [goStore,goBasement,fightDragon, viewStats],
    text: "You are in the lobby of the Tralfagar"
    },
    {
      name: "apartment",
      "button text": ["do house chores", "Order delivery", "Go to the bar", 'Stats'],
      "button functions": [buyHealth, buyWeapon, goTown, viewStats],
      text: "You are home."
    },
    {
        name: 'basement',
        "button text": ["Clean/Mop floors", "Speak to Porter", "Knock on Al's door", 'stats'],
        "button functions": [fightSlime, fightBeast, goTown, viewStats],
        text: 'You enter the basement. it has a funky smell'
    },
    {
      name: 'stats',
      "button text": ["Go Back"],
      "button functions": [goBack],
      text: 'These are your stats... SLAYYYY'
    },
    {
      name: "lose",
      "button text": ["REPLAY?","REPLAY?","REPLAY?"],
      "button functions": [restart,restart,restart],
      text: "You die. &#x2620;"
    },
    {
     name: "win",
     "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
     "button functions": [restart, restart, restart],
     text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;"
   }
];

// initialize buttons
button1.onclick = goBasement;
button2.onclick = goStore;
button3.onclick = fightDragon;
button4.onclick = viewStats;

function update(location) {
    monsterStats.style.display = "none"
    button1.innerText = location['button text'][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
  }
  function viewStats(){
    update(locations[3])
  }
  function goBack(){
    //goes back to previous location
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
    if ( gold >= 10){
      gold -= 10;
      health += 10;
      goldText.innerText = gold;
      healthText.innerText = health;
    } else {
      text.innerText = "You do not have enough gold to buy health.";
    }
  }
  function buyWeapon() {
    if(currentItem < weapons.length - 1){
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
    }else {
      text.innerText = "You already have the most powerful weapon!";
      button2.innerText = "Sell weapon for 15 gold";
      button2.onclick = sellWeapon;
    }
    
  }
  
  function sellWeapon() {
    if(inventory.length > 1){
      gold += 15;
      goldText.innerText = gold;
      let currentItem = inventory.shift();
      text.innerText = "You sold a " + currentItem + ".";
      text.innerText +=" In your inventory you have: " + inventory + ".";
    } else {
      text.innerText = "Don't sell your only weapon!"
    }
  }

  function goFight(){
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = 'block';
    monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  }
  
  function fightSlime(){
    fighting = 0;
    goFight();
  }
  
  function fightBeast(){
    fighting = 1;
    goFight();
  }

  function fightDragon() {
    fighting = 2;
    goFight();
  }

function attack(){
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentItem].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentItem].power + Math.floor(Math.random() * xp) + 1;
  } else {
    text.innerText += " You miss.";
  }
  
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0){
    lose();
  } else if (monsterHealth <= 0){
    defeatMonster();
  }
  if (fighting === 2){
    winGame()
  } else {
    defeatMonster()
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks."
    currentItem--;
  }
}
  
function getMonsterAttackValue(level){
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit: 0;
}

function isMonsterHit(){
  return Math.random() > .2 || health < 20;
}

function dodge(){
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7)
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
};

function lose() {
  update(locations[5])
};

function winGame() {
  update(locations[6])
}

function restart(){
  xp = 0;
  health = 100;
  gold = 50,
  currentItem = 0,
  inventory = ["stick"],
  goldText.innerText = gold,
  healthText.innerText = health,
  xpText.innerText = xp,
  goTown()
}



function pick(guess){
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11))
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] +'\n'
    if (numbers.includes(guess)){
      text.innerText += "Right! You win 20 gold!"
      gold += 20;
      goldText.innerText = gold;
    } else {
      text.innerText += "Wrong! You lose 10 health!";
      health -= 10;
      healthText.innerText = health
      if (health <= 0){
        lose();
      }
    }
  }
}