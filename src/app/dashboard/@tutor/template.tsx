'use client';
import { tutorSidebar } from '@/data/menus';
import Main from '../component/main';
import SideBar from '../component/sidebar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const metadata = {
  title: 'Dashboard | Tutor',
  description: 'Leaning Management System',
};

// Create a client
const queryClient = new QueryClient();

export default function Template(props: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex">
        <SideBar sidebar={tutorSidebar} />
        <Main role="Tutor - Dashboard">{props.children}</Main>
      </div>
    </QueryClientProvider>
  );
}
