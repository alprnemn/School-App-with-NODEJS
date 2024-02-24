function generateRandomNumber() {
    const prefix = 2024;
    const min = 1000; 
    const max = 9999; 
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    const result = parseInt(prefix.toString() + randomNumber.toString().padStart(4, '0'));

    return result;
}

module.exports = generateRandomNumber;