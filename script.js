window.addEventListener("load", () => {
    setInterval(update, 300);
    initialiseConfig("startTime");
    initialiseConfig("hadLunch");
})

const config = {
    startTime: 0,
    hadLunch: 0
}

function update(){
    const startTime = [[9, 0], [9, 30]][config.startTime];
    const lunchOffset = [-1000 * 60 * 30, 0][config.hadLunch];
    const now = new Date();
    const start = new Date();
    start.setHours(startTime[0]);
    start.setMinutes(startTime[1]);
    start.setSeconds(0);
    start.setMilliseconds(0);
    const lunchlessElapsed = now.getTime() - start.getTime();
    const elapsed = lunchlessElapsed + lunchOffset;
    const hours = elapsed / (1000 * 60 * 60)

    const monthly = 1621.51;
    const yearly = monthly * 12;
    const weekly = yearly / 52;
    const hourly = weekly / 37.5;

    const today = hourly * (37.5 / 5);
    const earnedAlready = Math.round(hourly * hours * 100) / 100;
    const yetToEarn = today - earnedAlready;

    document.getElementById("earnedAlready").innerHTML = `£${earnedAlready.toFixed(2)}`;
    document.getElementById("yetToEarn").innerHTML = `£${yetToEarn.toFixed(2)}`;
}

function initialiseConfig(name){
    const options = [];
    let selected = config[name];
    let hadAnotherOption = false;
    do{
        const nextOptionValue = options.length;
        const nextOption = document.getElementById(`${name}-option-${nextOptionValue}`);
        hadAnotherOption = !!nextOption;
        nextOption && options.push(nextOption)
    } while(hadAnotherOption);

    const deselect = () => {
        selected !== null && options[selected].classList.remove("is-primary");
        selected = null;
        config[name] = null;
    }

    const select = (option) => {
        deselect();
        selected = option;
        options[selected].classList.add("is-primary");
        config[name] = selected;
    }

    options.forEach((option, index) => {
        option.addEventListener("click", () => {
            if(selected !== index){
                select(index);
            }
            update();
        })
        if(index === config[name]){
            select(index);
        }
    })
}