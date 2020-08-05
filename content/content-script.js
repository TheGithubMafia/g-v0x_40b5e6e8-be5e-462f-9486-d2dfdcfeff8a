console.log("Web dictionary successfully added!");

const show_dictionary_tooltip = async (e) => {
    e.preventDefault();
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    let tooltip;

    let word = window.getSelection().toString().trim();
    if (word.length > 0) {

        tooltip = new Dictionary_tooltip();
        tooltip.create_tooltip();
        tooltip.place_tooltip(mouseX, mouseY);

        let definition = await retrieve_definition_via_api(word);
        tooltip.write_definition(word, definition);
    } else {
        tooltip.write_definition(tool, word, "ERROR : Not found !");
    }

    // to reposition after filling the data
    tooltip.place_tooltip(mouseX, mouseY);
}

const delete_all_dictionary_tooltip = (e) => {
    let reg = new RegExp("dict");
    let target_element = e.target.classList.toString();
    let all_tooltip_elements = document.querySelectorAll('.dict');
    if (!reg.test(target_element)) {
        for (let elem of all_tooltip_elements) {
            elem.remove();
        }
    }
}

document.ondblclick = (e) => {
    show_dictionary_tooltip(e);
};

document.onclick = (e) => {
    delete_all_dictionary_tooltip(e);
};