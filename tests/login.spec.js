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

  // anexando a evidência no relatório de teste
  await test.info().attach('Evidência do login com sucesso', {
    body: await page.screenshot({
      fullPage: true
    }),
    contentType: 'image/png'
  });

})

//cenário de teste
test('Deve negar acesso com senha inválida.', async ({ page }) => {

    // acessar a página de login do sistema
    await page.goto('https://sergiocotiazure20265-ops.github.io/produtos-cypress-site/index.html');

    // preencha o email do usuário
    await page.locator('#emailLogin').fill('teste@email.com');

    // preencha a senha do usuário
    await page.locator('#senhaLogin').fill('Teste@123');

    // clicar no botão de acesso
    await page.locator('#btnEntrar').click();

    // verificar se a página de consulta de produtos foi aberta
    await expect(
      page.getByText('E-mail ou senha inválidos.')
    ).toBeVisible();

    // gerando evidência
    await page.screenshot({
      path: 'evidencias/login-acesso-negado.png',
      fullPage: true
    })

    // anexando a evidência no relatório de teste
    await test.info().attach('Evidência do login com acesso negado', {
      body: await page.screenshot({
        fullPage: true
      }),
      contentType: 'image/png'
    });

})