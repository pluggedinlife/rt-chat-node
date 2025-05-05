import express from 'express';
import moment from 'moment';
import prisma from '../prisma';
import { PostInterface } from '../interfaces/post.interface';

export default class PostController {
  public static async onGetPosts(req: express.Request, res: express.Response) {
    try {
      const result = await prisma.post.findMany({
        where: {
          deletedAt: null,
        },
      });
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
      const { text, media, userId } = req.body;
      const newItem: PostInterface = {
        text,
        media,
        userId,
      };

      const result = await prisma.post.create({
        data: newItem,
      });
      res.status(200).json(result);
    } catch (e) {
      console.log(`Something went wrong in onCreatePost: `, e);
    }
  }

  public static async onEditPost(req: express.Request, res: express.Response) {
    try {
      const id = parseInt(req.params.id) || undefined;
      const { text, media, userId } = req.body;

      const result = await prisma.post.update({
        where: {
          id,
        },
        data: {
          text,
          media,
          userId,
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
      const id = parseInt(req.params.id) || undefined;

      let result = await prisma.post.findFirst({
        where: {
          id,
        },
      });

      // Implement soft-delete as first option, then if the user insists delete the record permanently
      if (result?.deletedAt == undefined) {
        result = await prisma.post.update({
          where: {
            id,
          },
          data: {
            deletedAt: moment().toISOString(),
          },
        });
      } else {
        result = await prisma.post.delete({
          where: {
            id,
          },
        });
      }

      res.status(200).json(result);
    } catch (e) {
      console.log(`Something went wrong in onDeletePost: `, e);
    }
  }
}
