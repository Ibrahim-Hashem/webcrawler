import crawlPage from "./crawler"

const main = async () => {
  // get user input
  const url = process.argv[2]
  if (!url) {
    console.error("Please provide a URL")
    process.exit(1)
  }
  // if url is not valid
  if (!url.startsWith("http")) {
    console.error("Please provide a valid URL")
    process.exit(1)
  }
  // if url is valid
  try {
    const links = await crawlPage(url)
    // generate report
    console.log(`Found ${links.length} links`)

    links.forEach((link, index) => {
      console.log(`${index + 1}. ${link}`)
    })
  } catch (error) {
    console.error(error)
  }
}

main()
