import { test, expect } from '@playwright/test';

test('usuario puede iniciar sesión y crear un producto', async ({ page }) => {

    await page.goto('http://localhost:5173');

    // Login
    await page.getByPlaceholder('Usuario').fill('admin');
    await page.getByPlaceholder('Contraseña').fill('123456');

    await page.getByRole('button', {
        name: 'Iniciar sesión'
    }).click();

    // Comprobamos que el login funcionó
    await expect(
        page.getByRole('button', { name: 'Cerrar sesión' })
    ).toBeVisible();

    // Crear producto
    await page.getByPlaceholder('Nombre').fill('Producto Playwright');
    await page.getByPlaceholder('Precio').fill('1500');
    await page.getByPlaceholder('Stock').fill('5');

    await page.getByRole('button', {
        name: 'Crear producto'
    }).click();

    // Comprobamos que el producto aparece en la lista
    await expect(
        page.getByText('Producto Playwright - $1500 - Stock: 5').first()
    ).toBeVisible();

});