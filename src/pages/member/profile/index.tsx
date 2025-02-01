import ProfileMemberView from "@/components/views/member/Profile";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [profile, setProfile] = useState({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session: any = useSession();

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const { data } = await userServices.getProfile(
          session.data?.accessToken
        );
        setProfile(data.data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        console.log("Memuat ulang data");
      }
    };
    getAllUsers();
  }, [session]);
  return (
    <>
      <ProfileMemberView profile={profile} />
    </>
  );
};

export default ProfilePage;
