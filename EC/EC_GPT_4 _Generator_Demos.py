import random
import csv

# Define market names
market_names = [
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
]

# Generate data
data = []
categories = [
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
]

for market in market_names:
    row = {'marketname': market}
    for category in categories:
        row[category] = 'Yes' if random.random() < 0.5 else 'No'
    data.append(row)

# Write data to CSV file
with open('farmers-market-data.csv', mode='w', newline='') as csv_file:
    fieldnames = ['marketname'] + categories
    writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
    writer.writeheader()
    for row in data:
        writer.writerow(row)

print('Data has been written to farmers-market-data.csv')
