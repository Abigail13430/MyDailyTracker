//Functions
function shouldRunToday() {
  const today = new Date().toLocaleDateString('en-US');
  const lastRun = localStorage.getItem('lastRunDate');
  if (lastRun !== today) {
    localStorage.setItem('lastRunDate', today);
    console.log("Running Emails and Reset...")
    return true;
  }
  console.log("Waiting to Run Emails and Reset...")
  return false;
}

function dailyReset() {
  console.log("Running daily logic at", new Date().toLocaleTimeString());
  localStorage.removeItem('intelligenceXP');
  localStorage.removeItem('charismaXP');
  localStorage.removeItem('athleticismXP');
  localStorage.removeItem('willPowerXP');
  localStorage.removeItem('happinessXP');
  localStorage.removeItem('streak');
}

function updateStreak() {
    const streak = localStorage.getItem("streak");
    const streakCounter = parseInt(localStorage.getItem("streakCounter"));
    if (streak) {
        localStorage.setItem("streakCounter", (streakCounter + 1).toString());
    }
    else {    
        localStorage.setItem("streakCounter", "0");  
    }
    
}

function sendSummary() {
//Loading Summary
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

    const today_date = (new Date()).toLocaleDateString('en-US');
    //Raw Summary
    const summary = `Intelligence XP: ${intelligenceXP}
        Charisma XP: ${charismaXP}
        Athleticism XP: ${athleticismXP}
        Will Power XP: ${willPowerXP}
        Happiness XP: ${happinessXP}`;

    const comboSummary = calculateScore([intelligenceXP, charismaXP, athleticismXP, willPowerXP, happinessXP]);
    console.log(comboSummary);

    const now = new Date();
    const today_time = now.toLocaleTimeString();

    var templateParams = {
        name: "abby",
        date: today_date,
        message: summary,
        time: today_time,
        email: "abbyhou71@gmail.com",
    };

    //Personal Specific Email Details
    if (sendEmailParameter) {
        emailjs.send('service_agnucbl', 'template_6ces4xp', templateParams).then(
        (response) => {
            console.log('SUCCESS!', response.status, response.text);
        },
        (error) => {
            console.log('FAILED...', error);
        },
        );
    }
}

function calculateScore(XPlst) {
    console.log("XP lst " + XPlst);
    //filter out max categories
    maxXPlst = XPlst.filter(number => number === 300);
    console.log("maxXPlst " + maxXPlst);

    //filter out empty categories
    someXPlst = XPlst.filter(number => number !== 0);
    console.log("someXPlst " + someXPlst);


    //All Star
    if (maxXPlst.length === 5) {
        console.log("All Star Combo");
        
        return `Intelligence XP: 600
        Charisma XP: 600
        Athleticism XP: 600
        Will Power XP: 600
        Happiness XP: 600`;
    }
    
    //Special Combo
    if (maxXPlst.length >= 3) {
        console.log ("Special Combo")

        return `Intelligence XP: ${XPlst[0] * 1.2}
        Charisma XP: ${XPlst[1] * 1.2}
        Athleticism XP: ${XPlst[2] * 1.2}
        Will Power XP: ${XPlst[3] * 1.2}
        Happiness XP: ${XPlst[4] * 1.2}`;
    }

    //Dimsum 
    if (someXPlst.length === 5) {
        console.log ("Dimsum Combo")

        return `Intelligence XP: ${XPlst[0] * 1.1}
        Charisma XP: ${XPlst[1] * 1.1}
        Athleticism XP: ${XPlst[2] * 1.1}
        Will Power XP: ${XPlst[3] * 1.1}
        Happiness XP: ${XPlst[4] * 1.1}`;
    }

    return `Intelligence XP: ${XPlst[0]}
        Charisma XP: ${XPlst[1]}
        Athleticism XP: ${XPlst[2]}
        Will Power XP: ${XPlst[3]}
        Happiness XP: ${XPlst[4]}`;
    
}

//Event Listeners

progress_reset_button.addEventListener("click", () => {
    updateStreak();
    dailyReset();
    window.location.reload();
});

streak_reset_button.addEventListener("click", () => {
    localStorage.setItem("streakCounter", "0");
    window.location.reload();
});

//Running Code
const sendEmailParameter = true;

if (shouldRunToday()) {
  sendSummary();
  updateStreak();
  dailyReset();
}
  


