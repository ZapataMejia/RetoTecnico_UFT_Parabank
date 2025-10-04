import { test } from '@playwright/test';
import { AccountServicesPage } from './pages/AccountServicesPage';

test('Transferencia de Fondos exitosa (US-3)', async ({ page }) => {
    const accountPage = new AccountServicesPage(page);
    await accountPage.login();
    
    // Datos de la transferencia
    const AMOUNT = "500";
    const FROM_ACCOUNT_ID = '13677'; 
    const TO_ACCOUNT_ID = '13788';

    await accountPage.transferFunds(AMOUNT, FROM_ACCOUNT_ID, TO_ACCOUNT_ID);
});