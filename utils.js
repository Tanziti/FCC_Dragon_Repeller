// utils.js

export function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location['button text'][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}

export function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  return hit > 0 ? hit : 0;
}

export function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}
