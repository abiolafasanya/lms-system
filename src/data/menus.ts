import {
    GoMilestone,
    GoFileDirectory,
    GoInfo,
  } from 'react-icons/go';
  
  import {
    MdPerson,
    MdEvent,
    MdArticle,
    MdAssessment,
    MdTaskAlt,
    MdBadge,
  } from 'react-icons/md';

  import { LayoutDashboard, TestTubes, Book, LogOut, Settings } from "lucide-react";
  
  import { FaSignOutAlt, FaTasks, FaSchool } from 'react-icons/fa';
  
  export const statusBar = [
    {
      name: 'Course', icon: FaSchool
    },
    {
      name: 'Post', icon: MdArticle
    },
    {
      name: 'Task', icon: FaTasks
    },
    {
      name: 'Announcement', icon: GoInfo
    },
  ]
  
  export const sideBarMenus = [
    { name: 'Dashboard', icon: LayoutDashboard, link: '/student/dashboard' },
    { name: 'Courses', icon: Book, link: '/student/courses' },
    { name: 'Assessment', icon: MdAssessment, link: '/student/assessment' },
    { name: 'Tasks', icon: FaTasks, link: '/student/tasks' },
    { name: 'Posts', icon: MdArticle, link: '/student/posts' },
  ];
  
  export const adminSideBar = [
    { name: 'Dashboard', icon: LayoutDashboard, link: '/admin' },
    { name: 'Users', icon: MdPerson, link: '/admin/users' },
    { name: 'Roles', icon: MdBadge, link: '/admin/roles' },
    { name: 'Posts', icon: MdArticle, link: '/admin/post' },
    { name: 'Courses', icon: GoFileDirectory, link: '#course' },
  ];
  
  export const tutorSidebar = [
    { name: 'Dashboard', icon: LayoutDashboard, link: '/tutor' },
    { name: 'Courses', icon: GoFileDirectory, link: '/tutor/course' },
    { name: 'Assessment', icon: MdAssessment, link: '/tutor/assessment' },
    { name: 'Tasks', icon: MdTaskAlt, link: '/tutor/task' },
    { name: 'Posts', icon: MdArticle, link: '/tutor/post' },
    { name: 'Events', icon: MdEvent, link: '#event' },
  ];
  
  export const sideFooter = [
    { name: 'Account', icon: Settings, link: '/account' },
    { name: 'Logout', icon: LogOut, link: '/api/auth/signout' },
  ];
  
  export const headMenu = [
    { name: 'My Account', link: '/account', icon: '' },
    { name: 'Help', link: '#accounts/settings', icon: '' },
    { name: 'SignOut', link: '/api/auth/signout', icon: '' },
  ];
  
  export const headMenuA = [
    { name: 'My Account', link: '/account', icon: '' },
    { name: 'Help', link: '#accounts/settings', icon: '' },
    { name: 'SignOut', link: '/api/auth/signout', icon: '' },
  ];
  
  export const headMenuT = [
    { name: 'My Account', link: '/account', icon: '' },
    { name: 'Help', link: '#accounts/settings', icon: '' },
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

  