import { test } from '@playwright/test';
import { AccountServicesPage } from './pages/AccountServicesPage';

test('Transferencia de Fondos exitosa (US-3) - Uso de índices', async ({ page }) => {
    const accountPage = new AccountServicesPage(page);
    await accountPage.login();
    const AMOUNT = "500";
    const FROM_ACCOUNT_INDEX = 0; 
    const TO_ACCOUNT_INDEX = 1;   
    await accountPage.transferFundsByIndex(AMOUNT, FROM_ACCOUNT_INDEX, TO_ACCOUNT_INDEX);
});