import { useEffect, useState } from "react";
import NavIcon from "../../components/icons/NavIcon";
import styles from "./profile.module.scss";
import { getProfileApi, profileApi } from "../../api/profile";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    about: "",
    picture: null as File | null,
    pictureUrl: "",
    previewPicture: "",
  });

  const userString = localStorage.getItem("user");
  const [user, _] = useState(userString ? JSON.parse(userString) : "");
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState({
    name: true,
    about: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function copyText() {
    navigator.clipboard
      .writeText(user.email)
      .then(() => {
        alert("Copied the text: " + user.email);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      if (profileData.name && editMode.name == false)
        formData.append("name", profileData.name);
      if (profileData.about && editMode.about == false)
        formData.append("about", profileData.about);
      if (profileData.picture) formData.append("picture", profileData.picture);

      setEditMode((prev) => ({ ...prev, name: true, about: true }));

      await profileApi(formData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfileApi();
        const profile = res.data.profile;

        if (!profile) {
          return;
        }

        setProfileData((prev) => ({
          ...prev,
          name: profile.name || "",
          about: profile.about || "",
          picture: null,
          pictureUrl: profile.picture || "",
          previewPicture: profile.previewPicture || "",
        }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    setEditMode({ name: true, about: true });
  }, []);

  return (
    <div className={styles.wrapper}>
      <form className={styles.leftContainer} onSubmit={handleSubmit}>
        <button onClick={() => navigate(-1)} className={styles.btnBack}>
          <NavIcon name="IoArrowBackOutline" />
        </button>
        <div className={styles.imageContainer}>
          <img
            src={
              profileData.previewPicture
                ? profileData.previewPicture
                : profileData.pictureUrl
                ? `http://localhost:5002${profileData.pictureUrl}`
                : "/default-avatar.png"
            }
            alt="profile"
          />
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            // preview immediately
            setProfileData((prev) => ({
              ...prev,
              previewPicture: URL.createObjectURL(file),
            }));

            // upload immediately
            const formData = new FormData();
            formData.append("picture", file);

            try {
              await profileApi(formData); // API fires instantly
            } catch (err) {
              console.log(err);
            }
          }}
        />

        <div className={styles.inputContainer}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              className={styles.input}
              placeholder="Enter your name..."
              name="name"
              value={profileData.name}
              onChange={handleChange}
              disabled={editMode.name}
            />
            <button
              type="button"
              onClick={async (e) => {
                e.preventDefault();

                if (editMode.name == false) {
                  await handleSubmit(e as any);
                  setEditMode((prev) => ({ ...prev, name: true }));
                } else {
                  setEditMode((prev) => ({ ...prev, name: false }));
                }
              }}
            >
              <NavIcon
                name={`${
                  editMode.name == true ? "MdOutlineEdit" : "TiTickOutline"
                }`}
                className={styles.icon}
              />
            </button>
          </div>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="about" className={styles.label}>
            About
          </label>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              className={styles.input}
              placeholder="Enter about yourself..."
              name="about"
              value={profileData.about}
              onChange={handleChange}
              disabled={editMode.about}
            />
            <button
              type="button"
              onClick={async (e) => {
                e.preventDefault();

                if (editMode.about == false) {
                  await handleSubmit(e as any);
                  setEditMode((prev) => ({ ...prev, about: true }));
                } else {
                  setEditMode((prev) => ({ ...prev, about: false }));
                }
              }}
            >
              <NavIcon
                name={`${
                  editMode.about == true ? "MdOutlineEdit" : "TiTickOutline"
                }`}
                className={styles.icon}
              />
            </button>
          </div>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              className={styles.input}
              placeholder="Enter your Email..."
              disabled={true}
              value={user?.email || ""}
            />
            <button onClick={copyText}>
              <NavIcon name="FaRegCopy" className={styles.icon} size={24} />
            </button>
          </div>
        </div>
      </form>

      <div className={styles.rightContainer}>
        <img src="/public/favicon.svg" alt="Profile" className={styles.image} />
        <h2>Profile</h2>
      </div>
    </div>
  );
};

export default Profile;
