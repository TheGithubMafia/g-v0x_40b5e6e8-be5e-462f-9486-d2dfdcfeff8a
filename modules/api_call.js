const retrieve_definition_via_api = async (word) => {

    let language = "en";
    let api_url = `https://api.dictionaryapi.dev/api/v2/entries/${language}/${word}`;
    let response = await fetch(api_url);
    if (response.ok) {
        let data = await response.json();
        let definition = data[0].meanings[0].definitions[0].definition;
        return definition;
    } else {
        return undefined;
    }
}
