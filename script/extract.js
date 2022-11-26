function extract() {
  const cards = {}
  document.querySelectorAll('.listblock-item').forEach((item) => {
    const img = item.querySelector('img').getAttribute('src')
    const name = item.querySelector('h5').textContent.trim()
    let prints = [...item.querySelectorAll('.printing-type-tag').values()].map((print) =>
      print.textContent.trim()
    )
    const { length, [length - 1]: fileName } = img.split('/')
    const code = fileName.startsWith('DYN') ? fileName.slice(0, 6) : fileName
    if (prints.length === 1 && prints[0] === 'Double Sided') {
      prints = ['Standard']
    }
    if (cards[code]) {
      cards[code].prints = [...new Set(...cards[code].prints, ...prints)]
    } else {
      cards[code] = {
        name,
        img,
        prints,
        code,
      }
    }
  })
  //   console.log(cards)
  navigator.clipboard.writeText(JSON.stringify(cards, null, 4))
}
