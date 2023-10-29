describe('AddItemForm', () => {
  it('demo example, visually looks correct', async () => {
    // eslint-disable-next-line no-undef
    await page.goto('http://localhost:8080/iframe.html?args=&id=shared-additemform--demo&viewMode=story', {
      waitUntil: 'networkidle2',
    })

    // eslint-disable-next-line no-undef
    const image = await page.screenshot()

    expect(image).toMatchImageSnapshot()
  })

  it('disabled example, visually looks correct', async () => {
    // eslint-disable-next-line no-undef
    await page.goto('http://localhost:8080/iframe.html?args=&id=shared-additemform--disabled&viewMode=story', {
      waitUntil: 'networkidle2',
    })

    // eslint-disable-next-line no-undef
    const image = await page.screenshot()

    expect(image).toMatchImageSnapshot()
  })
})
