
// write definition to dom
const write_definition_to_dom = (word, definition) => {
    // dom elements
    let title = document.getElementsByClassName("res-title")[0];
    let desc = document.getElementsByClassName("res-desc")[0];
    let more = document.getElementsByClassName("res-more")[0];

    // write definition and word
    title.innerText = capitalize(resize_string(word, 70));
    desc.innerText = resize_string(definition, 220);

    // put event listener on more button
    more.onclick = () => {
        window.open(`https://www.google.com/search?q=${word}+meaning`);
    };
}

// function to resize string
const resize_string = (input_string, limit_length) => {
    if (input_string.length > limit_length) {
        input_string = input_string.slice(0, limit_length) + "...";
    }
    return input_string;
}

// capitalize a word
const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}