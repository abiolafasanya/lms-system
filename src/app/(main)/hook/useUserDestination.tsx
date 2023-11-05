import { db } from '@/lib/db';
import { currentUser, redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export function useUserDestination() {
  async function findOrCreateProfile() {
    const user = await currentUser();
    if (!user) return redirectToSignIn();
    const email = user.emailAddresses[0].emailAddress;
    const profile = await db.user.findUnique({
      where: { email: email },
    });

    if (profile) {
      console.log(`/dashboard/${profile.role}`);
      redirect(`/dashboard/${profile.role}`);
    } else {
      const newProfile = await db.user.create({
        data: {
          email: email,
          username: user?.username,
          name: `${user?.firstName} ${user?.lastName}`,
          image: user?.imageUrl,
        },
      });
      const result = newProfile;
      if (result) {
        console.log(`/dashboard/${result.role}`);
        redirect(`/dashboard/${result.role}`);
      } else redirect('/');
    }
  }

  return {};
}
