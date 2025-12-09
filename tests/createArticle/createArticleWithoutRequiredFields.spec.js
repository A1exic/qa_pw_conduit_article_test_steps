import { test } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { faker } from '@faker-js/faker';

let homePage;
let createArticlePage;

test.beforeEach(async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);

  const user = {
    username: `${faker.person.firstName()}_${faker.person.lastName()}`,
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  await test.step('Open Sign Up page', async () => {
    await signUpPage.open();
  });

  await test.step('Fill username field', async () => {
    await signUpPage.fillUsernameField(user.username);
  });

  await test.step('Fill email field', async () => {
    await signUpPage.fillEmailField(user.email);
  });

  await test.step('Fill password field', async () => {
    await signUpPage.fillPasswordField(user.password);
  });

  await test.step('Click Sign Up button', async () => {
    await signUpPage.clickSignUpButton();
  });

  await test.step('Verify Your Feed tab is visible', async () => {
    await homePage.assertYourFeedTabIsVisible();
  });
});

test('Create article with required and optional fields', async ({ page }) => {
  const article = {
    title: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
    text: faker.lorem.paragraph(),
    tag: faker.lorem.word(),
  };

  await test.step('Click New Article link', async () => {
    await homePage.clickNewArticleLink();
  });

  await test.step('Fill article title', async () => {
    await createArticlePage.fillArticleTitle(article.title);
  });

  await test.step('Fill article description', async () => {
    await createArticlePage.fillArticleDescription(article.description);
  });

  await test.step('Fill article text', async () => {
    await createArticlePage.fillArticleText(article.text);
  });

  await test.step('Fill tag and press Enter', async () => {
    await createArticlePage.fillArticleTag(article.tag);
    await page.keyboard.press('Enter');
  });

  await test.step('Click Publish Article button', async () => {
    await createArticlePage.clickPublishArticleButton();
  });

  await test.step('Verify article title', async () => {
    await createArticlePage.assertArticleTitle(article.title);
  });
});

test('Create article without description', async ({ page }) => {
  const article = {
    title: faker.lorem.sentence(),
    text: faker.lorem.paragraph(),
    tag: faker.lorem.word(),
  };

  await test.step('Click New Article link', async () => {
    await homePage.clickNewArticleLink();
  });

  await test.step('Fill article title', async () => {
    await createArticlePage.fillArticleTitle(article.title);
  });

  await test.step('Fill article text', async () => {
    await createArticlePage.fillArticleText(article.text);
  });

  await test.step('Fill tag and press Enter', async () => {
    await createArticlePage.fillArticleTag(article.tag);
    await page.keyboard.press('Enter');
  });

  await test.step('Click Publish Article button', async () => {
    await createArticlePage.clickPublishArticleButton();
  });

  await test.step('Verify article title', async () => {
    await createArticlePage.assertArticleTitle(article.title);
  });
});

test('Create article without text', async ({ page }) => {
  const article = {
    title: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
    tag: faker.lorem.word(),
  };

  await test.step('Click New Article link', async () => {
    await homePage.clickNewArticleLink();
  });

  await test.step('Fill article title', async () => {
    await createArticlePage.fillArticleTitle(article.title);
  });

  await test.step('Fill article description', async () => {
    await createArticlePage.fillArticleDescription(article.description);
  });

  await test.step('Fill tag and press Enter', async () => {
    await createArticlePage.fillArticleTag(article.tag);
    await page.keyboard.press('Enter');
  });

  await test.step('Click Publish Article button', async () => {
    await createArticlePage.clickPublishArticleButton();
  });

  await test.step('Verify error message', async () => {
    await createArticlePage.assertErrorMessageContainsText(
      'Article body cannot be empty',
    );
  });
});

test('Create article without tag', async () => {
  const article = {
    title: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
    text: faker.lorem.paragraph(),
  };

  await test.step('Click New Article link', async () => {
    await homePage.clickNewArticleLink();
  });

  await test.step('Fill article title', async () => {
    await createArticlePage.fillArticleTitle(article.title);
  });

  await test.step('Fill article description', async () => {
    await createArticlePage.fillArticleDescription(article.description);
  });

  await test.step('Fill article text', async () => {
    await createArticlePage.fillArticleText(article.text);
  });

  await test.step('Click Publish Article button', async () => {
    await createArticlePage.clickPublishArticleButton();
  });

  await test.step('Verify article title', async () => {
    await createArticlePage.assertArticleTitle(article.title);
  });
});
