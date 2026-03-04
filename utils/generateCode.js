const { nanoid } = require("nanoid");

/*
Generates a random unique short code
used in shortened URLs.
*/

const generateCode = () => {
    return nanoid(6); // 6 character code
};

module.exports = generateCode;