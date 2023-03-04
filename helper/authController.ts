import { NextApiRequest, NextApiResponse } from 'next';
import Controller from './controller';

export class AuthController extends Controller {
  static signup = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      type ReqData = {
        username: string;
        email: string;
        password: string;
      };
      let { username, email, password }: ReqData = req.body;
      console.log(req.body)

      const User = this.prisma.user;
      const bcrypt = this.bcrypt;
      const ifExist = await User.findUnique({ where: {email}});
      if (ifExist) {
        throw new Error('User already exists');
      }
      password = bcrypt.hashSync(password, 10);
      const newUser = { username, email, password };
      const user = await User.create({
        data: newUser,
      })
        .then((user) => user)
        .catch(
          (error) => {
            throw new Error(error.message);
          }
          // res.status(400).json({ message: 'User not created', error })
        );
      // return user;
      if (user) {
        console.log(user);
        return res.status(201).json({
          status: 'success',
          user,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  static signin = async (credentials: { email: string; password: string }) => {
    let { email, password } = credentials;
    const User = this.prisma.user;
    const bcrypt = this.bcrypt;
    try {
      const user = await User.findUnique({
        where: { email: email },
      });
      if (!user) return;
      const isMatch = bcrypt.compareSync(password, user.password as string);
      if (!isMatch) return;
      return {
        id: user.id,
        name: user.username,
        email: user.email,
        role: user.role,
      };
    } catch (error) {
      throw new Error(error as string | undefined);
    } finally {
      this.prisma.$disconnect();
    }
  };
}
