import { test, expect } from '@playwright/test';

// 1. URL do nosso app rodando no Docker
const APP_URL = 'http://localhost:8080';

test('Fluxo Completo FIPE: Marcas -> Modelos', async ({ page }) => {

  // 2. Acessa o PWA
  await page.goto(APP_URL);

  // 3. Espera o título principal aparecer
  await expect(page.locator('h1')).toHaveText('Consulta Tabela FIPE');

  // 4. Espera as marcas carregarem (procurando pela VW)
  //    (O 'locator' usa sintaxe de CSS/texto)
  const marcaVW = page.locator('li:has-text("VW - Volkswagen")');
  await expect(marcaVW).toBeVisible();

  // 5. Clica na VW
  await marcaVW.click();

  // 6. Espera a tela de modelos carregar (o título 'Modelos')
  await expect(page.locator('h2')).toHaveText('Modelos');

  // 7. Procura por um modelo (Amarok) para provar que a lista carregou
  const modeloAmarok = page.locator('li:has-text("AMAROK")');
  await expect(modeloAmarok.first()).toBeVisible();

  // 8. (Opcional) Clica em voltar
  await page.getByText('Voltar para Marcas').click();
  await expect(page.locator('h1')).toHaveText('Consulta Tabela FIPE');
});
