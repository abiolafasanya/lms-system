import { NextApiRequest, NextApiResponse } from 'next';
import Controller from './controller';

export class AuthController extends Controller {
  static signup = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      let { username, email, password } = req.body;
      
      const User = this.prisma.user;
      const bcrypt = this.bcrypt;
      const ifExist = await User.findFirst({ where: { email: email } });
      if (ifExist) {
        throw new Error('User already exists');
      }
      password = bcrypt.hashSync(password, 10);
      const newUser = { username, email, password };
      const user = await User.create({
        data: newUser,
      });

      console.log('user data: ', user);
      if (!user) return res.status(400).json({ message: 'User not created' });
      return res.status(201).json({
        status: 'success',
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error: error,
      });
    } finally {
      await this.prisma.$disconnect();
    }
  };
  
  static signin = async (credentials: { email: any; password: any }) => {
    let { email, password } = credentials;
    const User = this.prisma.user;
    const bcrypt = this.bcrypt;
    try {
      const user = await User.findFirst({
        where: { email: email },
      });
      if (!user) return;
      const isMatch = bcrypt.compareSync(password, user.password as string);
      if (!isMatch) return;
      return {
        id: user.id,
        name: user.username,
        email: user.email,
      };
    } catch (error) {
      throw new Error(error as string | undefined);
    } finally {
      this.prisma.$disconnect();
    }
  };
}
