// creation of the tool tip
const create_dictionary_tooltip = () => {

    /*
    <div class="dict">
            <div class="dict-title">Here is the title</div>
            <hr class="dict-hr">
            <div class="dict-desc">Here come the description</div>
            <button class="dict-more">More</button>
        </div>
    */

    // create the container that holds everything
    let dict = document.createElement("div");
    dict.classList = "dict";

    // title
    let dict_title = document.createElement("div");
    dict_title.classList = "dict-title";
    dict_title.innerText = "Loading...";

    // hr
    let hr = document.createElement("hr");
    hr.classList = "dict-hr";

    // description
    let dict_desc = document.createElement("div");
    dict_desc.classList = "dict-desc";
    dict_desc.innerText = "Here comes the description";

    // the more button
    let dict_more = document.createElement("button");
    dict_more.classList = "dict-more"
    dict_more.innerText = "More";

    // add them all into the tool data
    dict.appendChild(dict_title);
    dict.appendChild(hr);
    dict.appendChild(dict_desc);
    dict.appendChild(dict_more);

    // put tooltip into the body
    document.body.appendChild(dict);

    return dict;
}

// function to place tooltip
const place_dictionary_tooltip = (x, y, tool) => {

    // get window height and width
    let H = window.innerHeight;
    let W = window.innerWidth;

    // get height and width of the tooltip
    let tool_h = tool.getBoundingClientRect().height;
    let tool_w = tool.getBoundingClientRect().width;
    // console.log(`h : ${tool_h} w : ${tool_w}`);

    let final_x = 0, final_y = 0;
    // conditions i.e the tool tip should show all the way 

    // for X co-ordinate
    if (W - x >= tool_w) {
        final_x = x;
    } else {
        if (x >= tool_w) {
            final_x = x - tool_w;
        } else {
            final_x = W - tool_w;
        }
    }
    // for Y co-ordinate
    let yoff = 16; //so that there would be some space for the text 
    if (H - y - yoff >= tool_h) {
        final_y = y + yoff;
    } else {
        if (y >= tool_h + yoff) {
            final_y = y - tool_h - yoff;
        } else {
            final_y = 0;
        }
    }
    tool.style.left = `${final_x}px`;
    tool.style.top = `${final_y}px`;
}

// write into dictionary tooltip
const write_into_dictionary_tooltip = (tool, word, definition) => {
    tool.children[0].innerText = capitalize(resize_string(word, 70));
    tool.children[2].innerText = resize_string(definition, 70);
    tool.children[3].onclick = () => {
        window.open(`https://www.google.com/search?q=${word}+meaning`);
    }
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