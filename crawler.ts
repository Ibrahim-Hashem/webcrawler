import axios from "axios"
import cheerio from "cheerio"
import { URL } from "url"

const visitedUrls = new Set()

async function fetchPage(url: string) {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    return null
  }
}

async function crawlPage(base: string): Promise<string[]> {
  if (visitedUrls.has(base)) return []
  visitedUrls.add(base)

  const data = await fetchPage(base)
  if (!data) return []

  const $ = cheerio.load(data)
  const links = $("a")

  const pageLinks: string[] = []

  for (let i = 0; i < links.length; i++) {
    const href = $(links[i]).attr("href")
    if (!href) continue

    const link = new URL(href, base).toString()
    if (link.startsWith(base)) {
      pageLinks.push(link)
      const childLinks = await crawlPage(link)
      pageLinks.push(...childLinks)
    }
  }

  return pageLinks
}

export default crawlPage
