function TranslateString(id) {
    var TextToTranslateElement = document.getElementById(id); //get element that contains text to translate
    var TextToTranslate = TextToTranslateElement.value; //get text to translate from element
    //var ArrayOfTextToTranslate = TextToTranslate.split(" "); //split on spaces to array of words
    var ArrayOfTextToTranslate = TextToTranslate.replace(/[^\w\s]|_/g, function ($1) { return ' ' + $1 + ' ';}).replace(/[ ]+/g, ' ').split(' '); //from http://jsfiddle.net/zNHJW/3/
    var LanguageMap = GetDictionary(); //setup translation mappings
    
    //loop through each word to translate
    for (var WordCounter = 0; WordCounter < ArrayOfTextToTranslate.length; WordCounter++) {
        //loop through each translation item to check for word to translate
        for (var TranslateCounter = 0; TranslateCounter < LanguageMap.length; TranslateCounter++) {
            //check for match
            if(ArrayOfTextToTranslate[WordCounter].toLowerCase() === LanguageMap[TranslateCounter].english.toLowerCase()) {                
                ArrayOfTextToTranslate[WordCounter] = LanguageMap[TranslateCounter].swedish; //match was found, so switch the english word for the swedish word
            }
        }
    }
    
    var TranslatedText = ArrayOfTextToTranslate.join(" "); //join array into a string separated by spaces.
    //var PunctuationRegex = /( [,.])/;
    //TranslatedText.replace(PunctuationFixer.replace(" ", ""), "$1");
    
    var PunctuationMap = GetPunctuation();
    for (var PunctuationCounter = 0; PunctuationCounter < PunctuationMap.length; PunctuationCounter++) {
        var match = PunctuationMap[PunctuationCounter].match;
        var replacement = PunctuationMap[PunctuationCounter].replacement;
        TranslatedText = TranslatedText.replace(match, replacement);
    }
    
    TextToTranslateElement.value = TranslatedText;
}
               
function GetDictionary() {
    var TempDictionary = [
        { english: "merry", swedish: "god" },
        { english: "christmas", swedish: "jul" },
        { english: "and", swedish: "och" },
        { english: "happy", swedish: "gott" },
        { english: "new", swedish: "nytt" },
        { english: "year", swedish: "år" }
    ];
    return TempDictionary;
}

function GetPunctuation() {
    var TempDictionary = [
        { match: " .", replacement: "." },
        { match: " ,", replacement: "," },
        { match: " !", replacement: "!" },
        { match: " ?", replacement: "?" }
    ];
    return TempDictionary;
}
            
function CheckIfCharacterIsUpperCase(character) {
    if (character == character.toUpperCase()) {
        return true;
    }
    if (character == character.toLowerCase()){
        return false;
    }
    return false;
}