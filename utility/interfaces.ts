import React from 'react';
import { JwtPayload } from 'jsonwebtoken';

// import IUser from './user';

export interface IUser {
  id: string;
  userId?: string;
  username?: string;
  name?: string;
  email?: string;
}
export interface IBlog {
  id: string;
  title: string;
  user?: string | IUser;
  content: string;
  headline?: string;
  picture?: string;
  createdAt?: string | object;
  updatedAt?: string;
}

export interface Iprops extends React.PropsWithChildren {
  action?: any;
  className?: any;
  type?: any;
  data?: any;
  title?: any;
  footer?: any;
  message?: any;
}

export interface Menu {
  name: string;
  icon?: any;
  link: string;
}

export interface SideMenu {
  menu: Menu[];
  footer: Menu[];
}

interface CourseInterface {
  menus: any[];
}
