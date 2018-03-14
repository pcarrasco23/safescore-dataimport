## Database

The data store for the SafeScore app is a MongoDB database.

Install and run MongoDB with Homebrew
```
        brew update
        brew install mongodb
        mkdir -p /data/db
        sudo chown -R '-id =un' /data/db
        # Enter your password
```

Create a directory for the data and set the permissions.
```  
        mkdir -p /data/db
        sudo chown -R '-id =un' /data/db
        # Enter your password
```

Open a new terminal window and run the MongoDB daemon
```    
        mongod
```

Restore the coordinates collection to MongoDB database
```      
        mongorestore --collection coordinates --db nycinspections coordinatesdump/coordinates.bson
```

## Data Import

The dataimport code is a Python3 script that imports Restaurant Inspection data from NYC's open data portal into the MongoDB database. It will also import coordinates for each restaurant into the database.

The following instructions will show you how to install Python3 and its dependencies on your development machine and run the script. If you already have a Python3 environment setup then you can go skip the Python3 installation step.

Install Python 3 and pipenv
```                        
        brew install python
        pip install --user pipenv
```

Add pipenv to your local path by editing your ~/.profile file and add the following to the bottom of the file. Then open a new terminal window.
```                        
        export PATH=~/Library/Python/3.6/bin:$PATH
```

Install dependencies for the data import script to the virtual environment and activate the virtual environment
```                        
        cd dataimport
        pipenv install -r requirements.txt
        pipenv shell
```

Run the data import Python script.

This script will download the latest NYC Restaurant inspection data file and import the data into a MongoDB collection.
```                        
        python3 nycrestaurantdataimport.py
```

For more detailed information about Python3 install on Mac OS X go to: http://docs.python-guide.org/en/latest/starting/install3/osx/

## Api

The API code is a domain service layer in front of the MongoDB database rewritten in Node.js using Express for the web application framework.

Install Node (npm is installed with Node)
```
        brew install node
```                        

Install the npm mpdule dependencies for the service
```        
        cd service
        npm install
```                        

Run the tests for the service
```          
        npm test
```

Open a separate terminal window and start the service. By default the service will run on port 3000. If your service needs to run on a different port you will need to make a change to the web client code on the Web client section with the port number.
```           
        npm start
```

# Web Client

The web client is an Angular application that requests data from the API.

You will need a Google API key to run the mapping portion of the Angular web client. Go to https://developers.google.com/maps/documentation/javascript/get-api-key to register your application and get a key.

Once you have a Google API key, go to the "web" folder, and open the file called "src/app/constants.ts" in your favorite editor (mine is nano).
```        
        cd web
        nano src/app/constants.ts
```

Enter your Google API key as the value of the googlemapsapi name-value pair in the constants dictionary and save the file. Also if your Node.js service is running on a port other than 3000 change the URL of the service in the serviceurl name-value pair.

Install Angular and dependencies and start web application (make sure you are in the web folder)
```     
        npm install
```

Run the tests for the web application
```     
        npm test
```

Open a separate terminal window and start the web application
```          
        npm start
```                                          
