import { useState } from "react";
import axios from "axios";
import useSWR, { mutate } from "swr";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type User = {
  userId: number;
  name: string;
  userPhone: string;
  userCreateTime: string;
  userLastModifiedTime: string;
  username: string;
  password: string;
  email: string;
  role: string;
  departmentId: string | null;
};

const UserPage: React.FC = () => {
  const [EditUser, SetEditUser] = useState<User | null>(null);
  const [DeleteUser, SetDeleteUser] = useState<User | null>(null);
  
  const fetcher = async (url: string) => {
    try {
      const res = await axios.get(url);
      if (res.data.msg === "success") {
        return res.data.data;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const { data, error, isLoading } = useSWR(
    "http://localhost:8080/admins/user?selection=customer&page=1&pageLimit=4",
    fetcher
  );

  const navigate = useNavigate();

  return (
    <>
      <button
        className="fixed top-24 left-4 bg-white/10 backdrop-blur-lg text-black p-3 rounded-full shadow-lg hover:bg-white/20 hover:scale-[1.2]"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft size={20} />
      </button>
      <div className="pt-8 overflow-y-scroll min-h-screen bg-white text-primary-foreground px-5 sm:px-10 md:px-20">
        <div className="flex justify-center text-2xl font-bold">
          {/* User page title */}
          <span className="flex-1 text-center">Users</span>
        </div>

        <div className="overflow-x-auto">
          {isLoading && <p>Loading...</p>}
          {error && <p className="text-red-500">Failed to fetch users</p>}

          <Table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden">
            <TableCaption className="text-lg font-semibold py-4">
              User List
            </TableCaption>

            <TableHeader>
              <TableRow className="">
                <TableHead>Name</TableHead>
                <TableHead className="">Phone</TableHead>
                <TableHead className="">Username</TableHead>
                <TableHead className="">Email</TableHead>
                <TableHead className="">Role</TableHead>
                <TableHead className="">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data &&
                data.map((user: User) => (
                  <TableRow key={user.userId}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.userPhone}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <div className="flex space-x-4">
                        <button
                          className="border-2 border-black px-2 py-2 hover:bg-blue-500 w-full"
                          onClick={() => SetEditUser(user)}
                        >
                          Edit
                        </button>
                        <button
                          className="border-2 border-black px-2 py-2 hover:bg-red-500 w-full"
                          onClick={() => SetDeleteUser(user)}
                        >
                          Delete
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Display edit and delete forms */}
      {EditUser && (
        <EditForm user={EditUser} onClose={() => SetEditUser(null)} />
      )}

      {DeleteUser && (
        <DeleteForm user={DeleteUser} onClose={() => SetDeleteUser(null)} />
      )}
    </>
  );
};

export default UserPage;
