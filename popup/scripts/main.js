window.onload = () => {

    let search_submit_button = document.getElementById("submit");
    search_submit_button.onclick = () => {
        get_data_and_write_definition();
    };

    let search_input_field = document.getElementById("inp");
    search_input_field.onkeydown = (e) => {
        let key = e.keyCode;

        // key = 13 for enter button
        if (key == 13) {
            get_data_and_write_definition();
        }
    }
}

const get_data_and_write_definition = async () => {

    word = document.getElementById("inp").value.trim();
    let definition = await retrieve_definition_via_api(word);

    let existing_dictionary_dom = document.getElementsByClassName("result")[0];

    let tooltip = new Dictionary_tooltip();
    tooltip.create_tooltip(existing_dictionary_dom);
    tooltip.write_definition(word, "loading...");

    if (word.length > 0) {
        tooltip.write_definition(word, definition);
    } else {
        tooltip.write_definition(word, "ERROR : Not found !");
    }
}

