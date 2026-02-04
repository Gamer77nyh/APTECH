function getASCII(char) {
    if (char.length !== 1) {
        throw new Error("Input must be a single character.");
    }
    return char.charCodeAt(0);
}

// Example Usage:
try {
    console.log(getASCII('a')); // Output: 97
    // console.log(getASCII('AB')); // Should throw error
} catch (error) {
    console.error(error.message);
}

module.exports = getASCII;
