import { FaSearch } from "react-icons/fa";
import DataTable from "react-data-table-component";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  useDeleteUser,
  useGetUsers,
} from "../../../../hooks/reactQuery/useUser";
import Loader from "../../../../components/ui/loader";
import { toast } from "react-toastify";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

function UserTable() {
  const navigate = useNavigate();
  const { data: users, isLoading } = useGetUsers();
  const {
    mutate: deleteUser,
    isLoading: isDeleteUserLoading,
    data: DeleteUserData,
  } = useDeleteUser();

  if (isLoading || isDeleteUserLoading) {
    return <Loader />;
  }

  if (DeleteUserData && DeleteUserData?.status) {
    toast.success("User Deleted");
  }

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  const columns = [
    {
      name: "First Name",
      selector: "firstName",
      sortable: true,
    },
    {
      name: "Last Name",
      selector: "lastName",
      sortable: true,
    },
    {
      name: "Username",
      selector: "username",
      sortable: true,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
      width: "250px",
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
    },
    {
      cell: (row) => (
        <div className="w-full flex justify-end items-center">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center hover:bg-ha-secondary1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="IconButton" aria-label="Customise options">
                  <BsThreeDotsVertical style={{ color: "black" }} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuPortal>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => {
                      navigate("/forgot");
                    }}
                  >
                    Reset Password
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      handleDeleteUser(row.id);
                    }}
                  >
                    Delete User
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      // Handle edit user
                      console.log("Edit User Clicked");
                    }}
                  >
                    Edit User
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      // Handle deactivate user
                      console.log("Deactivate User Clicked");
                    }}
                  >
                    Deactivate User
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenuPortal>
            </DropdownMenu>
          </div>
        </div>
      ),
      sortable: false,
    },
  ];

  return (
    <div className="w-full h-[50vh] p-5">
      <div className="border-b py-2 flex items-center justify-end">
        <div className="relative w-[300px]">
          <input
            type="text"
            placeholder="Search by Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <FaSearch className="text-gray-500" />
          </div>
        </div>
      </div>
      {/* @ts-expect-error: Just ignore the next line */}
      <DataTable columns={columns} data={users.data} />
    </div>
  );
}

export default UserTable;
