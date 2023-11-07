'use client';
import { sideBarMenus } from '@/data/menus';
import Main from '../component/main';
import SideBar from '../component/sidebar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const metadata = {
  title: 'Dashboard | Student',
  description: 'Leaning Management System',
};

const queryClient = new QueryClient();

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex">
        <SideBar sidebar={sideBarMenus} />
        <Main role="STUDENT: KI-STD-001">{children}</Main>
      </div>
    </QueryClientProvider>
  );
}
