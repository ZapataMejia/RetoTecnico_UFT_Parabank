import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('Registro de usuario dinámico con Faker (US-1)', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');

    await page.waitForLoadState('networkidle'); 

    await page.getByRole('link', { name: 'Register' }).click();

    // Aqui forzamos a una espera para asegurar que el formulario está visible
    const firstNameLocator = page.locator('#customer\\.firstName');
    await firstNameLocator.waitFor({ state: 'visible' });

    const userData = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zip: faker.location.zipCode(),
        phone: faker.string.numeric(10),
        ssn: faker.string.alphanumeric(8),
        username: faker.internet.username().replace(/[^a-zA-Z0-9]/g, ''), 
        password: faker.internet.password({ length: 12, prefix: 'Qa!' })
    };

    await firstNameLocator.click();
    await firstNameLocator.fill(userData.firstName);
    
    await page.locator('#customer\\.lastName').click();
    await page.locator('#customer\\.lastName').fill(userData.lastName);
    
    await page.locator('#customer\\.address\\.street').click();
    await page.locator('#customer\\.address\\.street').fill(userData.street);
    
    await page.locator('#customer\\.address\\.city').click();
    await page.locator('#customer\\.address\\.city').fill(userData.city);
    
    await page.locator('#customer\\.address\\.state').click();
    await page.locator('#customer\\.address\\.state').fill(userData.state);
    
    await page.locator('#customer\\.address\\.zipCode').click();
    await page.locator('#customer\\.address\\.zipCode').fill(userData.zip);
    
    await page.locator('#customer\\.phoneNumber').click();
    await page.locator('#customer\\.phoneNumber').fill(userData.phone);
    
    await page.locator('#customer\\.ssn').click();
    await page.locator('#customer\\.ssn').fill(userData.ssn);
    
    await page.locator('#customer\\.username').click();
    await page.locator('#customer\\.username').fill(userData.username);
    
    await page.locator('#customer\\.password').click();
    await page.locator('#customer\\.password').fill(userData.password);
    
    await page.locator('#repeatedPassword').click();
    await page.locator('#repeatedPassword').fill(userData.password);

    await page.getByRole('button', { name: 'Register' }).click();

    // Verificación de éxito
    await expect(page.getByRole('heading', { name: `Welcome ${userData.username}` }))
        .toBeVisible();
});