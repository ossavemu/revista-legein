import fs from 'node:fs';
import path from 'node:path';

export const publicationManager = async (isLastPublication?: boolean) => {
  const { readFile, readdir } = fs.promises;

  const dataDirectory = path.join(process.cwd(), 'src/data');

  const isPublication = (string: string) => string.includes('publication');

  const publicationsPath = await readdir(dataDirectory);
  const publications = await Promise.all(
    publicationsPath
      .filter(isPublication)
      .sort()
      .map(async publication => {
        const publicationPath = path.join(dataDirectory, publication);
        const publicationFile = await readFile(publicationPath, 'utf8');
        return JSON.parse(publicationFile);
      })
  );
  if (!isLastPublication) return publications;
  return publications[0];
};

export const lastPublication = (await publicationManager(true)) ?? [];
