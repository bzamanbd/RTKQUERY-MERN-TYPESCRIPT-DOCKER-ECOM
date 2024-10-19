import { useState } from "react";
import UserModal from "./UserModal";
import { Avatar, Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import { server } from "../../services/redux/store";
import { useFetchUsersQuery } from "../../services/redux/api/userApi";

const Users = () => {
  
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const {data} = useFetchUsersQuery();
  if(!data?.data.users)return;
  const users = data.data.users;
  const reversedUsers = users.slice().reverse();
  const closeModal = () => {
    setModalOpen(false);
    setSelectedUserId(null);
  };
  const handleViewClick = (userId: string) => {
    setSelectedUserId(userId);
    setModalOpen(true);
  };
  return (
    <div className="p-4  h-auto">
      <h1 className='mb-4 ml-2 text-gray-700'>All Users</h1>
      <Table aria-label="Order Summary Table" className='h-auto min-w-full'>
        <TableHeader>
        <TableColumn>User Id</TableColumn>
          <TableColumn>Photo</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Phone</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Joined Date</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {reversedUsers.map((user) => { 
            const shortUserId = user._id?.slice(0,8)
            const date = new Date(user.createdAt!); 
            const formattedDate = date.toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short', // 'long' for full month name
              year: 'numeric',
            });
            return (
              <TableRow key={user._id} >
                 <TableCell>{shortUserId}</TableCell>
                <TableCell>
                  <Avatar src={`${server}/${user.avatar}`} alt={user._id} isBordered radius="sm" />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{formattedDate}</TableCell>
                <TableCell>{user.isBanned}</TableCell>
                <TableCell>
                  <Button size="sm"onClick={() => handleViewClick(user._id!)} >
                   View
                  </Button>
                </TableCell>
              </TableRow>
            )
          }
          
          )}
        </TableBody>
      </Table>

      {selectedUserId && (
        <UserModal
          userId={selectedUserId}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );

}

export default Users
