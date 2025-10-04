import { test } from '@playwright/test';
import { AccountServicesPage } from './pages/AccountServicesPage';

test('Creación de Cuenta de Ahorros exitosa (US-2)', async ({ page }) => {
    const accountPage = new AccountServicesPage(page);
        await accountPage.login();
    await accountPage.openNewSavingsAccount();
});