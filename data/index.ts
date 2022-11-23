import {
  GoDashboard,
  GoMilestone,
  GoProject,
  GoFileDirectory,
  GoSettings,
  GoSignOut,
} from 'react-icons/go';
import { MdPostAdd, MdEvent, MdArticle } from 'react-icons/md';
import { FaSignOutAlt } from 'react-icons/fa';

export const sideBarMenu = [
  { name: 'Dashboard', icon: GoDashboard, link: '/dashboard' },
  { name: 'Courses', icon: GoFileDirectory, link: '/course' },
  { name: 'My Learning', icon: GoMilestone, link: '/my-learning' },
  { name: 'Tasks', icon: GoProject, link: '/task' },
  { name: 'Posts', icon: MdArticle, link: '/post' },
  { name: 'Events', icon: MdEvent, link: '/event' },
];

export const sideFooter = [
  { name: 'Account', icon: GoSettings, link: '/accounts' },
  { name: 'Logout', icon: FaSignOutAlt, link: '/api/auth/signout' },
];

export const headMenu = [
  { name: 'My Profile & Settings', link: '/accounts/settings', icon: '' },
  { name: 'Account Settings', link: '/accounts/settings', icon: '' },
  { name: 'Help', link: '/accounts/settings', icon: '' },
  { name: 'SignOut', link: '/api/auth/signout', icon: '' },
];

export const courseMenuItems = [
  { name: 'Home', link: '/course/' },
  { name: 'Announcement', link: '/announcement/' },
  { name: 'Materials', link: '/materials/' },
  { name: 'Modules', link: '/modules/' },
  { name: 'Grade', link: '/grades/' },
  { name: 'Quiz', link: '/quiz/' },
  { name: 'Reports', link: '/reports/' },
];
