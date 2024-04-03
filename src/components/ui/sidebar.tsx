import { Dropdown, Sidebar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { MdBloodtype } from "react-icons/md";
// import { FaUserNurse } from "react-icons/fa";
import { GiMedicines } from "react-icons/gi";
import { GiSkeleton } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { GiReceiveMoney } from "react-icons/gi";  

function SideBar() {


const location = useLocation();

const isLinkActive = (path) => {
  return location.pathname.match(path);
};

  return (
    <div className="h-full custom-bg-black shadow-md z-[20]">
      <Sidebar aria-label="Sidebar with multi-level dropdown example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item as={Link} className={isLinkActive('dashboard') && 'bg-indigo-500'} to="/dashboard" icon={MdDashboard}>
              <span className="hidden lg:flex">Dashboard</span>
            </Sidebar.Item>
            <Sidebar.Item as={Link} className={isLinkActive('patients') && 'bg-indigo-500'} to="/patients" icon={IoIosPeople}>
              <span className="hidden lg:flex">Patients</span>
            </Sidebar.Item>
            <Sidebar.Item as={Link} className={isLinkActive('visits') && 'bg-indigo-500'} to="/visits" icon={FaUserDoctor}>
              <span className="hidden lg:flex">Consultation</span>
            </Sidebar.Item>
            <Sidebar.Item as={Link} className={isLinkActive('laboratory') && 'bg-indigo-500'} to="/laboratory" icon={MdBloodtype}>
              <span className="hidden lg:flex">Laboratory</span>
            </Sidebar.Item>
            <Sidebar.Item as={Link} className={isLinkActive('radiology') && 'bg-indigo-500'} to="/radiology" icon={GiSkeleton}>
              <span className="hidden lg:flex">Radiology</span>
            </Sidebar.Item>
            <Sidebar.Item as={Link} className={isLinkActive('pharmacy') && 'bg-indigo-500'} to="/pharmacy" icon={GiMedicines}>
              <span className="hidden lg:flex">Pharmacy</span>
            </Sidebar.Item>
            {/* <Sidebar.Item as={Link} to="/nursing" icon={FaUserNurse}>
              <span className="hidden lg:flex">Nursing</span>
            </Sidebar.Item> */}
            <Sidebar.Item as={Link} className={isLinkActive('finance') && 'bg-indigo-500'} to="/finance" icon={GiReceiveMoney}>
              <span className="hidden lg:flex">Finance</span>
            </Sidebar.Item>
            <Sidebar.Item icon={IoMdSettings} >
              <span className="hidden lg:flex">
                {" "}
                <Dropdown arrowIcon={true} inline label="Settings">
                  <Dropdown.Item as={Link} className={isLinkActive('settings/users') && 'bg-indigo-500'} to="/settings/users">
                    User Management
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} className={isLinkActive('settings/laboratory') && 'bg-indigo-500'} to="/settings/laboratory">
                    Laboratory
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} className={isLinkActive('settings/radiology') && 'bg-indigo-500'} to="/settings/radiology">
                    Radiology
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} className={isLinkActive('settings/finance') && 'bg-indigo-500'} to="/settings/finance">
                    Finance
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} className={isLinkActive('settings/visit') && 'bg-indigo-500'} to="/settings/visit">
                    Consultation
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} className={isLinkActive('settings/pharmacy') && 'bg-indigo-500'} to="settings/pharmacy">
                    Pharmacy
                  </Dropdown.Item>
                </Dropdown>
              </span>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}

export default SideBar;
