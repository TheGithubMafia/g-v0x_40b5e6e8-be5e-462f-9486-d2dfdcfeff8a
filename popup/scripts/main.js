// entry point

window.onload = () => {
    // event listener for search submit button
    let search_submit_button = document.getElementById("submit");
    search_submit_button.onclick = () => {
        get_data_and_write();
    };

    // event listener for enter button
    let search_field = document.getElementById("inp");
    search_field.onkeydown = (e) => {
        let key = e.keyCode;

        // if enter is pressed
        if (key == 13) {
            get_data_and_write();
        }
    }

    // when toggle is clicked
    let toggle = document.getElementById("cb");
    toggle.onclick = () => {
        browser.storage.local.set({ is_search_allowed: toggle.checked });
    }
}

// write definition from api call and write it to dom
const get_data_and_write = async () => {

    // get word from input
    inp = document.getElementById("inp");
    word = inp.value.trim();

    // show loading
    write_definition_to_dom(word, "loading...");

    // get definition from api
    let definition = await retrieve_definition_via_api(word);
    // console.log(definition);

    // if word is valid
    if (word.length > 0) {
        // assign these elements now
        write_definition_to_dom(word, definition);
    } else {
        // if not show error
        write_definition_to_dom(word, "ERROR : Not found !");
    }

}

