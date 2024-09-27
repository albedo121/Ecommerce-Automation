# Selenium Automation Script with Node.js

This project is an automation script built with Selenium and Node.js. The script logs into a test automation site, places an order, and retrieves the order ID, displaying it in the console.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contact](#contact)

## Installation
1. Clone the repository uisng git clone.
2. Run 'npm install' command to install the necessary node packages.

## Usage
1. Run the script using 'node index.js' command
2. By default the script runs on firefox driver. You can change the browser to chrome by changing to 'BROWSER.CHROME' at line 15 of index.js file.
3. The email and password is already provided at line 10 and 11. These are test credentials since its a test site.
4. After executing, the script will log in to the test ecommerce site, place an order, and display the order ID in the console.
5. Sometimes the script may fail at certain point. In that case please rerun the script.
6. After order is placed, the browser window remains open for 10 seconds and then closes. If u want to change the timer then u can change values at line 149 in script file.

## Contact
1. Made by- Vishal Kumar Singh
2. Email- vishalkumar.singh12@yahoo.com
3. Github profile- https://github.com/albedo121
