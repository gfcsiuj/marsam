import asyncio
from playwright.async_api import async_playwright, expect

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Get the absolute path of the index.html file
        import os
        current_directory = os.getcwd()
        file_path = os.path.join(current_directory, 'index.html')

        await page.goto(f'file://{file_path}')

        # Wait for the preloader to disappear
        await expect(page.locator('#preloader')).to_have_class('preloader hide', timeout=10000)

        # Desktop screenshot
        await page.set_viewport_size({"width": 1280, "height": 800})
        await page.screenshot(path="jules-scratch/verification/desktop_view.png")

        # Mobile screenshot
        await page.set_viewport_size({"width": 375, "height": 667})
        await page.screenshot(path="jules-scratch/verification/mobile_view.png")

        # Open mobile menu and take screenshot
        await page.locator('.mobile-nav-toggle').click()
        await page.wait_for_timeout(1000) # wait for animation
        await page.screenshot(path="jules-scratch/verification/mobile_menu_open.png")

        await browser.close()

asyncio.run(main())
