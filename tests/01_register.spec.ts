import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import * as path from 'path';

const STORAGE_STATE_PATH = path.join(__dirname, '..', 'playwright/.auth/user.json');

test('Registro de usuario dinámico y guardado de estado (US-1)', async ({ page }) => {
    
    // 1. Navegación al formulario de registro
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await page.waitForLoadState('networkidle'); 
    await page.getByRole('link', { name: 'Register' }).click();

    const firstNameLocator = page.locator('#customer\\.firstName');
    await firstNameLocator.waitFor({ state: 'visible' });

    // 2. Generación de datos dinámicos con Faker
    const baseUsername = faker.internet.username().replace(/[^a-zA-Z0-9]/g, '').slice(0, 10);
    const uniqueId = faker.string.numeric(4); 

    const userData = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zip: faker.location.zipCode(),
        phone: faker.string.numeric(10),
        ssn: faker.string.alphanumeric(8),
        username: `${baseUsername}${uniqueId}`,
        password: faker.internet.password({ length: 12, prefix: 'Qa!' })
    };

    // 3. Rellenar el formulario
    await firstNameLocator.fill(userData.firstName);
    await page.locator('#customer\\.lastName').fill(userData.lastName);
    await page.locator('#customer\\.address\\.street').fill(userData.street);
    await page.locator('#customer\\.address\\.city').fill(userData.city);
    await page.locator('#customer\\.address\\.state').fill(userData.state);
    await page.locator('#customer\\.address\\.zipCode').fill(userData.zip);
    await page.locator('#customer\\.phoneNumber').fill(userData.phone);
    await page.locator('#customer\\.ssn').fill(userData.ssn);
    await page.locator('#customer\\.username').fill(userData.username);
    await page.locator('#customer\\.password').fill(userData.password);
    await page.locator('#repeatedPassword').fill(userData.password);
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page.getByRole('heading', { name: `Welcome ${userData.username}` })).toBeVisible();
    await page.context().storageState({ path: STORAGE_STATE_PATH });
    console.log(`✅ Estado de sesión guardado en: ${STORAGE_STATE_PATH}`);
});