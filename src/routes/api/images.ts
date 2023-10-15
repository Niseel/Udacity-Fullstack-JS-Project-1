import express, { NextFunction, Request, Response } from 'express';
import resizeImage from '../../middleware/images-middleware';

import path from 'path';
const imagePath = path.resolve('./src/assets');

const images = express.Router();

images.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const fileName = req.query.fileName;
  //check if user dont put the width or height we will get default value
  const width = req.query.width ? req.query.width : 600;
  const height = req.query.height ? req.query.height : 600;

  // const filePath_Full = path.resolve(
  //   `${imagePath}/full/${fileName}-${width}-${height}.png`
  // );

  if (!fileName) {
    next('Please intput the fileName or fileName is incorrect');
  } else if (isNaN(Number(width)) || isNaN(Number(height))) {
    // check if user input inccorect type
    next('Please input width or height of the image as a number');
  } else if (Number(width) <= 0 || Number(height) <= 0) {
    next('Please input a positive number for width or height');
  } else if (fileName && !isNaN(Number(width)) && !isNaN(Number(height))) {
    const resizedImage = await resizeImage.resizeFile(
      fileName as string,
      width as number,
      height as number
    );
    res.sendFile(resizedImage);
  }
});
export default images;
