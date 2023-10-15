import fsPromise from 'fs/promises';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
const imagePath = path.resolve('./src/assets');

const checkFileExist = (fileName: string): boolean => {
  const isExist: boolean = fs.existsSync(`${fileName}`);
  return isExist;
};

const resizeFile = async (fileName: string, width: number, height: number) => {
  const widthAsNumber: number = +width;
  const heightAsNumber: number = +height;
  const filePath_Full = path.resolve(`${imagePath}/full/${fileName}.png`);
  const cacheFile = path.resolve(
    `${imagePath}/thumb/${fileName}-${width}-${height}.png`
  );
  const isExistingImage = checkFileExist(cacheFile);
  if (!isExistingImage) {
    const filePath_Thumb = path.resolve(
      `${imagePath}/thumb/${fileName}-${widthAsNumber}-${heightAsNumber}.png`
    );
    await sharp(filePath_Full)
      .resize(widthAsNumber, heightAsNumber)
      .toFile(filePath_Thumb);
    const fileStream = fs.createReadStream(filePath_Thumb);
    return fileStream.path as string;
  } else {
    return cacheFile;
  }
};
// Example usage
const clearCache = async (folderPath: string) => {
  try {
    // Find all files in the folder
    const files = await fsPromise.readdir(folderPath);
    for (const file of files) {
      await fsPromise.unlink(path.resolve(folderPath, file));
      console.log(`${folderPath}/${file} has been removed successfully`);
    }
  } catch (err) {
    console.log(err);
  }
};

export default { resizeFile, checkFileExist, clearCache };
