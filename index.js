const {Builder, By, Key, Browser, until, Select} = require('selenium-webdriver');
const { elementLocated } = require('selenium-webdriver/lib/until');
require('chromedriver'); //For Chrome browser

(async ()=> {

    try {
        //DECLARE VARIABLES
        const domain = 'https://magento.softwaretestingboard.com/'
        const email = 'john@doe.com'
        const password = 'Automation_987'
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms)); //Incase we need to add some delay in our code

        //LAUNCH BROWSER AND MAXIMIZE WINDOW
        driver = await new Builder().forBrowser(Browser.FIREFOX).build() //Mention desired browser name here
        await driver.manage().window().maximize()

        //NAVIGATE TO ECOMMERCE SITE
        await driver.get(domain)

        //CLICK ON SIGN IN LINK
        await driver.wait(until.elementLocated(By.xpath("//li[@class='authorization-link']"),5000))  //Wait till sign in link is loaded
        const signIn_link = await driver.findElement(By.xpath("//li[@class='authorization-link']"))  //Find sign in link using xpath
        await signIn_link.click()

        //LOGIN USING EMAIL AND PASSWORD
        await driver.wait(until.elementLocated(By.name('login[username]'),5000)) //Wait for email field to load
        await driver.wait(until.elementLocated(By.name('login[password]'),5000)) //Wait for password field to load
        await driver.wait(until.elementLocated(By.id('send2'),5000)) //Wait for sign in button to load

        
        const email_field = await driver.findElement(By.name('login[username]')) //Find email input box
        const password_field = await driver.findElement(By.name('login[password]')) //Find password input box
        const signIn_button = await driver.findElement(By.id('send2')) //Find sign in button

        await email_field.sendKeys(email)  //Enter email
        await password_field.sendKeys(password) //Enter password
        await signIn_button.click() //Click on sign in button

        //NAVIGATE TO Men--> Tops --> Jackets
        let actions = driver.actions()

        await driver.wait(until.elementLocated(By.id('ui-id-5'))) //Wait for Men menu to be load

        const men_menu = await driver.findElement(By.id('ui-id-5')) //Find men menu
        await actions.move({origin: men_menu}).perform() //Navigate to men menu

        const tops_menu = await driver.findElement(By.id('ui-id-17')) //Find tops menu
        await actions.move({origin: tops_menu}).perform() //navigate to tops menu

        const jackets_menu = await driver.findElement(By.id('ui-id-19'))
        jackets_menu.click()

        //SELECT PRICE FILTER 50.00$-59.99$
        await driver.wait(until.elementLocated(By.className('filter-options-title'))) //Wait till filter section loads

        const price_text = await driver.findElement(By.xpath('//*[@id="narrow-by-list"]/div[11]/div[1]')) //Find Price filter
        price_text.click() //Click on price title text

        const price_range = await driver.findElement(By.xpath('//*[@id="narrow-by-list"]/div[11]/div[2]/ol/li[2]/a/span[1]'))
        price_range.click() //Click on price range 50.00$-59.99$

        //SELECT SIZE, COLOR AND ADD TO CART
        await driver.wait(until.elementLocated(By.id('option-label-size-143-item-168'))) //Wait for M size tile to load
        await driver.wait(until.elementLocated(By.id('option-label-color-93-item-53')))  //Wait for color tile to load
        await driver.wait(until.elementLocated(By.xpath("(//button[@title='Add to Cart'])[1]"))) //Wait for add to cart button to load

        const size_m = await driver.findElement(By.xpath('(//*[@id="option-label-size-143-item-168"])[1]'))
        const color_green = await driver.findElement(By.xpath('(//*[@id="option-label-color-93-item-53"])[1]'))
        const addToCart = await driver.findElement(By.xpath("(//button[@title='Add to Cart'])[1]"))

        size_m.click()  //Select Medium size
        color_green.click() //Select green color
        addToCart.click() //Click on Add to cart button
        await delay(3000) //Give delay as it takes time for item to be added in cart

        //GO TO CART PAGE AND PROCEED TO CHECKOUT
        await driver.get('https://magento.softwaretestingboard.com/checkout/cart/') //Go to cart page
        await delay(3000) //Adding 3s delay for firefox browser.
        await driver.wait(until.elementLocated(By.xpath("//button[@data-role='proceed-to-checkout']")))//Wait for checkout button to load
        const checkout_button = await driver.findElement(By.xpath("//button[@data-role='proceed-to-checkout']"))
        console.log('meow')
        checkout_button.click()
        
        //ENTER DETAILS AND CLICK NEXT-
        //If Address already saved in addressbook
        try {
            await delay(5000)
            const element = await driver.findElement(By.className('shipping-address-items'))
            console.log('Address already present in addressbook. Proceeding with order...')
            await delay(5000); // Adding a 3s delay as site takes some time to calculate shipping rate
            await driver.wait(until.elementLocated(By.className('button action continue primary'))) //Wait for next button to load
            const next_button = await driver.findElement(By.className('button action continue primary')) //Find next button
            next_button.click() //Click next button
        }
        //If no address saved in addressbook
        catch (error)
        {
            console.log('No address found in addressbook. Updating new address and proceeding with order...')
            const address_xpath = '/html/body/div[2]/main/div[2]/div/div[2]/div[4]/ol/li[1]/div[2]/form/div/fieldset/div/div[1]/div/input'
            const city_xpath = '/html/body/div[2]/main/div[2]/div/div[2]/div[4]/ol/li[1]/div[2]/form/div/div[4]/div/input'
            const pincode_xpath = '/html/body/div[2]/main/div[2]/div/div[2]/div[4]/ol/li[1]/div[2]/form/div/div[7]/div/input'
            const phone_xpath = '/html/body/div[2]/main/div[2]/div/div[2]/div[4]/ol/li[1]/div[2]/form/div/div[9]/div/input'
            const state_xpath = '/html/body/div[2]/main/div[2]/div/div[2]/div[4]/ol/li[1]/div[2]/form/div/div[5]/div/select'
            const country_xpath = '/html/body/div[2]/main/div[2]/div/div[2]/div[4]/ol/li[1]/div[2]/form/div/div[8]/div/select'

            await driver.wait(until.elementLocated(By.xpath(address_xpath)))  //Wait for address box to load
            await driver.wait(until.elementLocated(By.xpath(city_xpath)))     //Wait for city box to load
            await driver.wait(until.elementLocated(By.xpath(pincode_xpath)))  //Wait for pincode box to load
            await driver.wait(until.elementLocated(By.xpath(phone_xpath)))    //Wait for phone no box to load
            await driver.wait(until.elementLocated(By.xpath(country_xpath)))  //Wait for country box to load

            const address1 = await driver.findElement(By.xpath(address_xpath))  //Find address input box
            const city = await driver.findElement(By.xpath(city_xpath))         //Find city input box
            const pincode = await driver.findElement(By.xpath(pincode_xpath))   //Find pincode input box
            const phone = await driver.findElement(By.xpath(phone_xpath))       //Find phone input box
        
            await address1.sendKeys('Test Address')     //Send address to address input box
            await city.sendKeys("Mumbai")               //Send city to city input box
            await pincode.sendKeys("12345")             //Send pincode to input pincode box
            await phone.sendKeys("9876543210")          //Send phone to input phone box

            const countryDD = await new Select(await driver.findElement(By.xpath(country_xpath))) //Create class to select country from DD
            await countryDD.selectByVisibleText('India')    //Select country India

            const stateDD = await new Select(await driver.findElement(By.xpath(state_xpath))) //Create class to select state from DD
            await stateDD.selectByVisibleText('Maharashtra')    //Select state Maharashtra

            
            await delay(5000); // Adding a 3s delay as site takes some time to calculate shipping rate

            await driver.wait(until.elementLocated(By.className('button action continue primary'))) //Wait for next button to load
            const next_button = await driver.findElement(By.className('button action continue primary')) //Find next button
            next_button.click() //Click next button
        }

        //FINALLY PLACE THE ORDER AND GET ORDER ID-
        await delay(5000)
        await driver.wait(elementLocated(By.xpath('/html/body/div[3]/main/div[2]/div/div[2]/div[4]/ol/li[3]/div/form/fieldset/div[1]/div/div/div[2]/div[2]/div[4]/div/button')))
        const placeOrder_button = await driver.findElement(By.xpath('/html/body/div[3]/main/div[2]/div/div[2]/div[4]/ol/li[3]/div/form/fieldset/div[1]/div/div/div[2]/div[2]/div[4]/div/button'))
        placeOrder_button.click()

        //RETRIEVE ORDER ID-
        await driver.wait(until.elementLocated(By.xpath('//*[@id="maincontent"]/div[3]/div/div[2]/p[1]/a/strong'))) //Wait for order id to load
        const orderIdElement = await driver.findElement(By.xpath('//*[@id="maincontent"]/div[3]/div/div[2]/p[1]/a/strong'))
        const orderId = await orderIdElement.getText()
        console.log('Order placed successfully. Your order ID is:', orderId)

        await delay(10000) //Added a 10s timer to see the confirmation screen. Comment this line if u want driver to close immediately.

    } catch (error) {
        console.log('AN ERROR OCCURED: ')
        console.log(error)
    } finally {
        if(driver)
            await driver.quit();
    }

}) ()