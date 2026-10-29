// importando bibliotecas
import { test, expect } from '@playwright/test';

// cenário de teste
test('Deve criar um novo usuário válido com sucesso.', async ({ page }) => {

  // acessar a página de cadastro de usuários
  await page.goto('https://sergiocotiazure20265-ops.github.io/produtos-cypress-site/cadastro.html');

  // preencher o nome do usuário
  await page.locator('#nomeUsuario').fill('Usuário Teste Playwright');

  // preencher o email do usuário
  await page.locator('#emailUsuario').fill('usuario.playwright@email.com');

  // preencher a senha do usuário
  await page.locator('#senhaUsuario').fill('Teste@123');

  // clicar no botão de cadastro
  await page.locator('#btnCadastrarUsuario').click();

  // verificar se a mensagem de sucesso foi exibida
  await expect(
    page.locator('#alertaCadastroUsuario')
  ).toHaveText('Usuário cadastrado com sucesso. Você já pode fazer login.');

  await expect(
    page.locator('#alertaCadastroUsuario')
  ).toBeVisible();

  // verificar se o formulário foi limpo após o cadastro
  await expect(page.locator('#nomeUsuario')).toHaveValue('');
  await expect(page.locator('#emailUsuario')).toHaveValue('');
  await expect(page.locator('#senhaUsuario')).toHaveValue('');

  // gerar evidência em uma pasta exclusiva desta execução do teste
  const evidencia = await page.screenshot({
    path: test.info().outputPath('cadastro-usuario-sucesso.png'),
    fullPage: true
  });

  // anexar a mesma evidência no relatório de teste
  await test.info().attach('Evidência do cadastro de usuário com sucesso', {
    body: evidencia,
    contentType: 'image/png'
  });

});

// cenário de teste
test('Não deve permitir o cadastro de usuários com o mesmo email.', async ({ page }) => {

  // acessar a página de cadastro de usuários
  await page.goto('https://sergiocotiazure20265-ops.github.io/produtos-cypress-site/cadastro.html');

  // preencher os dados do primeiro usuário
  await page.locator('#nomeUsuario').fill('Primeiro Usuário');
  await page.locator('#emailUsuario').fill('email.repetido@email.com');
  await page.locator('#senhaUsuario').fill('Teste@123');

  // cadastrar o primeiro usuário
  await page.locator('#btnCadastrarUsuario').click();

  // confirmar que o primeiro cadastro foi realizado
  await expect(
    page.locator('#alertaCadastroUsuario')
  ).toHaveText('Usuário cadastrado com sucesso. Você já pode fazer login.');

  // preencher outro usuário utilizando o mesmo email
  await page.locator('#nomeUsuario').fill('Segundo Usuário');
  await page.locator('#emailUsuario').fill('email.repetido@email.com');
  await page.locator('#senhaUsuario').fill('Outra@123');

  // tentar cadastrar o segundo usuário
  await page.locator('#btnCadastrarUsuario').click();

  // verificar se a mensagem de email duplicado foi exibida
  await expect(
    page.locator('#alertaCadastroUsuario')
  ).toHaveText('Já existe um usuário cadastrado com este e-mail.');

  await expect(
    page.locator('#alertaCadastroUsuario')
  ).toBeVisible();

  // gerar evidência em uma pasta exclusiva desta execução do teste
  const evidencia = await page.screenshot({
    path: test.info().outputPath('cadastro-usuario-email-duplicado.png'),
    fullPage: true
  });

  // anexar a mesma evidência no relatório de teste
  await test.info().attach('Evidência do bloqueio de email duplicado', {
    body: evidencia,
    contentType: 'image/png'
  });

});