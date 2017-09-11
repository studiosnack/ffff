const imageAttrs = image => {
  const {width, height, naturalWidth, naturalHeight, src, alt, title} = image;
  return {width, height, naturalWidth, naturalHeight, src, alt, title};
}

const docImages = [...document.images]
  .map(imageAttrs);

const inlineBgImages = [...document.querySelectorAll("*")]
  .filter(el => el.style.cssText.includes("url("))
  .map(el => {
    const style = window.getComputedStyle(el, null);
    const {width, height, background, backgroundImage} = style;
    return {width, height, background, backgroundImage};
  })

const stylesheetImages = [...document.styleSheets]
  .map(sheet => [...sheet.rules]
    .filter(rule => rule.cssText.includes("url("))
    .map(rule => {
      const {width, height, background, backgroundImage} = rule.style;
      return {width, height, background, backgroundImage};
    })
  ).reduce((acc, rules) => {
    return [...acc, ...rules];
  }, [])

console.log({docImages, inlineBgImages, stylesheetImages})
