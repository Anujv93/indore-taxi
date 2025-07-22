import "./style.css";

import AdminSidebar from "@components/sidebar/SideBar";
import ReduxProvider from "@components/ReduxProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <section>
        <div className="main_container">
          <div className="sidebar_container h-[100vh]">
            <AdminSidebar />
          </div>
          <div className="body_container overflow-y-auto">{children}</div>
        </div>
      </section>
    </ReduxProvider>
  );
}
