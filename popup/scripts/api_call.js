const retrieve_definition_via_api = async (word) => {
    let language = "en";
    let api_url = `https://api.dictionaryapi.dev/api/v2/entries/${language}/${word}`;

    let response = await fetch(api_url);
    let definition;

    // if everything goes well i.e status OK
    if (response.ok) {
        let data = await response.json();
        definition = data[0].meanings[0].definitions[0].definition;
        // console.log(definition);
        return definition;
    } else {
        return undefined;
    }
}
