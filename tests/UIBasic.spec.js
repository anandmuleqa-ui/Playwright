const {test, expect, selectors} = require('@playwright/test');
const { getRandomValues } = require('node:crypto');



test('first test',async ({page}) => 
{
    const url = "https://rahulshettyacademy.com/loginpagePractise/";

    await page.goto(url);
    console.log(await page.title());
    await page.locator('#username').fill("rahulshettyacademy"); 
    await page.locator('#password').fill("Learning@830$");
    await page.locator('#signInBtn').click();

    const err =  await page.locator("[style*='block']").textContent();
    console.log(err);
    await expect(err).toContain("Incorrect"); 
}
);

test('Register NEw user and login', async ({page}) =>
{
    const url = "https://rahulshettyacademy.com/client/#/auth/login";
    // const username = "anandtest";
    const password = "Learning@123";

    await page.goto(url);
    //click on register user 
    const rand = randomva
    const firstName = page.locator('#firstName');  
    const lastName = page.locator('#lastName');
    const email = page.locator('#userEmail');
    const phone = page.locator('#userMobile');
    const occupation = page.locator('select[formcontrolname= "occupation"]');
    const radioBtn = page.locator('input[value ="Male"]');
    const passwordField = page.locator('#userPassword');
    const confirmPassword = page.locator('#confirmPassword');
    const registerBtn = page.locator('#login');   
    const checkox = page.locator('input[type="checkbox"]');
    const login = page.locator('.btn-primary');
    const username = 'anandmuleqa39@gmail.com';

    await page.locator(".text-reset").click();
    // Fill in username and password
    await firstName.fill("Anand");
    await lastName.fill("Test");
    await email.fill(username);
    await phone.fill("9876543210");
    await occupation.selectOption("Student");
    await radioBtn.check();
    expect (radioBtn.tobechecked())
    
    await passwordField.fill("Learning@123");
    await confirmPassword.fill("Learning@123");   
    await checkox.check();
    await registerBtn.click();
    // Click sign in button
    await login.click();
    // await page.waitForURL('**/auth/login/**', { timeout: 5000 });
    //login 
    await page.locator('#userEmail').click();
    await page.locator('#userEmail').fill(username); 
    await page.locator('#userPassword').fill("Learning@123");
    await page.locator('#login').click();
    const titles   =  page.waitForLoadState('networkidle')

   await page.waitForLoadState('networkidle');
    console.log(await page.title());
    console.log("User registered and logged in successfully");
}
);

test.only ('locator', async ({browser}) =>
{

    const context = await browser.newContext();
    const page = await context.newPage();
    // const url = "https://rahulshettyacademy.com/AutomationPractice/";
    const url = "https://rahulshettyacademy.com/AutomationPractice/";
    const radio = page.locator('.radioButton')
    
    
    
    await page.goto(url);
    await page.waitForLoadState('networkidle');

    await radio.first().click();
    await radio.last().click();
    await radio.nth(1).click();

   const sel = page.locator('select[name="dropdown-class-example"]');
//    await sel.selectOption('option2');
    const blick = page.locator('.blinkingText');
    await expect(blick).toHaveAttribute("class","blinkingText");
    
    const [page2] = await Promise.all([ 
            context.waitForEvent('page'),           //listen for new page event
             blick.click(),                    //new page link
                ]);

    const title =  await page2.title();
    console.log(title);
}

);

test('E2E test: Select product, add to cart, make payment and verify order', async ({ page }) => {
    const url = "https://rahulshettyacademy.com/client/#/auth/login";
    const username = 'anandmuleqa4@gmail.com';
    const password = 'Learning@123';

    // Login
    await page.goto(url);
    await page.locator('#userEmail').fill(username);
    await page.locator('#userPassword').fill(password);
    await page.locator('#login').click();

    // Wait for products to load
    await page.waitForLoadState('networkidle');

    // Select first product and add to cart
    const products = page.locator('.card-body');
    const firstProduct = products.first();
    const addToCartBtn = firstProduct.locator('text=Add To Cart');
    await addToCartBtn.click();

    // Go to cart
    await page.locator('[routerlink="/dashboard/cart"]').click();

    // Verify product in cart
    await expect(page.locator('.cartSection h3')).toHaveText('ADIDAS ORIGINAL'); // Adjust selector as needed

    // Checkout
    await page.locator('text=Checkout').click();

    // Fill shipping details if needed (assuming auto-filled or skip)

    // Make payment
    await page.locator('.payment__type').first().click(); // Select payment method
    // await page.locator('.payment__info input').first().fill('1234567890123456'); // Card number
    // await page.locator('.payment__info input').nth(1).fill('12/25'); // Expiry
    // await page.locator('.payment__info input').nth(2).fill('123'); // CVV
    // await page.locator('.payment__info input').nth(3).fill('John Doe'); // Name
    await page.locator('input[placeholder*="Select Country"]').pressSequentially('Ind',{delay:100}); 
    page.pause();  // Country
    // await page.locator('button.list-group-item').nth(1).click();

    const country = page.locator(".ta-results");
    await country.waitFor();
    const optioncount = await  country.locator("button").count();
 console.log(optioncount);
    for(let i=0;i<optioncount;i++)
    {
         const text = await country.locator("button").nth(i).textContent();
         console.log(text);
         page.pause();
         if(text.trim()=="India"){
            await country.locator("button").nth(i).click();
            page.pause();
            break;
         }
    }


    // Submit payment
    await page.locator('.action__submit').click();

    // Verify order confirmation
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');

    // Verify order number
    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    console.log('Order ID:', orderId);
    expect(orderId).toBeTruthy();
}); 

