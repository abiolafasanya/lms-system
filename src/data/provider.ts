import { BsGoogle, BsGithub, BsFacebook } from 'react-icons/bs';
import { IconType } from 'react-icons/lib';

interface providerDocument {
  provider: string;
  style: string;
  icon: IconType | any;
}
const socialProvider: providerDocument[] = [
  {
    provider: 'google',
    style: 'text-xl text-red-500',
    icon: BsGoogle,
  },
  {
    provider: 'github',
    style: 'text-xl text-gray-500',
    icon: BsGithub,
  },
  // {
  //   provider: 'facebook',
  //   style: 'text-xl text-blue-500',
  //   icon: BsFacebook,
  // },
];

export default socialProvider;
