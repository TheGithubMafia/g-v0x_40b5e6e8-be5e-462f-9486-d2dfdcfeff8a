console.log("Web dictionary successfully added!");

const show_dictionary_tooltip = async (e) => {

    let mouseX = e.pageX;
    let mouseY = e.pageY;

    let tooltip = new Dictionary_tooltip();
    tooltip.create_tooltip();
    // tooltip.place_tooltip(mouseX, mouseY);

    let word = window.getSelection().toString().trim();
    if (word.length > 0) {
        let definition = await retrieve_definition_via_api(word);
        tooltip.write_definition(word, definition);
    } else {
        tooltip.write_definition(tool, word, "ERROR : Not found !");
    }

    // to reposition after filling the data
    // tooltip.place_tooltip(mouseX, mouseY);
}

const delete_all_dictionary_tooltip = (e) => {
    let reg = new RegExp("dict");
    let tar = e.target.classList.toString();
    let arr = document.querySelectorAll('.dict');
    if (!reg.test(tar)) {
        for (let i of arr) {
            i.remove();
        }
    }
}

document.ondblclick = (e) => {
    show_dictionary_tooltip(e);
};

document.onclick = (e) => {
    // delete_all_dictionary_tooltip(e);
};