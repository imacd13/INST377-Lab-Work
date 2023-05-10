const { createReadStream, createWriteStream } = require('fs');
const csv = require('csv-parser');
const ObjectsToCsv = require('objects-to-csv');

// Define market names
const marketNames = [
  'Union Square Greenmarket',
  'Santa Monica Farmers Market',
  'Pike Place Market',
  'Portland Farmers Market',
  'Eastern Market',
  'Ferry Plaza Farmers Market',
  'Crescent City Farmers Market',
  'Charleston Farmers Market',
  'Minneapolis Farmers Market',
  'Green City Market'
];

// Generate data
const data = [];
const categories = [
  'bakedgoods',
  'cheese',
  'crafts',
  'flowers',
  'eggs',
  'seafood',
  'herbs',
  'vegetables',
  'honey',
  'jams',
  'maple',
  'meat',
  'nursery',
  'nuts',
  'plants',
  'poultry',
  'prepared',
  'soap',
  'trees',
  'wine'
];

for (let i = 0; i < marketNames.length; i++) {
  const row = {
    marketname: marketNames[i]
  };
  for (let j = 0; j < categories.length; j++) {
    row[categories[j]] = Math.random() < 0.5 ? 'No' : 'Yes';
  }
  data.push(row);
}

// Write data to CSV file
const csvWriter = new ObjectsToCsv(data);
csvWriter.toDisk('./farmers-market-data.csv', { append: false });

console.log('Data has been written to farmers-market-data.csv');
