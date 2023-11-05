import Header from '@/components/shared/header/header';
import Welcome from './components/welcome';
import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs';
import { $Enums } from '@prisma/client';

export type UserType = {
  id: string;
  email: string;
  password: string | null;
  image: string | null;
  username: string | null;
  avatar: string | null;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
  role: $Enums.UserRole;
} | null;

async function findOrCreateProfile() {
  // if (!user) return redirectToSignIn();
  const user = await currentUser();
  if (!user) return null;
  const email = user.emailAddresses[0].emailAddress;
  const profile = await db.user.findUnique({
    where: { email: email },
  });

  if (profile) {
    return profile;
  }
  const newProfile = await db.user.create({
    data: {
      email: email,
      username: user?.username,
      name: `${user?.firstName} ${user?.lastName}`,
      image: user?.imageUrl,
    },
  });
  return newProfile;
}

export default async function Home() {
  const user = (await findOrCreateProfile()) as UserType;

  return (
    <main className="w-full">
      <Header />
      <Welcome user={user} />
    </main>
  );
}
