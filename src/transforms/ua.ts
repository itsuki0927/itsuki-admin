import UAParser from 'ua-parser-js'

const parser = new UAParser()

/**
 * 通过ua解析出浏览器名称和版本
 *
 * @param ua ua
 * @returns 浏览器名称和版本
 */
export const parserBrowser = (ua: string) => {
  parser.setUA(ua)
  const browser = parser.getBrowser()
  if (!browser.name && !browser.version) {
    return ua
  } else {
    return `${browser.name || '未知'} - ${browser.version || '未知'}`
  }
}

/**
 * 通过ua解析出系统名称和版本
 *
 * @param ua ua
 * @returns 系统名称和版本
 */
export const parserOS = (ua: string) => {
  parser.setUA(ua)
  const os = parser.getOS()
  if (!os.name && !os.version) {
    return ua
  } else {
    return `${os.name || '未知'} - ${os.version || '未知'}`
  }
}
