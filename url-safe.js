module.exports = (string) => {

    const lowerCaseString = string.toLowerCase();
    return lowerCaseString.replace(/ /g, '-')
};