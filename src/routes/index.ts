import express, { Request, Response } from 'express';
import images from './api/images';

const routers = express.Router();

routers.get('/', (req: Request, res: Response): void => {
  res.send(
    'Welcome to Project 1 of Udacity. Please add /images to path of url resize a image ----- Example: /api/images?fileName=emotional&width=600&height=300'
  );
});

routers.use('/images', images);

export default routers;
