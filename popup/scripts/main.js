let inp, submit;
let word, title, desc, more;

// getting definition
const get_def = async () => {
    // get dom
    inp = document.getElementById("inp");
    word = inp.value.trim();
    // loading
    title.innerText = "Loading...";
    desc.innerText = "Loading...";

    // get definition
    let lang = "en";
    if (word.length > 0) {
        let def = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/${lang}/${word}`);

        if (def.ok) {
            let data = await def.json();
            let definition = data[0].meanings[0].definitions[0].definition;
            // console.log(definition);
            // incase word is greater than 60
            if (word.length > 60) {
                word = word.slice(0, 220) + "...";
            }
            // incase definition is greater than 200
            if (definition.length > 220) {
                definition = definition.slice(0, 220) + "...";
            }

            title.innerText = word[0].toUpperCase() + word.slice(1);
            desc.innerText = definition;


        } else {
            title.innerText = word[0].toUpperCase() + word.slice(1);
            desc.innerText = "ERROR : nothing found !";
        }

        // get more anyway
        more.onclick = () => {
            window.open(`https://www.google.com/search?q=${word}+meaning`);
        };
    }
}

// it sends the checkbox data to the content script that is injected into tabs
const send_info = (tabs) => {
    // console.log(tabs[0]);
    let cb = document.getElementById("cb");
    browser.tabs.sendMessage(tabs[0].id, {
        checkbox_value: cb.checked
    });
}

// send error report to the content script
const send_report = (err) => {

    browser.tabs.sendMessage(tabs[0].id, {
        ERROR: err
    });
}


// get dom
inp = document.getElementById("inp");
word = inp.value.trim();

// result
title = document.getElementsByClassName("res-title")[0];
desc = document.getElementsByClassName("res-desc")[0];
more = document.getElementsByClassName("res-more")[0];
submit = document.getElementById("submit");

// event listener
submit.onclick = () => { get_def() };
inp.addEventListener("keydown", (e) => {
    let key = e.keyCode;

    // if enter is pressed
    if (key == 13) {
        get_def();
    }
});

// send checkbox data
document.addEventListener("click", (e) => {
    // console.log(e.target.id);
    if (e.target.id == "cb") {
        browser.tabs.query({ active: true, currentWindow: true })
            .then(send_info)
            .catch(send_report);
    }
})
