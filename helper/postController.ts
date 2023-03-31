import { NextApiRequest, NextApiResponse } from 'next';
import { errType } from 'utility/types';
import Controller from './controller';

export default class PostController extends Controller {
  public static index = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const Post = this.prisma.post;
      const post = await Post.findMany({
        include: { user: true, comments: {include: {user: true}} },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return res
        .status(200)
        .json({ success: true, message: 'All Posts', post });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  public static show = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const Post = this.prisma.post;
      const post = await Post.findFirst({
        where: { id: req.query.id as string },
      });
      if (post == null)
        return res.status(404).json({ message: 'Cannot find post' });
      return res
        .status(200)
        .json({ success: true, message: `Post ${post.id} result`, post });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  public static create = async (req: NextApiRequest, res: NextApiResponse) => {
    let body = req.body;
    try {
      const Post = this.prisma.post;

      const user = await this.prisma.user.findFirst({
        where: {
          email: req.body.email,
        },
      });
      // console.log('here', user);

      if (!user) throw new Error('no user attached to post');

      const post = await Post.create({
        data: {
          title: body?.title as string,
          content: body.content as string,
          categories: body?.category as string[],
          tags: body?.tags as string[],
          userId: user.id as string,
        },
      });
      if (!post) throw new Error('Bad request check your inputs');
      return res
        .status(200)
        .json({ success: true, message: 'Post created', post });
    } catch (error) {
      res.status(500).json({ message: error });
    } finally {
      await this.prisma.$disconnect();
    }
  };

  public static update = async (req: NextApiRequest, res: NextApiResponse) => {
    let body = req.body;
    console.log(body);
    try {
      const Post = this.prisma.post;
      const post = await Post.update({
        where: { id: req.query.id as string },
        data: body,
      });
      // console.log(post);

      if (!post) throw new Error(`Invalid Input: ${req.query.id}`);
      return res
        .status(200)
        .json({ success: true, message: 'Record updated', post });
    } catch (error) {
      console.log(error);
      return new Error(error as errType);
    }
  };

  public static comment = async (req: NextApiRequest, res: NextApiResponse) => {
    // let body = req.body;
    const session = await this.getSession({req});
    const body = {
      userId: session?.user.id as string || req.body.userId as string,
      postId: req.query.id as string,
      content: req.body.comment as string
    }
    try {
      const post = await this.prisma.comment.create({
        data: body,
      });

      if (!post) return res.json({ error: new Error(`Invalid Input for: ${req.query.id}`)});
      return res
        .status(200)
        .json({ success: true, message: 'Comment posted', post });
    } catch (error) {
      console.log(error);
      return new Error(error as errType);
    }
  };

  public static destroy = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const Post = this.prisma.post;
      const post = await Post.delete({ where: { id: req.query.id as string } });
      if (!post) throw new Error('Cannot find post');
      return res.status(200).json({ success: true, message: 'Post deleted' });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  public static removeComment = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      console.log(req.method)
      const post = await this.prisma.comment.delete({ where: { id: req.query.id as string } });
      if (!post) return res.json({error: 'cannot find comment'});
      return res.status(200).json({ success: true, message: 'Comment deleted' });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

}
