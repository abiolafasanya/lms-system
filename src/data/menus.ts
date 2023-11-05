import { GoFileDirectory } from 'react-icons/go';
import { MdPerson, MdArticle, MdAssessment, MdBadge } from 'react-icons/md';
import { LayoutDashboard, Book } from 'lucide-react';
import { FaTasks } from 'react-icons/fa';

export const sideBarMenus = [
  { name: 'Dashboard', icon: LayoutDashboard, link: '/dashboard' },
  { name: 'Courses', icon: Book, link: '/dashboard/courses' },
  { name: 'Assessment', icon: MdAssessment, link: '/dashboard/assessment' },
  { name: 'Task', icon: FaTasks, link: '/dashboard/task' },
  // { name: "Post", icon: MdArticle, link: "/student#post" },
];

export const tutorSidebar = [
  { name: 'Dashboard', icon: LayoutDashboard, link: '/dashboard' },
  // { name: "Courses", icon: GoFileDirectory, link: "/tutor/course" },
  { name: 'Assessment', icon: MdAssessment, link: '/dashboard/assessment' },
  { name: 'Task', icon: FaTasks, link: '/dashboard/task' },
  // { name: "Post", icon: MdArticle, link: "/tutor/post" },
];

export const adminSideBar = [
  { name: 'Dashboard', icon: LayoutDashboard, link: '/dashboard' },
  { name: 'Users', icon: MdPerson, link: '/dashboard/users' },
  { name: 'Roles', icon: MdBadge, link: '/dashboard/roles' },
  { name: 'Posts', icon: MdArticle, link: '/dashboard/post' },
  { name: 'Courses', icon: GoFileDirectory, link: '#course' },
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
