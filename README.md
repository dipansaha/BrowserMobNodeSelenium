# Capture network traffic using NodeJS, BrowserMob Proxy, and Selenium

## Examples
This project has test for all browser to capture network traffic from the pageload using NodeJs , BrowserMob Proxy and Selenium

Browser test : `Chrome`, `Firefox`, `IE`, `Headless - Chrome`, `Headless - Firefox`


### Testing
1. Install dependencies `npm install`

2. run browsermob-proxy 

      1. Option 1: Download BrowserMob Proxy from here https://bmp.lightbody.net/ 
      2. Option 2: I have included BrowserMobProxy library under lib folder including powershell script which will import certificate and run the server. Go to lib folder in powershell and run ./run-proxy-server.ps1

2. Run the tests 
      1. `npm run start`
      2. `npm run test`
