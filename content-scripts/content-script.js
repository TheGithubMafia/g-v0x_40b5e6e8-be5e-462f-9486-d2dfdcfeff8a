// check if the extension works
console.log("Web dictionary successfully added!");
let is_search_allowed;

// get is_search_allowed variable
// if data is available in storage 
const get_permission = () => {
    let is_search_allowed;

    let gettingItem = browser.storage.local.get();
    gettingItem.then(onGot, onError);

    function onGot(item) {
        console.log(item);
        is_search_allowed = item || true;
    }

    function onError(error) {
        console.log(`Error: ${error}`);
        is_search_allowed = true;
    }
    return is_search_allowed;
}

// show function
const show_dictionary_tooltip = async (e) => {

    // create tooltip
    let tool = create_dictionary_tooltip();

    // get mouse co-ordinates
    let x = e.pageX;
    let y = e.pageY;
    // console.log(`x : ${x} y : ${y}`);

    // place dictionary tool tip
    place_dictionary_tooltip(x, y, tool);

    // get word and definition
    let word = window.getSelection().toString().trim();

    if (word.length > 0) {
        // get definition from api
        let definition = await retrieve_definition_via_api(word);
        // console.log(definition);

        // write to the dictionary tooltip
        write_into_dictionary_tooltip(tool, word, definition);
    } else {
        // write to the dictionary tooltip
        write_into_dictionary_tooltip(tool, word, "ERROR : Not found !");
    }

    // place again 
    place_dictionary_tooltip(x, y, tool);
}

// delete all the tabs
const delete_all_dictionary_tooltip = (e) => {

    // regex to match dict class
    let reg = new RegExp("dict");

    // get the target classlist
    let tar = e.target.classList.toString();
    // console.log(reg.test(tar));

    // delete once clicked outside the dict tab
    var arr = document.querySelectorAll('.dict');
    // console.log(arr.length);
    if (!reg.test(tar)) {
        for (let i of arr) {
            i.remove();
        }
    }
}

// when double clicked and text is selected
document.addEventListener("dblclick", () => {

    console.log(get_permission());
    show_dictionary_tooltip(e);
});

// when clicked outside the dictionary tooltip
document.addEventListener("click", delete_all_dictionary_tooltip);
