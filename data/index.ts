import {
  GoDashboard,
  GoMilestone,
  GoFileDirectory,
  GoSettings,
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

export const sideBarMenu = [
  { name: 'Dashboard', icon: GoDashboard, link: '/dashboard' },
  { name: 'Courses', icon: GoFileDirectory, link: '/course' },
  { name: 'Timeline', icon: GoMilestone, link: '/timeline' },
  { name: 'Assessment', icon: MdAssessment, link: '/assessment' },
  { name: 'Tasks', icon: FaTasks, link: '/task' },
  { name: 'Posts', icon: MdArticle, link: '/post' },
  // { name: 'Events', icon: MdEvent, link: '/event' },
];

export const adminSideBar = [
  { name: 'Dashboard', icon: GoDashboard, link: '/admin' },
  { name: 'Users', icon: MdPerson, link: '/admin/users' },
  { name: 'Roles', icon: MdBadge, link: '/admin/roles' },
  { name: 'Posts', icon: MdArticle, link: '/admin/post' },
  { name: 'Courses', icon: GoFileDirectory, link: '#course' },
];

export const tutorSidebar = [
  { name: 'Dashboard', icon: GoDashboard, link: '/tutor' },
  { name: 'Courses', icon: GoFileDirectory, link: '/tutor/course' },
  { name: 'Assessment', icon: MdAssessment, link: '/tutor/assessment' },
  { name: 'Tasks', icon: MdTaskAlt, link: '/tutor/task' },
  { name: 'Posts', icon: MdArticle, link: '/tutor/post' },
  { name: 'Events', icon: MdEvent, link: '#event' },
];

export const sideFooter = [
  { name: 'Account', icon: GoSettings, link: '/account' },
  { name: 'Logout', icon: FaSignOutAlt, link: '/api/auth/signout' },
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

const data = [
  {
    image:
      'https://img.freepik.com/free-photo/online-web-design_53876-95309.jpg?w=740&t=st=1674932357~exp=1674932957~hmac=31f0eba74fea21f89d3369114aa60ec0c130fcc37d84a024af889bc50472e9ab',
    link: '/course',
    title: 'course item one',
    price: 5000,
    authour: 'Abiola Fasanya',
  },
  {
    image:
      'https://img.freepik.com/free-photo/sofware-developer-thinking-while-touching-beard-while-typing-laptop-sitting-desk-with-multiple-screens-parsing-code-focused-database-admin-working-with-team-coding-background_482257-33556.jpg?w=826&t=st=1674932480~exp=1674933080~hmac=f313ab78b785657e93f2891fbc99a68194998935f931767983fdb7242b803c84',
    link: '/course',
    title: 'Introduction to HTML',
    price: 5000,
    authour: 'Abiola Fasanya',
  },
  {
    image:
      'https://img.freepik.com/free-vector/code-testing-cartoon-banner-functional-test-methodology-programming-search-errors-bugs-website-platform-development-dashboard-usability-optimization-computer-pc-vector-illustration_107791-3766.jpg?w=900&t=st=1674932503~exp=1674933103~hmac=57314ae362ebf3b5e98908e15ee3d07d5c607a1e8874d91914832652fae7fa5d',
    link: '/course',
    title: 'Software Development Fundamental',
    price: 5000,
    authour: 'Abiola Fasanya',
  },
  {
    image:
      'https://img.freepik.com/free-vector/programmers-using-javascript-programming-language-computer-tiny-people-javascript-language-javascript-engine-js-web-development-concept-bright-vibrant-violet-isolated-illustration_335657-986.jpg?w=740&t=st=1674932650~exp=1674933250~hmac=d1ecb1b712112f6b2caa08eea3612aa67d39457e18d775c205b7b349b89ca6c5',
    link: '/course',
    title: 'Understanding JavaScript',
    price: 5000,
    authour: 'Abiola Fasanya',
  },
  {
    image:
      'https://img.freepik.com/free-photo/ai-nuclear-energy-background-future-innovation-disruptive-technology_53876-129783.jpg?w=740&t=st=1674932726~exp=1674933326~hmac=7150d8bdc9704f154605adcc6717e4fe7c45f5cb09e5c9338a3f027ed23644c5',
    link: '/course',
    title: 'Robotics Engineering',
    price: 5000,
    authour: 'Abiola Fasanya',
  },
];