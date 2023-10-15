import express, { Request, Response } from 'express';
import images from './api/images';

const routers = express.Router();

routers.get('/', (req: Request, res: Response) => {
  res.send(
    'Welcome to Project 1 of Udacity. Please add /images to path of url resize a image '
  );
});

routers.use('/images', images);

export default routers;
