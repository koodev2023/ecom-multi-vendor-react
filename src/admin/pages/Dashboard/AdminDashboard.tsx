import AdminDrawerList from "../../components/AdminDrawerList";
import AdminRoutes from "../../../routes/AdminRoutes";
import { useAppDispatch } from "../../../state/store";
import { useEffect } from "react";
import { fetchHomeCategories } from "../../../state/admin/adminHomeCategorySlice";

const AdminDashboard = () => {
  const toggleDrawer = () => {};
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchHomeCategories());
  }, []);

  return (
    <div>
      <div className="lg:flex lg:h-[90vh]">
        <section className="hidden lg:block h-full">
          <AdminDrawerList toggleDrawer={toggleDrawer} />
        </section>

        <section className="p-10 w-full lg:w-4/5 overflow-y-auto">
          <AdminRoutes />
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
