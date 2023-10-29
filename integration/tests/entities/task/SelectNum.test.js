describe('SelectNum', () => {
  it('demo example, visually looks correct', async () => {
    // eslint-disable-next-line no-undef
    await page.goto(
      'http://localhost:8080/iframe.html?args=&id=entities-task-selectnum--select-status&viewMode=story',
      {
        waitUntil: 'networkidle2',
      },
    )

    // eslint-disable-next-line no-undef
    const image = await page.screenshot()

    expect(image).toMatchImageSnapshot()
  })
})
