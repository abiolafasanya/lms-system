import { db } from '@/lib/db';
import { currentUser, redirectToSignIn } from '@clerk/nextjs';
import Link from 'next/link';

export default async function Template(props: {
  admin: React.ReactNode;
  student: React.ReactNode;
  tutor: React.ReactNode;
}) {
  const view = {
    ADMIN: props.admin,
    STUDENT: props.student,
    TUTOR: props.tutor,
    GUEST: (
      <div>
        Hello Guest!, return home <Link href="/">Home</Link>
      </div>
    ),
  };

  const user = await currentUser();
  if (!user) return redirectToSignIn();
  const email = user.emailAddresses[0].emailAddress;
  const userData = await db.user.findFirst({
    where: {
      email: email,
    },
  });
  return <>{userData?.role && view[userData.role]}</>;
}
