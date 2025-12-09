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

  await test.step('Open sign up page', async () => {
    await signUpPage.open();
  });

  await test.step('Fill username', async () => {
    await signUpPage.fillUsernameField(user.username);
  });

  await test.step('Fill email', async () => {
    await signUpPage.fillEmailField(user.email);
  });

  await test.step('Fill password', async () => {
    await signUpPage.fillPasswordField(user.password);
  });

  await test.step('Click Sign Up', async () => {
    await signUpPage.clickSignUpButton();
  });

  await test.step('Verify Your Feed tab visible', async () => {
    await homePage.assertYourFeedTabIsVisible();
  });
});

test('Create article with required and optional fields', async () => {
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

  await test.step('Fill article tag', async () => {
    await createArticlePage.fillArticleTag(article.tag);
  });

  await test.step('Publish article', async () => {
    await createArticlePage.clickPublishArticleButton();
  });

  await test.step('Verify article title', async () => {
    await createArticlePage.assertArticleTitle(article.title);
  });
});

test('Create article without article description', async () => {
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

  await test.step('Fill article tag', async () => {
    await createArticlePage.fillArticleTag(article.tag);
  });

  await test.step('Publish article', async () => {
    await createArticlePage.clickPublishArticleButton();
  });

  await test.step('Verify article title', async () => {
    await createArticlePage.assertArticleTitle(article.title);
  });
});

test('Create article without article text', async () => {
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

  await test.step('Fill article tag', async () => {
    await createArticlePage.fillArticleTag(article.tag);
  });

  await test.step('Publish article', async () => {
    await createArticlePage.clickPublishArticleButton();
  });

  await test.step('Verify error message', async () => {
    await createArticlePage.assertErrorMessageContainsText(
      'Article body cannot be empty',
    );
  });
});

test('Create article without article tag', async () => {
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

  await test.step('Publish article', async () => {
    await createArticlePage.clickPublishArticleButton();
  });

  await test.step('Verify article title', async () => {
    await createArticlePage.assertArticleTitle(article.title);
  });
});
