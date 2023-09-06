import Main from "../component/main";
import SideBar from "../component/sidebar";

export const metadata = {
  title: "Dashboard",
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
          <SideBar />
          <Main>{children}</Main>
        </div>
      </body>
    </html>
  );
}
