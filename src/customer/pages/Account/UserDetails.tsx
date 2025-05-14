import ProfileFieldCard from "../../../components/ProfileFieldCard";
import { Divider } from "@mui/material";
import { useAppSelector } from "../../../state/store";

const UserDetails = () => {
  const auth = useAppSelector((state) => state.auth);

  return (
    <div className="flex justify-center py-10">
      <div className="w-full lg:w-2/3">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600">Personal Details</h1>
        </div>

        <div>
          <ProfileFieldCard
            name="Name"
            value={auth.user?.firstName + " " + auth.user?.lastName}
          />
          <Divider />
          <ProfileFieldCard name="Email" value={auth.user?.email || "N/A"} />
          <Divider />
          <ProfileFieldCard name="Mobile" value={auth.user?.mobile || "N/A"} />
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
