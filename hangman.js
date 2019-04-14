var buttonCollection = document.querySelectorAll(".categoryBtn");
var live;
var point;
var categories = [];
var usedLetters = [];

categories["technique"] = ["komputer", "router", "kolumna", "komputer", "router", "kolumna", "komputer", "router", "kolumna"];
categories["poets"] = ["Stanisław Słowacki", "Julian Potocki", "Adam Mickiewicz" , "Zenon Ziembiewicz"];
categories["my"] = [];
var test = false;

const gameOn = e => {

    live = 5;
    point = 0;
    usedLetters = [];

    let conteinerLetters = document.querySelector(".conteiner");
    conteinerLetters.innerHTML = "";

    let usedLettersConteiner = document.querySelector(".usedLetters");
    usedLettersConteiner.innerHTML = "";

    var category = e.target.value;
   
    var word = randomWord(category);
    if(!word)
    {
        console.log("Nie ma jeszcze żadnego słowa w tej kategori!");
        return 0;
    }

    word = write(word);

    var letterColection = document.querySelectorAll(".letter");

    var windowEventHandel;
    window.removeEventListener("keypress", windowEventHandel);
    window.addEventListener("keypress", windowEventHandel = function (e) {
        parse(word, e, letterColection, windowEventHandel)
    })

};

const parse = (word, e, collection, windowEventHandel) => {
    let error = true;
    console.log(usedLetters);
    var used = isUsed(e.key);

    if (!used) {
        for (let i = 0; i < word.length; i++) {
            if (word[i] == e.key) {
                collection[i].innerText = word[i];
                point++;
                error = false;
            }
        }
        if (error) {
            live--;
            if (live == 0) {
                console.log("Przegrałeś!");
                window.removeEventListener("keypress", windowEventHandel);
            } 
        } 
    } else {
        console.log("Juz użyłeś tej litery!");
    }
    if (point == word.length) {
        console.log("Gratulacje, wygrałeś!");
        window.removeEventListener("keypress", windowEventHandel);
    }
};

const write = word => {
    for (let i = 0; i < word.length; i++) {
        let conteiner = document.querySelector(".conteiner");
        let div = document.createElement("div");
        if (word[i] == " ") {
            div.classList.add("space");
            word = word.split(" ");
            word = word.join("");
            i--;
        } else {
            div.classList.add("letter");
        }
        conteiner.appendChild(div);
    }
    return word;
}

const isUsed = letter => {
    let used = false;

    for (let item of usedLetters) {
        if (letter == item)
            used = true;
    }
    if (!used) {

        let span = document.createElement("span");
        document.querySelector(".usedLetters").appendChild(span).innerText = letter;
        usedLetters.push(letter);
    }
    return used;
}

const randomWord = category => {
    let numberWord = Math.floor(Math.random() * categories[category].length);
    let newWord = categories[category][numberWord];

    return newWord;
};

const addWord = () => {
    var newWord = prompt("Podaj słowo, które chcesz dodać");
    categories["my"].push(newWord);
};

document.querySelector(".addWord").addEventListener("click", addWord);
var btnCollection = document.querySelectorAll(".categoryBtn");

for (let btn of btnCollection) {
    btn.addEventListener("click", gameOn);
}


