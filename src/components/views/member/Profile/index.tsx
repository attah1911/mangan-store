import MemberLayout from "@/components/layouts/MemberLayout";
import styles from "./Profile.module.scss";
import InputMember from "@/components/ui/InputMember";
import Button from "@/components/ui/Button";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProfileMemberView = ({ profile }: any) => {
  console.log(profile);
  return (
    <MemberLayout>
      <h1 className={styles.profile__title}>Profile Page</h1>
      <div className={styles.profile__main}>
        <div className={styles.profile__main__avatar}>
          <Image src={profile.image} alt="profile" width={200} height={200} />
          <label
            className={styles.profile__main__avatar__label}
            htmlFor="upload-image"
          >
            <p>
              Upload avatar baru, gambar yang besar akan diatur secara otomatis
            </p>
            <p>
              Maksimal ukuran upload <b>1 MB</b>
            </p>
          </label>
          <input
            className={styles.profile__main__avatar__input}
            type="file"
            name="image"
            id="upload-image"
          />
        </div>
        <div className={styles.profile__main__detail}>
          <form action="">
            <InputMember
              label="Username"
              type="text"
              name="username"
              defaultValue={profile.username}
            />
            <InputMember
              label="Email"
              type="email"
              name="email"
              defaultValue={profile.email}
            />
            <InputMember
              label="Phone"
              type="number"
              name="phone"
              defaultValue={profile.phone}
            />
            {/* <InputMember
            label="Password"
            type="password"
            name="password"
            defaultValue={profile.password}
            /> */}
            <Button type="submit" variant="primary">
              Update Profile
            </Button>
          </form>
        </div>
      </div>
    </MemberLayout>
  );
};

export default ProfileMemberView;
