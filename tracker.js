const intelligence = document.getElementById("aname"); //placeholder
const savedTime = localStorage.getItem("startTime"); //placeholder

//load
let intelligenceXP = parseInt(localStorage.getItem("intelligenceXP"));
let charismaXP = parseInt(localStorage.getItem("charismaXP"));
let athleticismXP = parseInt(localStorage.getItem("athleticismXP"));
let willPowerXP = parseInt(localStorage.getItem("willPowerXP"));
let happinessXP = parseInt(localStorage.getItem("happinessXP"));
if (!intelligenceXP) {
    intelligenceXP = 0;
}
if (!charismaXP) {
    charismaXP = 0;
}
if (!athleticismXP) {
    athleticismXP = 0;
}
if (!willPowerXP) {
    willPowerXP = 0;
}
if (!happinessXP) {
    happinessXP = 0;
}

//Functions
function cap(x) {
    if (x > 300) {
        x = 300;
    }
    return x;
}
function save() {
    localStorage.setItem("intelligenceXP", cap(intelligenceXP).toString());
    localStorage.setItem("charismaXP", cap(charismaXP).toString());
    localStorage.setItem("athleticismXP", cap(athleticismXP).toString());
    localStorage.setItem("willPowerXP", cap(willPowerXP).toString());
    localStorage.setItem("happinessXP", cap(happinessXP).toString());
    //Streak Update
    localStorage.setItem("streak", true);
    loadStreak();
}
function updateProgressBar(statId, xp) {
    const statIdMap = {
        intelligence: "Intelligence",
        charisma: "Charisma",
        athleticism: "Athleticism",
        willPower: "Will Power",
        happiness: "Happiness"
    }
    const progressEl = document.getElementById(`${statId}-progress`);
    const capped_xp = cap(xp)
    const percent = (capped_xp / 300) * 100;
    progressEl.style.width = `${percent}%`;
    const progressE1_display = document.getElementById(`${statId}-label`);
    progressE1_display.textContent = statIdMap[statId] + ": " + capped_xp + "/ 300";
}
function loadProgress() {
    const xpMap = {
        intelligence: intelligenceXP,
        charisma: charismaXP,
        athleticism: athleticismXP,
        willPower: willPowerXP,
        happiness: happinessXP
    };
    for (let x of Object.keys(xpMap)) {
        updateProgressBar(x, xpMap[x]);
        //console.log("Running for " + x + "...");
    }
}

function loadStreak(){
    const streak = localStorage.getItem("streak");
    const streak_icon = document.getElementById('streak_icon');
    if (streak) {
        console.log("Updating Streak icon...")
        streak_icon.src = "icons/lit_fire_icon.png"
    }

    const streak_count = localStorage.getItem("streakCounter");
    streak_label.textContent = streak_count;
}



//Buttons
academicSY.addEventListener("click", () => {
    intelligenceXP += 50;
    save();
    updateProgressBar("intelligence", intelligenceXP);
});
jobApps.addEventListener("click", () => {
    charismaXP += 50;
    save();
    updateProgressBar("charisma", charismaXP);
});
research.addEventListener("click", () => {
    charismaXP += 75;
    save();
    updateProgressBar("charisma", charismaXP);
});
walkHershey.addEventListener("click", () => {
    athleticismXP += 20;
    save();
    updateProgressBar("athleticism", athleticismXP);
});
exercise.addEventListener("click", () => {
    athleticismXP += 50;
    save();
    updateProgressBar("athleticism", athleticismXP);
});
personalProjects.addEventListener("click", () => {
    willPowerXP += 50;
    save();
    updateProgressBar("willPower", willPowerXP);
});
extra.addEventListener("click", () => {
    willPowerXP += 50;
    save();
    updateProgressBar("willPower", willPowerXP);
});
hobbies.addEventListener("click", () => {
    happinessXP += 50;
    save();
    updateProgressBar("happiness", happinessXP);
});
reading.addEventListener("click", () => {
    happinessXP += 40;
    save();
    updateProgressBar("happiness", happinessXP);
});

//Document Load
document.addEventListener("DOMContentLoaded", () => {
    loadProgress();
    loadStreak();
});