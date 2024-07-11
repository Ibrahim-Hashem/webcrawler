import axios from "axios"
import crawlPage from "./crawler"

jest.mock("axios")

describe("crawlPage", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it("should return an empty array if the URL has already been visited", async () => {
    const url = "http://example.com"
    await crawlPage(url)
    const result = await crawlPage(url)
    expect(result).toEqual([])
  })
})
