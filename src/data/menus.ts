import { GoFileDirectory } from "react-icons/go";
import { MdPerson, MdArticle, MdAssessment, MdBadge } from "react-icons/md";
import { LayoutDashboard, Book } from "lucide-react";
import { FaTasks } from "react-icons/fa";

export const sideBarMenus = [
  { name: "Dashboard", icon: LayoutDashboard, link: "/student/dashboard" },
  { name: "Courses", icon: Book, link: "/student/courses" },
  { name: "Assessment", icon: MdAssessment, link: "/student/assessment" },
  { name: "Task", icon: FaTasks, link: "/student/task" },
  // { name: "Post", icon: MdArticle, link: "/student#post" },
];

export const tutorSidebar = [
  { name: "Dashboard", icon: LayoutDashboard, link: "/tutor/dashboard" },
  // { name: "Courses", icon: GoFileDirectory, link: "/tutor/course" },
  { name: "Assessment", icon: MdAssessment, link: "/tutor/assessment" },
  { name: "Task", icon: FaTasks, link: "/tutor/task" },
  // { name: "Post", icon: MdArticle, link: "/tutor/post" },
];

export const adminSideBar = [
  { name: "Dashboard", icon: LayoutDashboard, link: "/admin/dashboard" },
  { name: "Users", icon: MdPerson, link: "/admin/users" },
  { name: "Roles", icon: MdBadge, link: "/admin/roles" },
  { name: "Posts", icon: MdArticle, link: "/admin/post" },
  { name: "Courses", icon: GoFileDirectory, link: "#course" },
];

export const courseMenuItems = [
  { name: "Home", link: "/course/" },
  { name: "Announcement", link: "/announcement/" },
  { name: "Materials", link: "/materials/" },
  { name: "Modules", link: "/modules/" },
  { name: "Grade", link: "/grades/" },
  { name: "Quiz", link: "/quiz/" },
  { name: "Reports", link: "/reports/" },
];
