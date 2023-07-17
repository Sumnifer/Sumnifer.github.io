class Rock {
    constructor() {
        this.goldNuggets = 0;
        this.multiplicative = 1;
        this.nuggetsPerSec = 0;
    }

    getNuggets() {
        this.goldNuggets += (Math.round(this.multiplicative));
    }

    showMoreNuggets() {
        const nugget = document.createElement("img");
        nugget.src = "assets/img/nugget.png";
        nugget.classList.add("body__clicker_container_text_nugget");
        const moreNuggets = document.createElement("span");
        moreNuggets.classList.add("body__clicker_container_bloc_rock_span")
        moreNuggets.textContent = "+" + Math.round(this.multiplicative);
        moreNuggets.appendChild(nugget);
        const container = document.querySelector(".body__clicker_container_bloc_rock");
        container.appendChild(moreNuggets);

        setTimeout(() => {
            container.removeChild(moreNuggets);
        }, 500);
    }

    updateNuggetsCount() {
        let nugget = "<img src='assets/img/nugget.png' class='body__clicker_container_text_nugget'>"
        return document.querySelector(".nuggetsCounter").innerHTML = this.goldNuggets + " Pépites d'Or" + nugget;
    }

    generateNuggetsEachSeconds() {
        const pickaxes = [woodPickaxe, rockPickaxe, ironPickaxe, goldPickaxe, emeraldPickaxe, rubyPickaxe, saphirPickaxe];
        this.nuggetsPerSec = pickaxes.reduce((total, pickaxe) => total + pickaxe.nuggetsPerSec, 0);
        this.goldNuggets += this.nuggetsPerSec;
        this.updateNuggetsCount();
        console.log(this.nuggetsPerSec);
    }

    startNuggetTimer() {
        setInterval(() => {
            this.createRandomNugget();
        }, 120000);// Timer à 2 minutes
    }

    createRandomNugget() {
        const nugget = document.createElement("img");
        nugget.src = "assets/img/nugget.png";
        nugget.classList.add("random-nugget");
        nugget.style.left = Math.random() * (window.innerWidth - 50) + "px";
        nugget.style.top = Math.random() * (window.innerHeight - 50) + "px";
        document.body.appendChild(nugget);

        setTimeout(() => {
            nugget.style.opacity = 0;
            setTimeout(() => {
                document.body.removeChild(nugget);
            }, 1000);
        }, 10000); // disparition au bout de 10 secondes

        let toto = null;
        let WoohooAudio = new Audio("assets/WoohooSoundEffect.mp3");
        let WoohooTimeout = null;

        nugget.addEventListener("click", () => {
            WoohooAudio.volume = 0.2;
            WoohooAudio.play();

            // Arrêter la lecture du son après 5 secondes
            clearTimeout(WoohooTimeout);
            WoohooTimeout = setTimeout(function() {
                WoohooAudio.pause();
                WoohooAudio.currentTime = 0;
            }, 5000);
            document.querySelector("#circle").style.animation = "none";
            console.log(this.multiplicative);
            this.multiplicative += Math.round(this.multiplicative * 2);
            console.log(this.multiplicative);
            this.updateNuggetsCount();
            nugget.style.opacity = 0;
            let countdownNumber = document.getElementById('countdown-number');
            let countdown = 30;
            countdownNumber.textContent = countdown;

            if (toto !== null) {
                setTimeout(toto);
                clearInterval(toto);
            }
            toto = setInterval(function () {
                countdown = --countdown <= 0 ? 30 : countdown;
                countdownNumber.textContent = countdown;
            }, 1000);
        setTimeout(() => {
                document.body.removeChild(nugget);
            }, 1000);
            const bonusSquare = document.createElement("div");
            bonusSquare.classList.add("bonus-square");
            document.querySelector("#countdown").style.display = "flex";
            document.querySelector("#circle").style.animation = "countdown 30s linear infinite forwards";
            bonusSquare.innerHTML = "<i class=\"fa-solid fa-arrow-up\"></i>"
            document.body.appendChild(bonusSquare);
        setTimeout(() => {
            document.querySelector("#countdown").style.display = "none"
            document.querySelector("#circle").style.animation = "none"

            document.body.removeChild(bonusSquare);
            this.multiplicative = this.multiplicative / 2; // On retire le bonus
        }, 30000); // au bout de 30 secondes

        });
    }

}

class Pickaxe {
    constructor(name, cost, multiplicative, upgradedNuggetsPerSec) {
        this.name = name;
        this.cost = cost;
        this.multiplicative = multiplicative;
        this.level = 0;
        this.nuggetsPerSec = 0;
        this.upgradedNuggetsPerSec = upgradedNuggetsPerSec;

    }


    getUpgrade(rock) {
        if (rock.goldNuggets >= this.cost) {
            this.level++;
            this.nuggetsPerSec += this.upgradedNuggetsPerSec
            this.cost = Math.round(this.cost);
            this.multiplicative *= 1.01;
            rock.multiplicative += this.multiplicative
            rock.goldNuggets -= Math.round(this.cost);
            rock.updateNuggetsCount();
            this.cost *= 1.25;

            rock.updateNuggetsCount();
            return console.log("Multiplicateur :" + rock.multiplicative);
        }
    }
}

function checkButtonAvailability() {
    const pickaxes = [woodPickaxe, rockPickaxe, ironPickaxe, goldPickaxe, emeraldPickaxe, rubyPickaxe, saphirPickaxe, diamondPickaxe];
    const nuggets = ROCK.goldNuggets;
    for (const pickaxe of pickaxes) {
        const button = document.querySelector("." + pickaxe.name);
        const level = document.querySelector("." + pickaxe.name + "Level");
        const cost = document.querySelector("." + pickaxe.name + "Cost");
        level.innerHTML = pickaxe.level;
        cost.innerHTML = "Prix : " + Math.round(pickaxe.cost);
        if (pickaxe.cost > ROCK.goldNuggets) {
            button.style = "filter : grayscale(100%); pointer-events: none;";
        } else {
            button.style = "filter : grayscale(0%);";
        }

    }
}


const ROCK = new Rock();
ROCK.updateNuggetsCount();
ROCK.startNuggetTimer();

let MiningAudio = new Audio("assets/MiningSoundEffect.mp3");
let MiningTimeout = null;
const ROCK_ELEMENT = document.querySelector("#rock");
ROCK_ELEMENT.addEventListener("click", function () {
    MiningAudio.currentTime = 0.5;
    MiningAudio.play();
    MiningTimeout = setTimeout(function() {
    MiningAudio.pause();
    clearTimeout(MiningTimeout);

        }, 200);
    ROCK.getNuggets();
    ROCK.updateNuggetsCount();
    checkButtonAvailability();
    ROCK.showMoreNuggets();
});
//=================== Upgrades Declarations =====================//

const woodPickaxe = new Pickaxe("woodPickaxe", 10, 1, 1);
const rockPickaxe = new Pickaxe("rockPickaxe", 250, 2, 2);
const ironPickaxe = new Pickaxe("ironPickaxe", 2500, 4, 4);
const goldPickaxe = new Pickaxe("goldPickaxe", 15000, 8, 8);
const emeraldPickaxe = new Pickaxe("emeraldPickaxe", 50000, 10, 10);
const rubyPickaxe = new Pickaxe("rubyPickaxe", 100000, 16, 16);
const saphirPickaxe = new Pickaxe("saphirPickaxe", 500000, 20, 20);
const diamondPickaxe = new Pickaxe("diamondPickaxe", 2500000, 25, 25);

//===============================================================//
const pickaxes = [woodPickaxe, rockPickaxe, ironPickaxe, goldPickaxe, emeraldPickaxe, rubyPickaxe, saphirPickaxe, diamondPickaxe];
let WesternAudio = new Audio("assets/WesternSoundEffect.mp3");
let WesternTimeout = null;
for (const pickaxe of pickaxes) {
    const button = document.querySelector("." + pickaxe.name);
    button.addEventListener("click", () => {
            WesternAudio.play();
            clearTimeout(WesternTimeout);
            WesternTimeout = setTimeout(function() {
                WesternAudio.pause();
                WesternAudio.currentTime = 0;
            }, 5000);
        document.querySelector(".body__clicker_container_cta_container_level").innerHTML = pickaxe.level
        pickaxe.getUpgrade(ROCK);
        checkButtonAvailability();
    });
}

setInterval(ROCK.generateNuggetsEachSeconds.bind(ROCK), 1000);
setInterval(checkButtonAvailability, 500);

