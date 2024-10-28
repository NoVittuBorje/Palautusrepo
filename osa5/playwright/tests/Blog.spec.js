const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Jorma',
        username: 'root',
        password: 'salasana'
      }
    })

    await page.goto('http://localhost:5173')
  })
  test('Login form is shown', async ({ page }) => {
    const locator = page.getByText('Log in to app')
    await expect(locator).toBeVisible()
    })

    test('succeeds with correct credentials', async ({ page }) => {
        await page.getByTestId('username').fill('root')
        await page.getByTestId('password').fill('salasana')
        await page.getByRole('button', { name: 'login' }).click()
        await expect(page.getByText('Jorma logged in')).toBeVisible()
    })
    test('fails with wrong credentials', async ({ page }) => { 
        await page.getByTestId('username').fill('root')
        await page.getByTestId('password').fill('wrong')
        await page.getByRole('button', { name: 'login' }).click()
        await expect(page.getByText('wrong credentials')).toBeVisible()
    })
    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await page.getByTestId('username').fill('root')
            await page.getByTestId('password').fill('salasana')
            await page.getByRole('button', { name: 'login' }).click()
        })
        test('a new blog can be created', async ({ page }) => {
            await page.getByRole('button', { name: 'Create new blog' }).click()
            await page.getByTestId('Title').fill('Jorman blogi playwright')
            await page.getByTestId('Author').fill('Jorma')
            await page.getByTestId('Url').fill('localhost')
            await page.getByRole('button', { name: 'create' }).click()
            await expect(page.getByText('a new blog Jorman blogi playwright by Jorma added')).toBeVisible()
        })
        test('after creating blog view all', async({page}) => {
            await page.getByRole('button', { name: 'Create new blog' }).click()
            await page.getByTestId('Title').fill('Jorman blogi playwright')
            await page.getByTestId('Author').fill('Jorma')
            await page.getByTestId('Url').fill('localhost')
            await page.getByRole('button', { name: 'create' }).click()
            await page.getByRole('button', { name: 'view' }).click()
            await expect(page.getByText('localhost')).toBeVisible()
            await expect(page.getByText('Likes 0')).toBeVisible()
        })
        describe('After creating one and cliking view', () => {
            beforeEach(async ({page}) => {
                await page.getByRole('button', { name: 'Create new blog' }).click()
                await page.getByTestId('Title').fill('Jorman blogi playwright 0')
                await page.getByTestId('Author').fill('Jorma')
                await page.getByTestId('Url').fill('localhost')
                await page.getByRole('button', { name: 'create' }).click()
                await page.getByRole('button', { name: 'view' }).click()
            })
                test('Like button works', async({page}) => {
                    await page.getByRole('button', { name: 'like' }).click()
                    await expect(page.getByText('Likes 1')).toBeVisible()
                })
                test('Creator can remove', async ({page}) => {
                    page.on('dialog',dialog => dialog.accept())
                    await page.getByRole('button', { name: 'remove' }).click()
                    await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
                })
                test('Creator only can remove', async ({page,request}) => {
                    await request.post('http://localhost:3003/api/users', {
                        data: {
                          name: 'Pentti',
                          username: 'root2',
                          password: 'salasana'
                        }
                      })
                    await page.getByRole('button', { name: 'logout' }).click()
                    await page.getByTestId('username').fill('root2')
                    await page.getByTestId('password').fill('salasana')
                    await page.getByRole('button', { name: 'login' }).click()
                    await expect(page.getByText('Pentti logged in')).toBeVisible()
                    await page.getByRole('button', { name: 'view' }).click()
                    await expect(page.getByRole('button', { name: 'like' })).toBeVisible()
                    await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
                })
                test('blogs are in order', async ({page,request}) => {
                    await page.getByRole('button', { name: 'hide' }).click()
                    await page.getByRole('button', { name: 'Create new blog' }).click()
                    await page.getByTestId('Title').fill('Jorman blogi playwright 1')
                    await page.getByTestId('Author').fill('Jorma')
                    await page.getByTestId('Url').fill('localhost')
                    await page.getByRole('button', { name: 'create' }).click()

                    await page.getByRole('button', { name: 'Create new blog' }).click()
                    await page.getByTestId('Title').fill('Jorman blogi playwright 2')
                    await page.getByTestId('Author').fill('Jorma')
                    await page.getByTestId('Url').fill('localhost')
                    await page.getByRole('button', { name: 'create' }).click()

                    await page.getByRole('button', { name: 'Create new blog' }).click()
                    await page.getByTestId('Title').fill('Jorman blogi playwright 3')
                    await page.getByTestId('Author').fill('Jorma')
                    await page.getByTestId('Url').fill('localhost')
                    await page.getByRole('button', { name: 'create' }).click()

                    await page.getByRole('button', { name: 'Create new blog' }).click()
                    await page.getByTestId('Title').fill('Jorman blogi playwright 4')
                    await page.getByTestId('Author').fill('Jorma')
                    await page.getByTestId('Url').fill('localhost')
                    await page.getByRole('button', { name: 'create' }).click()
                    
                    
                    
                    await page
                    .getByTestId('blogform')
                    .filter({ hasText: 'Jorman blogi playwright 4' })
                    .getByRole('button', { name: 'view' })
                    .click()

                    await page.getByRole('button', { name: 'like' }).click({clickCount: 6})
                    await page.getByRole('button', {name:'hide'}).click()

                    await page
                    .getByTestId('blogform')
                    .filter({ hasText: 'Jorman blogi playwright 3' })
                    .getByRole('button', { name: 'view' })
                    .click()

                    await page.getByRole('button', { name: 'like' }).click({clickCount: 5})
                    await page.getByRole('button', {name:'hide'}).click()

                    await page
                    .getByTestId('blogform')
                    .filter({ hasText: 'Jorman blogi playwright 2' })
                    .getByRole('button', { name: 'view' })
                    .click()

                    await page.getByRole('button', { name: 'like' }).click({clickCount: 4})
                    await page.getByRole('button', {name:'hide'}).click()

                    await page
                    .getByTestId('blogform')
                    .filter({ hasText: 'Jorman blogi playwright 1' })
                    .getByRole('button', { name: 'view' })
                    .click()

                    await page.getByRole('button', { name: 'like' }).click({clickCount: 3})
                    await page.getByRole('button', {name:'hide'}).click()

                    
                    
                    
                    await page.getByTestId('blogform').first().getByRole('button', { name: 'view' }).click()
                    await expect(page.getByText('Likes 6')).toBeVisible()
                    await page.getByRole('button', {name:'hide'}).click()
                    const second = await page.getByTestId('blogform').nth(1);
                    await second.getByRole('button', { name: 'view' }).click()
                    await expect(page.getByText('Likes 5')).toBeVisible()
                    await page.getByRole('button', {name:'hide'}).click()
                    
                })
        })
    })
})