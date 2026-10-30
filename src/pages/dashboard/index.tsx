import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { MdBloodtype } from "react-icons/md";
import { GiMedicines } from "react-icons/gi";
import { GiSkeleton } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { GiReceiveMoney } from "react-icons/gi";
import { useGetUserByToken } from "../../hooks/reactQuery/useUser";

interface DashboardCardProps {
  to: string;
  icon: ReactElement;
  title: string;
  description?: string;
}

function DashboardCard({ to, icon, title, description }: DashboardCardProps) {
  return (
    <Link
      to={to}
      className="group w-full bg-white shadow-md rounded-md transition-transform transform hover:scale-105 flex items-center"
    >
      <div className="text-3xl bg-ha-primary1 p-5 h-full text-white">
        {icon}
      </div>
      <div className="p-5 bg-ha-secondary1 w-full h-full">
        <h2 className="text-lg text-ha-primary1 font-medium">{title}</h2>
        {description ? (
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        ) : null}
      </div>
    </Link>
  );
}

function Dashboard() {
  const { data } = useGetUserByToken();

  return (
    <div className="Dashboard w-full">
      <div className="relative h-[200px] bg-gradient-to-r to-ha-primary1 from-blue-700 rounded-[1rem] shadow">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-40"
            src="https://upload.wikimedia.org/wikipedia/commons/d/d2/Stethoscope-2.png"
            alt="Background"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white ml-3">
          <h1 className="md:text-4xl text-xl font-bold mb-4 capitalize">
            Welcome {data?.data?.firstName} {data?.data?.lastName}
          </h1>
          <p className="md:text-lg">
            MedOpt Clinic — patients, consultations, diagnostics, pharmacy, and
            billing in one place.
          </p>
        </div>
      </div>
      <div className="grid md:grid-cols-4 gap-6 mt-10 bg-white p-10 rounded-[1rem]">
        <DashboardCard
          to="/dashboard"
          icon={<MdDashboard />}
          title="Dashboard"
          description="Overview"
        />
        <DashboardCard
          to="/patients"
          icon={<IoIosPeople />}
          title="Patients"
          description="Register & charts"
        />
        <DashboardCard
          to="/visits"
          icon={<FaUserDoctor />}
          title="Consultations"
          description="OPD queue"
        />
        <DashboardCard
          to="/laboratory"
          icon={<MdBloodtype />}
          title="Laboratory"
          description="Orders & results"
        />
        <DashboardCard
          to="/radiology"
          icon={<GiSkeleton />}
          title="Radiology"
          description="Imaging queue"
        />
        <DashboardCard
          to="/pharmacy"
          icon={<GiMedicines />}
          title="Pharmacy"
          description="Dispense treatments"
        />
        <DashboardCard
          to="/finance"
          icon={<GiReceiveMoney />}
          title="Finance"
          description="Bills & receipts"
        />
        <DashboardCard
          to="/settings/users"
          icon={<IoMdSettings />}
          title="Settings"
          description="Users & catalogs"
        />
      </div>
    </div>
  );
}

export default Dashboard;
