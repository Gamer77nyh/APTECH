function getASCIIValue(character) {
    let lengthOfInput = character.length;
    if (lengthOfInput == 1) {
        let asciiValue = character.charCodeAt(0);
        return asciiValue;

    } else {
        return "false pls input a proper single charater";
    }
}

let input = 'a';
let result = getASCIIValue(input);
console.log(result);
