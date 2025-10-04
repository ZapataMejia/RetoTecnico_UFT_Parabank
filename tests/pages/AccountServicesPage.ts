import { Page, expect, Locator } from '@playwright/test';

export class AccountServicesPage {
    readonly page: Page;
    
    // Selectores de Login 
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly openAccountLink: Locator;
    readonly transferFundsLink: Locator;

    // Selectores de Creación de Cuenta (US-2)
    readonly accountTypeDropdown: Locator;
    readonly openAccountButton: Locator;
    readonly successMessageAccount: Locator;
    readonly minimumDepositText: Locator; 

    // Selectores de Transferencia de Fondos (US-3)
    readonly amountInput: Locator;
    readonly fromAccountDropdown: Locator;
    readonly toAccountDropdown: Locator;
    readonly transferButton: Locator;
    readonly transferSuccessMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.getByRole('button', { name: 'Log In' });

        this.openAccountLink = page.getByRole('link', { name: 'Open New Account' });
        this.transferFundsLink = page.locator('#leftPanel').getByRole('link', { name: 'Transfer Funds' });
        
        this.accountTypeDropdown = page.locator('#type');
        this.openAccountButton = page.getByRole('button', { name: 'Open New Account' }); 
        this.successMessageAccount = page.getByText('Congratulations, your account is now open.');
        this.minimumDepositText = page.getByText('A minimum of $0.00 must be');

        this.amountInput = page.locator('#amount');
        this.fromAccountDropdown = page.locator('#fromAccountId');
        this.toAccountDropdown = page.locator('#toAccountId');
        this.transferButton = page.getByRole('button', { name: 'Transfer' });
        this.transferSuccessMessage = page.getByText('Transfer Complete!');
    }
    
    // US-2 (Creación de Cuenta)
    async openNewSavingsAccount() {
        await this.page.goto('https://parabank.parasoft.com/parabank/overview.htm'); 
        await this.openAccountLink.click();
        await this.accountTypeDropdown.selectOption('1'); 
        await this.minimumDepositText.click(); 
        await this.page.waitForTimeout(500); 
        await this.openAccountButton.click({ force: true }); 
        await expect(this.successMessageAccount).toBeVisible();
    }

    // US-3 (Transferencia de Fondos) 
    async transferFundsByIndex(amount: string, fromIndex: number, toIndex: number) {
        await this.page.goto('https://parabank.parasoft.com/parabank/overview.htm'); 
        await this.transferFundsLink.click();
        await this.amountInput.fill(amount);
        await this.fromAccountDropdown.selectOption({ index: fromIndex });
        await this.toAccountDropdown.selectOption({ index: toIndex });
        await this.transferButton.click();
        await expect(this.transferSuccessMessage).toBeVisible();
        await expect(this.page.getByText(`$${amount}.00 has been transferred`)).toBeVisible();
    }
}