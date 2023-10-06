describe('addItemForm', () => {
  it('base example, visually looks correct', async () => {
    await page.goto(
      'http://localhost:8080/iframe.html?args=&id=components-additemform--demo&viewMode=story',
      { waitUntil: 'networkidle2' },
    )

    const image = await page.screenshot()

    expect(image).toMatchImageSnapshot()
  })
})
