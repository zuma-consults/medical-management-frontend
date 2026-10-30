/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import DataTable from "react-data-table-component";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  useDeleteUser,
  useGetUsers,
  useUpdateUser,
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

function UserTable() {
  const [search, setSearch] = useState("");
  const { data: users, isLoading } = useGetUsers();
  const {
    mutate: deleteUser,
    isLoading: isDeleteUserLoading,
    isSuccess: deleteSuccess,
    reset: resetDelete,
  } = useDeleteUser();
  const {
    mutate: updateUser,
    isLoading: isUpdateLoading,
    isSuccess: updateSuccess,
    reset: resetUpdate,
  } = useUpdateUser();

  const rows = useMemo(() => {
    const list = Array.isArray(users?.data) ? users.data : [];
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter((u: any) =>
      [u.firstName, u.lastName, u.username, u.email]
        .filter(Boolean)
        .some((v: string) => v.toLowerCase().includes(q)),
    );
  }, [users, search]);

  if (isLoading || isDeleteUserLoading || isUpdateLoading) {
    return <Loader />;
  }

  if (deleteSuccess) {
    toast.success("User deactivated");
    resetDelete();
  }

  if (updateSuccess) {
    toast.success("User updated");
    resetUpdate();
  }

  const handleDeactivate = (id: string) => {
    updateUser({ id, data: { suspend: true, status: "inactive" } });
  };

  const handleActivate = (id: string) => {
    updateUser({ id, data: { suspend: false, status: "active" } });
  };

  const handleDeleteUser = (id: string) => {
    if (
      window.confirm(
        "Deactivate this user? They will no longer be able to sign in.",
      )
    ) {
      deleteUser(id);
    }
  };

  const columns = [
    {
      name: "First Name",
      selector: (row: any) => row.firstName,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row: any) => row.lastName,
      sortable: true,
    },
    {
      name: "Username",
      selector: (row: any) => row.username || "—",
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: any) => row.email,
      sortable: true,
      width: "250px",
    },
    {
      name: "Roles",
      selector: (row: any) =>
        Array.isArray(row.role) ? row.role.join(", ") : row.role || "—",
      wrap: true,
    },
    {
      name: "Status",
      selector: (row: any) =>
        row.suspend ? "suspended" : row.status || "—",
      sortable: true,
    },
    {
      cell: (row: any) => (
        <div className="w-full flex justify-end items-center">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center hover:bg-ha-secondary1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="IconButton" aria-label="User actions">
                  <BsThreeDotsVertical style={{ color: "black" }} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuPortal>
                <DropdownMenuContent>
                  {row.suspend || row.status === "inactive" ? (
                    <DropdownMenuItem onClick={() => handleActivate(row.id)}>
                      Activate User
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem onClick={() => handleDeactivate(row.id)}>
                      Deactivate User
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => handleDeleteUser(row.id)}>
                    Suspend User
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <FaSearch className="text-gray-500" />
          </div>
        </div>
      </div>
      <DataTable columns={columns} data={rows} pagination />
    </div>
  );
}

export default UserTable;
