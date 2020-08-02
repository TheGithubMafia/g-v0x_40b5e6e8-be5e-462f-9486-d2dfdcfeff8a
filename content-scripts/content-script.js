// check if the extension works
console.log("Link previewer successfully added!");

// global variables
let H = window.innerHeight;
let W = window.innerWidth;
let x, y;

window.onresize = () => {
    H = window.innerHeight;
    W = window.innerWidth;
}

// creation of the tool tip
const create_tool = () => {

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
const place_tool = (x, y, tool) => {

    // then have it height and width that is predetermined
    let tool_h = tool.getBoundingClientRect().height;
    let tool_w = tool.getBoundingClientRect().width;
    // console.log(`h : ${tool_h} w : ${tool_w}`);

    let tt_x = 0, tt_y = 0;
    // conditions i.e the tool tip should show all the way 

    // for X co-ordinate
    if (W - x >= tool_w) {
        tt_x = x;
    } else {
        if (x >= tool_w) {
            tt_x = x - tool_w;
        } else {
            tt_x = W - tool_w;
        }
    }
    // for Y co-ordinate
    let yoff = 16; //so that there would be some space to click the link  
    if (H - y - yoff >= tool_h) {
        tt_y = y + yoff;
    } else {
        if (y >= tool_h + yoff) {
            tt_y = y - tool_h - yoff;
        } else {
            tt_y = 0;
        }
    }
    tool.style.left = `${tt_x}px`;
    tool.style.top = `${tt_y}px`;
}

// show function
const show = async (e) => {

    let tool = create_tool();
    x = e.pageX;
    y = e.pageY;
    place_tool(x, y, tool);

    let word = window.getSelection().toString().trim();
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


            tool.children[0].innerText = word[0].toUpperCase() + word.slice(1);
            tool.children[2].innerText = definition;
            tool.children[3].onclick = () => {
                window.open(`https://www.google.com/search?q=${word}+meaning`);
            };
        } else {
            tool.children[0].innerText = word[0].toUpperCase() + word.slice(1);;
            tool.children[2].innerText = "ERROR : nothing found !";
            tool.children[3].onclick = () => {
                window.open(`https://www.google.com/search?q=${word}+meaning`);
            };
        }
        // console.log(definition);
        place_tool(x, y, tool);
    }
}

// delete all the tabs
const delete_dict = (e) => {

    // regex to match dict class
    let reg = new RegExp("dict");

    // get the target classlist
    let tar = e.target.classList.toString();
    // console.log(reg.test(tar));

    // delete once clicked outside the dict tab
    // get all dict
    var arr = document.querySelectorAll('.dict');
    // console.log(arr.length);
    if (!reg.test(tar)) {
        for (let i of arr) {
            i.remove();
        }
    }
}
// get document and add a event listener
document.addEventListener("dblclick", show);
document.addEventListener("click", delete_dict);