import express from 'express';
import moment from 'moment';
import prisma from '../prisma';
import { Prisma } from '@prisma/client';
import { UserInterface } from '../interfaces/user.interface';

export default class UserController {
  public static async onGetUsers(req: express.Request, res: express.Response) {
    try {
      const result = await prisma.user.findMany({
        where: {
          deletedAt: null,
        },
      });
      res.status(200).json(result);
    } catch (e) {
      console.log(`Something went wrong in onGetUsers: `, e);
    }
  }

  public static async onCreateUser(
    req: express.Request,
    res: express.Response
  ) {
    try {
      const { username, password, nick, color, avatar } =
        req.body as UserInterface;

      const result = await prisma.user.create({
        data: {
          username,
          password,
          nick,
          color,
          avatar,
        },
      });
      res.status(200).json(result);
    } catch (e) {
      console.log(`Something went wrong in onCreateUser: `, e);
    }
  }

  public static async onEditUser(req: express.Request, res: express.Response) {
    try {
      const id = parseInt(req.params.id) || undefined;
      const { username, password, nick, color, avatar } =
        req.body as UserInterface;

      const result = await prisma.user.update({
        where: {
          id,
        },
        data: {
          username,
          password,
          nick,
          color,
          avatar,
          updatedAt: moment().toISOString(),
        },
      });

      res.status(200).json(result);
    } catch (e) {
      console.log(`Something went wrong in onEditUser: `, e);
    }
  }

  public static async onDeleteUser(
    req: express.Request,
    res: express.Response
  ) {
    try {
      const id = parseInt(req.params.id) || undefined;

      let result = await prisma.user.findFirst({
        where: {
          id,
        },
      });

      // Implement soft-delete as first option, then if the user insists delete the record permanently
      if (result?.deletedAt == undefined) {
        result = await prisma.user.update({
          where: {
            id,
          },
          data: {
            deletedAt: moment().toISOString(),
          },
        });
      } else {
        result = await prisma.user.delete({
          where: {
            id,
          },
        });
      }

      res.status(200).json(result);
    } catch (e) {
      console.log(`Something went wrong in onDeleteUser: `, e);
    }
  }
}
