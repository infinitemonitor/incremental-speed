//Elements
display = document.getElementById("display")
totalDisplay = document.getElementById("totalDisplay")
ascDisplay = document.getElementById("ascDisplay")
moneyDisplay = document.getElementById("moneyDisplay")
psDisplay = document.getElementById("psDisplay")
displaySpeed = document.getElementById("displaySpeed")
displayLuck = document.getElementById("displayLuck")
displayHole = document.getElementById("displayHole")
displayMatter = document.getElementById("displayMatter")
displayPower = document.getElementById("displayPower")
displayMatterGain = document.getElementById("displayMatterGain")

//Buttons
btnWithdraw = document.getElementById("btnWithdraw")
btnUpgradeSpeed = document.getElementById("btnUpgradeSpeed")
btnUpgradeBSpeed = document.getElementById("btnUpgradeBSpeed")
btnUpgradeLuck = document.getElementById("btnUpgradeLuck")
btnUpgradeHole = document.getElementById("btnUpgradeHole")
btnCollectHole = document.getElementById("btnCollectHole")
btnUpgradePower = document.getElementById("btnUpgradePower")
btnAscend = document.getElementById("btnAscend")

//Variables
dist = 0
tDist = 0
asc = 1
bal = 0
storedBal = 0
matter = 0
holeBal = 0 //Currency

multSpeed = 1
multLuck = 1
lvlHole = 0
lvlAccel = 0
lvlPower = 0.12 //Multipliers and levels

sCost = 10
bsCost = 25
lCost = 175
hCost = 0.08
pCost = 1 //Costs

potentialMatter = 0 //Potential matter gain from ascending
baseSpeed = 1 //Base m/s
luckPenalty = 1 //Speed penalty from buying luck

//Game loop (20 tps, dividing gain var by 20 to account for this)
setInterval(() => {
	//Calculate distance
	distgain = baseSpeed*multSpeed
	distgain *= matter||1
	distgain /= luckPenalty
	distgain /= 20
	
	dist += distgain
	storedBal += distgain/1.4
	tDist += distgain
	
	//Calculate potential matter
	division = asc*25600000
	potentialMatter = dist/division
	potentialMatter = Math.round(potentialMatter)
	if(potentialMatter == Math.min()) potentialMatter = 0 //because division by 0 happens when asc is 0
	
	//Set displays
	display.innerHTML = dist.toFixed(1) + " m"
	totalDisplay.innerHTML = tDist.toFixed(1) + " m travelled in total"
	psDisplay.innerHTML = `${distgain.toFixed(1)} m/tick`
	btnWithdraw.innerHTML = "Withdraw distance for $" + storedBal.toFixed(1)
	displayMatterGain.innerHTML = "If you ascend now, you will gain " + potentialMatter + " 💠 Matter"
},50)

//Hole loop (1 tps)
setInterval(() => {
	if(lvlHole == 0) return
	temp = lvlHole*Math.random()
	temp *= 3
	holeBal += temp
	btnCollectHole.innerHTML = "Collect $" + holeBal.toFixed(2)
},1000)

//Update tab title periodically like Cookie Clicker
setInterval(() => {
	document.title = dist.toFixed(1) + " m - Incremental Speed"
},4000)

function clearValues() {
	multSpeed = 1
	lvlHole = 0
	lvlAccel = 0
	sCost = 10
	bsCost = 25
	lCost = 175
	hCost = 500
	bal = 0 
	storedBal = 0 
	dist = 0
	baseSpeed = 1
	luckPenalty = 1
} //Used when ascending

//BUTTON TEMPLATE cause im lazy:
//btn.addEventListener("click", () => {
//	
//})

//BUTTON LOGIC

//Withdraw button
btnWithdraw.addEventListener("click", () => {
	bal += storedBal
	dist = 0
	storedBal = 0
	
	moneyDisplay.innerHTML = "Your balance: $" + bal.toFixed(1)
})

//Upgrade base speed button
btnUpgradeBSpeed.addEventListener("click", () => {
	if(bal < bsCost) return
	bal -= bsCost
	baseSpeed++
	bsCost *= 1.24
	
	displaySpeed.innerHTML = "▶️ Speed multiplier is " + multSpeed.toFixed(2) + "x, base speed is " + baseSpeed.toFixed(2)
	btnUpgradeBSpeed.innerHTML = "Upgrade base speed for $" + bsCost.toFixed(2)
	moneyDisplay.innerHTML = "Your balance: $" + bal.toFixed(1)
})

//Upgrade speed button
btnUpgradeSpeed.addEventListener("click", () => {
	if(bal < sCost) return
	bal -= sCost
	multSpeed += lvlPower
	sCost *= 1.24
	
	displaySpeed.innerHTML = "▶️ Speed multiplier is " + multSpeed.toFixed(2) + "x, base speed is " + baseSpeed.toFixed(2)
	btnUpgradeSpeed.innerHTML = "Upgrade speed multiplier for $" + sCost.toFixed(2)
	moneyDisplay.innerHTML = "Your balance: $" + bal.toFixed(1)
})

//Upgrade luck button
btnUpgradeLuck.addEventListener("click", () => {
	if(bal < lCost) return
	bal -= lCost
	multLuck += lvlPower
	luckPenalty += lvlPower/3.5
	lCost *= 1.68
	
	displayLuck.innerHTML = "💸 Money multiplier is " + multLuck.toFixed(2) + "x, but speed is divided by " + luckPenalty.toFixed(2)
	btnUpgradeLuck.innerHTML = "Upgrade luck for $" + lCost.toFixed(2)
	moneyDisplay.innerHTML = "Your balance: $" + bal.toFixed(1)
})

//Upgrade hole button
btnUpgradeHole.addEventListener("click", () => {
	if(multSpeed-1 < hCost) return
	multSpeed -= hCost
	lvlHole++
	hCost *= 1.28
	
	displayHole.innerHTML = "🕳️ Hole level " + lvlHole
	btnUpgradeHole.innerHTML = "Sacrifice " + hCost.toFixed(2) + "x SpMult"
	displaySpeed.innerHTML = "▶️ Speed multiplier is " + multSpeed.toFixed(2) + "x, base speed is " + baseSpeed.toFixed(2)
})

//Collect hole button
btnCollectHole.addEventListener("click", () => {
	bal += holeBal
	holeBal = 0
	
	displayHole.innerHTML = "🕳️ Hole level " + lvlHole
	moneyDisplay.innerHTML = "Your balance: $" + bal.toFixed(2)
	btnCollectHole.innerHTML = "Collect $" + holeBal.toFixed(2)
})

//Ascend button
btnAscend.addEventListener("click", () => {
	if(potentialMatter == 0) return
	matter += potentialMatter
	asc += potentialMatter
	
	clearValues()
	
	ascDisplay.innerHTML = "You've gained " + Math.floor(asc)-1 + " total 💠 Matter from ascending"
})

//Upgrade power button
btnUpgradePower.addEventListener("click", () => {
	if(matter < pCost) return
	matter -= pCost
	pCost++
	
	displayPower.innerHTML = "🌩️ Upgrades raise multipliers by " + lvlPower
	btnUpgradePower.innerHTML = "Upgrade power for 💠 " + pCost.toFixed(2)
	displayMatter.innerHTML = "You have " + matter + " 💠 Matter (" + matter + "x speed boost thanks to unspent matter)"
})