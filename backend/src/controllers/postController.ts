import express from 'express';
import moment from 'moment';
import prisma from '../prisma';
import { Message } from '../interfaces/post.interface';

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
      const newMessage: Message = {
        value: req.body.value,
        createdAt: moment().toISOString(),
        updatedAt: moment().toISOString(),
        deletedAt: null,
        username: req.body.username,
        nick: req.body.nick,
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
      const id = parseInt(req.params.id) || undefined;

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
