#!/usr/bin/env python
"""This script reads the NYC Restaurant Inspection file from the specified
location and loads the data into a MongoDB collection"""

import csv
import requests
from datetime import datetime
from pymongo import MongoClient, DESCENDING
from constants import Constants

def extractdata():
    """ Extract data from the import file and transform the data into a dictionary collection"""

    restaurants = {}

    # Open the CSV file and read the contents line by line
    print ("Downloading file...")   

    download_file(Constants.csv_file, Constants.local_csv_file)
        
    with open(Constants.local_csv_file, "r") as infile:
        reader = csv.reader(infile, delimiter=',')

        # Skip the heading row
        next(reader)
        count = 0

        for row in reader: 
            # Do not process the row if the restaurant name is missing
            if len(row[1]) == 0:
                continue

            print("Processing row: " + str(count)) 
            transformdata(row, restaurants)
            count = count + 1

    return restaurants

def transformdata(row, restaurants):
    """ Transform the row from the inport file into a restaurant dictionary """

    restaurantid = row[0]

    # Process restaurant by id
    if restaurantid in restaurants:
        restaurant = restaurants[restaurantid]
    else:
        restaurant = {}
        restaurant["id"] = int(row[0])
        restaurant["name"] = row[1]
        restaurant["streetNumber"] = row[3]
        restaurant["street"] = row[4]
        restaurant["city"] = row[2]
        restaurant["state"] = "NY"
        restaurant["zipCode"] = row[5]
        restaurant["phoneNumber"] = row[6]
        restaurant["cuisineDescription"] = row[7]
        restaurant["latitude"] = 0
        restaurant["longitude"] = 0
        restaurant["score"] = -1
        restaurant["grade"] = ""
        restaurant["closed"] = False

        # To make searching by name more efficient (in conjunction with an index)
        restaurant["name_lower"] = row[1].lower()

        restaurant["inspections"] = []

        restaurants[restaurantid] = restaurant

    # Process inspection by date
    date = datetime.strptime(row[8], "%m/%d/%Y")
    inspections = [i for i in restaurant["inspections"] if i["date"] == date]
    if inspections:
        inspection = inspections[0]
    else:
        score = 0
        if row[13] != "":
            score = int(row[13])

        inspection = {"date": date, "score": score, "grade": row[14], "action": row[9], "violations" : []}
        restaurant["inspections"].append(inspection)
        # Sort inspections by date descending
        restaurant["inspections"].sort(key=takeDateAttr, reverse = True)

        # Record the grade and score of the most recent inspection in the main restaurant detail
        restaurant["grade"] = restaurant["inspections"][0]["grade"]
        restaurant["score"] = restaurant["inspections"][0]["score"]

        # Record closure of the restaurant from the action of the inspection
        restaurant["closed"] = "closed" in restaurant["inspections"][0]["action"].lower()

    # Process violations by code
    code = row[10]
    if code:   # Do not process if violation code is blank
        violation = {"code" : row[10], "description" : row[11], "criticalFlag" : (row[12].lower() == "critical")}
        inspection["violations"].append(violation)

def takeDateAttr(elem):
    return elem['date']

def takeNameLowerAttr(elem):
    return elem['name_lower']

def loaddata(restaurants):
    """ Load the restaurants dictionary into a MongoDB collection"""
    # Connect to the local MongoDB instance
    client = MongoClient(Constants.mongo_host, Constants.mongo_port)
    mongodb = client.nycinspections

    # Insert restaurant documents into a new collection sorted by name
    mongodb.restaurants_temp.drop()
    mongodb.restaurants_temp.insert(r for r in sorted(restaurants.values(), key=takeNameLowerAttr))

    # Once the insert succeeds drop the existing collection (including the index)
    mongodb.restaurants.drop()

    # And rename the temp collection to restaurants
    mongodb.restaurants_temp.rename("restaurants")

    # Create an index on name_lower field
    mongodb.restaurants.create_index([("name_lower", DESCENDING)], background=True)

    # Loop through the coordinates records and get the latitude and longitude
    cursor = mongodb.coordinates.find(modifiers = { "$snapshot": True })

    for coordinate in cursor:
        restaurant = mongodb.restaurants.find_one({ "id" : int(coordinate["id"]) })
        if restaurant:
            print (restaurant["id"])
            mongodb.restaurants.update_one(
                { "id" : int(coordinate["id"])}, 
                { "$inc" : { "latitude" : coordinate["latitude"], "longitude" : coordinate["longitude"] }})

    client.close()

def etldata():
    """ Extract the data from the import file
        Transform each row into a restaurant dictionary object
        Load the collection of restaurnat dictionary objects into a MongoDB collection"""
    restaurantcoll = extractdata()

    loaddata(restaurantcoll)

def download_file(url, local_filename):
    """ Download url to local file """
    r = requests.get(url, stream=True)
    with open(local_filename, 'wb') as f:
        for chunk in r.iter_content(chunk_size=1024): 
            if chunk: # filter out keep-alive new chunks
                f.write(chunk)
    
if __name__ == '__main__':
    etldata()



