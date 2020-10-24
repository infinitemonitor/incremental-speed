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
btnSave = document.getElementById("btnSave")
btnClrSave = document.getElementById("btnClrSave")
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
asc = 0
bal = 0
storedBal = 0
matter = 0
holeBal = 0 //Currency

multSpeed = 1
multLuck = 1
lvlHole = 0
lvlPower = 0.12
lvlSolar = 1 //Multipliers and levels

sCost = 10
bsCost = 25
lCost = 175
hCost = 0.08
pCost = 1
spCost = 1 //Costs

potentialMatter = 0 //Potential matter gain from ascending
baseSpeed = 1 //Base m/s
luckPenalty = 1 //Speed penalty from buying luck

//Game loop (20 tps, dividing gain var by 20 to account for this)
setInterval(() => {
	if(document.visibilityState == "hidden") return
	
	//Calculate distance
	distgain = baseSpeed*multSpeed
	distgain *= lvlSolar
	distgain /= luckPenalty
	distgain /= 20
	
	dist += distgain
	storedBal += distgain/1.4
	tDist += distgain
	
	//Calculate potential matter
	potentialMatter = tDist/128000
	potentialMatter = Math.round(potentialMatter)
	if(potentialMatter == Math.min()) potentialMatter = 0 //because division by 0 happens when asc is 0
	
	//Set displays
	display.innerHTML = dist.toFixed(1) + ' m<span style="font-size: 8px; margin-left: 8px;"><a style="color: white;" href="https://infinitemonitor.github.io/incremental-speed/changelog.html">version 1.1</a></span>'
	totalDisplay.innerHTML = tDist.toFixed(1) + " m travelled in total"
	psDisplay.innerHTML = `${distgain.toFixed(1)} m/tick`
	btnWithdraw.innerHTML = "Withdraw distance for $" + storedBal.toFixed(1)
	displayMatterGain.innerHTML = "If you ascend now, you will gain " + potentialMatter + " 💠 Matter"
},50)

//Hole loop (1 tps)
setInterval(() => {
	if(document.visibilityState == "hidden") return
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

document.addEventListener("visibilitychange", () => {
	if(document.visibilityState == "hidden") {
		lastIdle = Date.now()
	} else if(document.visibilityState == "visible") {
		distgain = baseSpeed*multSpeed
		distgain *= lvlSolar
		distgain /= luckPenalty
		distgain *= (Date.now()-lastIdle)/1000
		
		dist += distgain
		storedBal += distgain/1.4
		tDist += distgain
	}
}) //Calculate how much distance wouldve been covered while the user was tabbed out
   //This basically makes the game able to run in the background

function clearValues() {
	multSpeed = 1
	multLuck = 1
	lvlHole = 0
	sCost = 10
	bsCost = 25
	lCost = 175
	hCost = 0.08
	bal = 0 
	storedBal = 0 
	dist = 0
	tDist = 0
	baseSpeed = 1
	luckPenalty = 1
	holeBal = 0
	
	btnCollectHole.innerHTML = "Collect $" + holeBal.toFixed(2)
	moneyDisplay.innerHTML = "Your balance: $" + bal.toFixed(2)
	displaySpeed.innerHTML = "▶️ Speed multiplier is " + multSpeed.toFixed(2) + "x, base speed is " + baseSpeed.toFixed(2)
	btnUpgradeBSpeed.innerHTML = "Upgrade base speed for $" + bsCost.toFixed(2)
	btnUpgradeSpeed.innerHTML = "Upgrade speed multiplier for $" + sCost.toFixed(2)
	displayLuck.innerHTML = "💸 Money multiplier is " + multLuck.toFixed(2) + "x, but speed is divided by " + luckPenalty.toFixed(2)
	btnUpgradeLuck.innerHTML = "Upgrade luck for $" + lCost.toFixed(2)
	displayHole.innerHTML = "🕳️ Hole level " + lvlHole
	btnUpgradeHole.innerHTML = "Sacrifice " + hCost.toFixed(2) + "x SpMult"
	btnCollectHole.innerHTML = "Collect $" + holeBal.toFixed(2)
	displayPower.innerHTML = "🌩️ Upgrades raise multipliers by " + lvlPower.toFixed(2) + "x"
	btnUpgradePower.innerHTML = "Upgrade power for 💠 " + pCost.toFixed(2)
} //Used when ascending

//SAVING & LOADING
//using this cool localstorage thing cuz cookies are for losers
//the browser kind of cookies, obviously. actual cookies are neat

lst = window.localStorage

function save() {
	lst.setItem('_tag', Math.random()) //used when loading to verify that a save actually exists
	lst.setItem('multSpeed', multSpeed)
	lst.setItem('multLuck', multLuck)
	lst.setItem('lvlHole', lvlHole)
	lst.setItem('sCost', sCost)
	lst.setItem('bsCost', bsCost)
	lst.setItem('lCost', lCost)
	lst.setItem('hCost', hCost)
	lst.setItem('bal', bal)
	lst.setItem('storedBal', storedBal)
	lst.setItem('dist', dist)
	lst.setItem('tDist', tDist)
	lst.setItem('baseSpeed', baseSpeed)
	lst.setItem('luckPenalty', luckPenalty)
	lst.setItem('holeBal', holeBal)
	lst.setItem('pCost', pCost)
	lst.setItem('spCost', spCost)
	lst.setItem('lvlPower', lvlPower)
	lst.setItem('lvlSolar', lvlSolar)
	lst.setItem('matter', matter)
	lst.setItem('asc', asc)
}

function load() {
	if(!lst.getItem('_tag')) return
	multSpeed = parseFloat(lst.getItem('multSpeed'))
	multLuck = parseFloat(lst.getItem('multLuck'))
	lvlHole = parseFloat(lst.getItem('lvlHole'))
	sCost = parseFloat(lst.getItem('sCost'))
	bsCost = parseFloat(lst.getItem('bsCost'))
	lCost = parseFloat(lst.getItem('lCost'))
	hCost = parseFloat(lst.getItem('hCost'))
	bal = parseFloat(lst.getItem('bal'))
	storedBal = parseFloat(lst.getItem('storedBal'))
	dist = parseFloat(lst.getItem('dist'))
	tDist = parseFloat(lst.getItem('tDist'))
	baseSpeed = parseFloat(lst.getItem('baseSpeed'))
	luckPenalty = parseFloat(lst.getItem('luckPenalty'))
	holeBal = parseFloat(lst.getItem('holeBal'))
	pCost = parseFloat(lst.getItem('pCost'))
	spCost = parseFloat(lst.getItem('spCost'))
	lvlPower = parseFloat(lst.getItem('lvlPower'))
	lvlSolar = parseFloat(lst.getItem('lvlSolar'))
	matter = parseFloat(lst.getItem('matter'))
	asc = parseFloat(lst.getItem('asc'))
	
	btnCollectHole.innerHTML = "Collect $" + holeBal.toFixed(2)
	moneyDisplay.innerHTML = "Your balance: $" + bal.toFixed(2)
	displaySpeed.innerHTML = "▶️ Speed multiplier is " + multSpeed.toFixed(2) + "x, base speed is " + baseSpeed.toFixed(2)
	btnUpgradeBSpeed.innerHTML = "Upgrade base speed for $" + bsCost.toFixed(2)
	btnUpgradeSpeed.innerHTML = "Upgrade speed multiplier for $" + sCost.toFixed(2)
	displayLuck.innerHTML = "💸 Money multiplier is " + multLuck.toFixed(2) + "x, but speed is divided by " + luckPenalty.toFixed(2)
	btnUpgradeLuck.innerHTML = "Upgrade luck for $" + lCost.toFixed(2)
	displayHole.innerHTML = "🕳️ Hole level " + lvlHole
	btnUpgradeHole.innerHTML = "Sacrifice " + hCost.toFixed(2) + "x SpMult"
	btnCollectHole.innerHTML = "Collect $" + holeBal.toFixed(2)
	displayPower.innerHTML = "🌩️ Upgrades raise multipliers by " + lvlPower.toFixed(2) + "x"
	btnUpgradePower.innerHTML = "Upgrade power for 💠 " + pCost.toFixed(2)
}

function clrsave() {
	clearValues() //clear dat sh- stuff
	
	pCost = 1
	spCost = 1
	lvlPower = 0.12
	lvlSolar = 1
	asc = 0
	matter = 0 // + a few more variables that clearValues() doesnt cover
	
	save() //Overwrite the save...
	load() //...and load it
	//i thought this rhymed but it doesnt :(
}

btnSave.addEventListener("click", () => {
	save()
	btnSave.innerHTML = "saved!"
	setTimeout(() => {
		btnSave.innerHTML = "save"
	},1500)
})

btnClrSave.addEventListener("click", () => {
	if(btnClrSave.innerHTML == "confirm?") {
		clrsave()
		btnClrSave.innerHTML = "clear save"
		return
	}
	
	btnClrSave.innerHTML = "confirm?"
	setTimeout(() => {
		btnClrSave.innerHTML = "clear save"
	},1500)
})

setInterval(() => {save()}, 15000) //Autosave every 15 seconds

window.onload = () => {
	load()
} //Load save when entering the game

//BUTTON LOGIC

//Withdraw button
btnWithdraw.addEventListener("click", () => {
	bal += storedBal
	dist = 0
	storedBal = 0
	
	moneyDisplay.innerHTML = "Your balance: $" + bal.toFixed(2)
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
	
	ascDisplay.innerHTML = "You've gained " + Math.round(asc) + " total 💠 Matter from ascending"
	displayMatter.innerHTML = "You have " + matter.toFixed(2) + " 💠 Matter"
})

//Upgrade power button
btnUpgradePower.addEventListener("click", () => {
	if(matter < pCost) return
	matter -= pCost
	pCost *= 1.20
	lvlPower *= 1.22
	
	displayPower.innerHTML = "🌩️ Upgrades raise multipliers by " + lvlPower.toFixed(2) + "x"
	btnUpgradePower.innerHTML = "Upgrade power for 💠 " + pCost.toFixed(2)
	displayMatter.innerHTML = "You have " + matter.toFixed(2) + " 💠 Matter"
})

//Upgrade solar panel button
btnUpgradeSolar.addEventListener("click", () => {
	if(matter < spCost) return
	matter -= spCost
	spCost *= 1.16
	lvlSolar += 0.01
	
	displaySolar.innerHTML = "☀️ Solar panels granting +" + Math.round((lvlSolar-1)*100) + "% speed multiplier"
	btnUpgradeSolar.innerHTML = "Upgrade solar panels for 💠 " + spCost.toFixed(2)
	displayMatter.innerHTML = "You have " + matter.toFixed(2) + " 💠 Matter"
})
