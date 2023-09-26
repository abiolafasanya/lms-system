import { tutorSidebar } from "@/data/menus";
import Main from "../component/main";
import SideBar from "../component/sidebar";

export const metadata = {
  title: "Dashboard | Tutor",
  description: "Leaning Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          <SideBar sidebar={tutorSidebar}/>
          <Main role="Tutor - Dashboard">{children}</Main>
        </div>
      </body>
    </html>
  );
}
