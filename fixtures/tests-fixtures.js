import path from 'path';
import { test as base, expect } from '@playwright/test';
import { MCALogin } from '../Pages/MCA-Login';

export const authFile = path.resolve(__dirname, '../playwright/.auth/mca.json');

export const test = base.extend({
    mcaLogin: async ({ page }, use) => {
        const login = new MCALogin(page);
        await login.launchurl();
        await use(login);
    }

});

export { expect };