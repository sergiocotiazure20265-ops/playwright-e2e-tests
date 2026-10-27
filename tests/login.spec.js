// importando bibliotecas
import { test, expect } from '@playwright/test';

// cenário de teste
test('Deve realizar login com usuário válido.', async ({ page }) => {

  // acessar a página de login do sistema
  await page.goto('https://sergiocotiazure20265-ops.github.io/produtos-cypress-site/index.html');

  // preencha o email do usuário
  await page.locator('#emailLogin').fill('admin@bluestock.com');

  // preencha a senha do usuário
  await page.locator('#senhaLogin').fill('Admin@123');

  // clicar no botão de acesso
  await page.locator('#btnEntrar').click();

  // verificar se a página de consulta de produtos foi aberta
  await expect(
    page.getByText('Consulta de produtos')
  ).toBeVisible();

  // gerando evidência
  await page.screenshot({
    path: 'evidencias/login-sucesso.png',
    fullPage: true
  })

})