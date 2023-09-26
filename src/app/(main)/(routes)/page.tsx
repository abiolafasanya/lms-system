import Header from "@/components/shared/header/header";
import Welcome from "./components/welcome";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";

enum Role {
  ADMIN = "admin",
  TUTOR = "tutor",
  STUDENT = "student",
  GUEST = "student",
}
export default async function Home() {
  const user = await currentUser();
  if (!user) return redirectToSignIn();
  const email = user.emailAddresses[0].emailAddress;
  const profile = await db.user.findUnique({
    where: { email: email },
  });

  async function fetchProfile() {
    if (profile) return profile;
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
  async function locateDestination(profile: profileType) {
    const locate = await db.user.findFirst({
      where: {
        email: email,
      },
    });
    if (locate) {
      if (locate.role) {
        console.log((`/${Role[locate.role]}/dashboard`))
        if(Role[locate.role] == Role.STUDENT) return redirect(`/${Role[locate.role]}/dashboard`)
        if( Role[locate.role] == Role.TUTOR) return redirect(`/${Role[locate.role]}/dashboard`)
        if(Role[locate.role] == Role.GUEST) return;
        // return redirect(`/${Role[locate.role]}/dashboard`)
      };
      console.log((`/${Role[locate.role]}/dashboard`))
    }
  }

  const profileData = await fetchProfile();
  type profileType = typeof profile;
  await locateDestination(profileData);

  return (
    <main className="w-full">
      <Header />
      <Welcome />
    </main>
  );
}
