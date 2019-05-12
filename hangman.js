var buttonCollection = document.querySelectorAll(".categoryBtn");
var live;
var point;
var categories = [];
var usedLetters = [];
var messages = ["Dobrze, oby tak dalej!", "Juz użyłeś tej litery!", "Powiesiłeś biednego Zdzicha :C ", "Gratulacje, wygrałeś!",  "Podaj poprawny znak!" , "Nie ma jeszcze żadnego słowa w tej kategori!", " Nie ma takiej litery!"];
categories["technique"] = ["komputer", "router", "myszka", "procesor","karta graficzna", "drukarka"];
categories["poets"] = ["Juliusz Słowacki", "Adam Mickiewicz", "Homer", "Henryk Sienkiewicz"];
categories["my"] = [];

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
        document.querySelector(".msg").innerText = messages[5]
        return 0;
    } else {
        document.querySelector(".msg").innerText = "";
    }

    word = write(word);

    var letterColection = document.querySelectorAll(".letter");

    var windowEventHandler;
    window.removeEventListener("keypress", windowEventHandler);
    window.addEventListener("keypress", windowEventHandler = function (e) {
        parse(word, e, letterColection, windowEventHandler);
    });

};

const parse = (word, e, collection, windowEventHandler) => {
    let error = true;
    let reg = /^[a-zA-Zą-żĄ-Ż]$/ ;
    let msg = 0;
    let msgConteiner = document.querySelector(".msg");
   
    if(reg.test(e.key)) {
    var used = isUsed(e.key);

    if (!used) {
        for (let i = 0; i < word.length; i++) {
            if (word[i] == e.key || word[i].toLowerCase() == e.key) {
                collection[i].innerText = word[i];
                point++;
                error = false;
            }
        }
        if (error) {
            live--;
            document.querySelector(".live").innerText = `Pozostało Ci: ${live} szanse aby uratować Zdzicha!`;
            msg = 6;
            if (live == 0) {
               msg = 2; 
               window.removeEventListener("keypress", windowEventHandler);
            } 
        } 
    } else {
        msg = 1;
    }

    if (point == word.length) {
        msg = 3;
        window.removeEventListener("keypress", windowEventHandler);
    }

    }else 
        msg = 4;

        msgConteiner.innerText = messages[msg];
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
};

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
};

const randomWord = category => {
    let numberWord = Math.floor(Math.random() * categories[category].length);
    let newWord = categories[category][numberWord];

    return newWord;
};

const addWord = () => {
    var newWord = prompt("Podaj słowo, które chcesz dodać").trim();
    categories["my"].push(newWord);
};

document.querySelector(".addWord").addEventListener("click", addWord);
var btnCollection = document.querySelectorAll(".categoryBtn");

for (let btn of btnCollection) {
    btn.addEventListener("click", gameOn);
}


