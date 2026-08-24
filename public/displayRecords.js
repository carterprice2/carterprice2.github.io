// define all the records  
const records = [
    women100 = {
        event: "100m",
        name: "Kendal Nielsen",
        time: "12.09",
        year: "2012"
    },
    women200 = {
        event: "200m",
        name: "Kendal Nielsen",
        time: "25.52",
        year: "2012"
    },
    women400 = {
        event: "400m",
        name: "Malone Pearson",
        time: "59.12a",
        year: "2012"
    },
    women800 = {
        event: "800m",
        name: "Nikki Hodgson",
        time: "2:14.34",
        year: "2002"
    },
    women800 = {
        event: "800m",
        name: "Nikki Hodgson",
        time: "2:14.34",
        year: "2002"
    },
    women1500 = {
        event: "1500m",
        name: "Jennifer Smith",
        time: "5:19.00",
        year: "1998"
    },
    women3200 = {
        event: "3200m",
        name: "Jennifer Smith",
        time: "11:26.30",
        year: "1998"
    },
    women110hurdles = {
        event: "110m hurdles",
        name: "Nicole Jackson",
        time: "15.18a",
        year: "2007"
    },
    women300hurdles = {
        event: "300m hurdles",
        name: "Tawny Halverson",
        time: "45.54a",
        year: "1998"
    },
    women4x100m = {
        event: "4x100m",
        name: "Gatto, Higley, Pearson, Tomkiewicz",
        time: "50.46",
        year: "2012"
    },
    women4x400m = {
        event: "4x400m",
        name: "Nielsen, Gatto, Higley, Pearson",
        time: "4:00.87",
        year: "2012"
    },
    HighJump = {
        event: "High Jump",
        name: "Rachel Welz",
        time: "5'8\"",
        year: "2007"
    },
    longJump = {
        event: "Long Jump",
        name: "Kendal Nielsen",
        time: "19'3.5\"",
        year: "2012"
    },
    poleVault = {
        event: "Pole Vault",
        name: "Julia Pisenti",
        time: "9'6\"",
        year: "2021"
    },
    discus = {
        event: "Discus",
        name: "Julia P",
        time: "125'10\"",
        year: "2021"
    },
    shot = {
        event: "Shot Put",
        name: "Madalyn Groulx",
        time: "37'9.25\"",
        year: "2009"
    },
];


// actually start to display them 
console.log(records)

function addEventToTable(testEvent) {

    const tableElement = document.getElementById("main")
    var trElement = document.createElement("tr");
    
    for(const key in testEvent)
    {
        var tdElement = document.createElement("td");
        
        tdElement.innerText = testEvent[key];
        // tdElement.classList.add("tableCell");
        trElement.appendChild(tdElement);
    }
    
    tableElement.appendChild(trElement);
}

function main(){

    for(let i = 0; i < records.length; i++ ) {
        addEventToTable(records[i]);
    }
}

main()
    

