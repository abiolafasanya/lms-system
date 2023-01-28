import {
  GoDashboard,
  GoMilestone,
  GoProject,
  GoFileDirectory,
  GoSettings,
  GoSignOut,
  GoQuestion,
} from 'react-icons/go';
import {
  MdPostAdd,
  MdEvent,
  MdArticle,
  MdOutlineAssignment,
  MdAssessment,
  MdTaskAlt,
} from 'react-icons/md';
import { FaSignOutAlt } from 'react-icons/fa';

export const sideBarMenu = [
  { name: 'Dashboard', icon: GoDashboard, link: '/dashboard' },
  { name: 'Courses', icon: GoFileDirectory, link: '/course' },
  { name: 'My Learning', icon: GoMilestone, link: '/my-learning' },
  { name: 'Assessment', icon: MdAssessment, link: '/assessment' },
  { name: 'Tasks', icon: MdTaskAlt, link: '/task' },
  { name: 'Posts', icon: MdArticle, link: '/post' },
  // { name: 'Events', icon: MdEvent, link: '/event' },
];

export const studentSideBar = [
  { name: 'Dashboard', icon: GoDashboard, link: '/student' },
  { name: 'Courses', icon: GoFileDirectory, link: '/course' },
  { name: 'My Learning', icon: GoMilestone, link: '/my-learning' },
  { name: 'Assessment', icon: MdAssessment, link: '/assessment' },
  { name: 'Tasks', icon: MdTaskAlt, link: '/task' },
  { name: 'Posts', icon: MdArticle, link: '/post' },
  { name: 'Events', icon: MdEvent, link: '/event' },
];

export const tutorSidebar = [
  { name: 'Dashboard', icon: GoDashboard, link: '/tutor' },
  { name: 'Courses', icon: GoFileDirectory, link: '/tutor/course' },
  { name: 'Assessment', icon: MdAssessment, link: '/tutor/assessment' },
  { name: 'Tasks', icon: MdTaskAlt, link: '/tutor/task' },
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
