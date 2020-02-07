const path = require('path');
const fs = require('fs');

const pickCards = (arr, n) => {
  const pickedArr = [];
  const arrLength = arr.length;
  const generateIndex = () => {
    const j = Math.floor(Math.random() * arrLength);
    console.log(j)
    if (pickedArr.includes(j)) {
      generateIndex()
    }
    return j;
  }
  for (let i = 0; i < n; i++) {
    pickedArr.push(generateIndex());
  }
  const pickedCards = pickedArr.map(d => arr[d]);
  return pickedCards;
}

const getImg = (req, res) => {
  const dir = path.resolve(__dirname, '../src/img/cards/front')
  const files = fs.readdirSync(dir)
  const shuffledFiles = pickCards(files, 6);
  res.send(shuffledFiles);
}

module.exports = getImg;