import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";

export const initailProfile = async () => {
  const user = await currentUser();
  if (!user) return redirectToSignIn();
  const email = user.emailAddresses[0].emailAddress;
  const profile = await db.user.findUnique({
    where: { email: email },
  });

  if (profile) return profile;

  const newProfile = db.user.create({
    data: {
      email: email,
      username: user.username,
      name: user.firstName,
      image: user.imageUrl,
    },
  });
  return newProfile;
};
