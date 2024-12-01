import express from 'express';
import moment from 'moment';
import prisma from '../prisma';
import { Message } from '../interfaces/post.interface';

export default class PostController {
  public static async onGetPosts(req: express.Request, res: express.Response) {
    try {
      const result = await prisma.post.findMany();
      res.status(200).json(result);
    } catch (e) {
      console.log(`Something went wrong in onGetPosts: `, e);
    }
  }

  public static async onCreatePost(
    req: express.Request,
    res: express.Response
  ) {
    try {
      const newMessage: Message = {
        value: req.body.value,
        createdAt: moment().toISOString(),
        updatedAt: moment().toISOString(),
        deletedAt: null,
      };

      const result = await prisma.post.create({
        data: newMessage,
      });
      res.status(200).json(result);
    } catch (e) {
      console.log(`Something went wrong in onCreatePost: `, e);
    }
  }

  public static async onEditPost(req: express.Request, res: express.Response) {
    try {
      const id = req.body.id;

      const result = await prisma.post.update({
        where: {
          id,
        },
        data: {
          value: req.body.value,
        },
      });

      res.status(200).json(result);
    } catch (e) {
      console.log(`Something went wrong in onEditPost: `, e);
    }
  }

  public static async onDeletePost(
    req: express.Request,
    res: express.Response
  ) {
    try {
      const id = req.body.id;

      const result = await prisma.post.delete({
        where: {
          id,
        },
      });

      res.status(200).json(result);
    } catch (e) {
      console.log(`Something went wrong in onDeletePost: `, e);
    }
  }
}
