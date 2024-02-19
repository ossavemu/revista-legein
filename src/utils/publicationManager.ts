import path from 'node:path'
import fs from 'node:fs'

type PublicationReturn = Promise<Publications | Publications[] | null>

export const publicationManager = async (
  isLastPublication?: boolean
): PublicationReturn => {
  const { readFile, readdir } = fs.promises

  const dataDirectory = path.join(process.cwd(), 'src/data')

  const isPublication = (string: string): boolean =>
    string.includes('publication')

  const publicationsPath = await readdir(dataDirectory)
  const publications = await Promise.all(
    publicationsPath
      .filter(isPublication)
      .sort((a, b) => {
        if (a == null || b == null) return 0
        const aMatch = a.match(/\d+/)
        const bMatch = b.match(/\d+/)
        const aNumber = aMatch != null ? parseInt(aMatch[0]) : 0
        const bNumber = bMatch != null ? parseInt(bMatch[0]) : 0
        return aNumber - bNumber
      })
      .map(async publication => {
        const publicationPath = path.join(dataDirectory, publication)
        const publicationFile = await readFile(publicationPath, 'utf8')
        return JSON.parse(publicationFile)
      })
  )
  if (isLastPublication ?? false) {
    return publications as Publications[]
  }
  if (Array.isArray(publications)) {
    return (publications[0] as Publications) ?? []
  }
  return null
}

export const lastPublication = (await publicationManager(true)) ?? []
