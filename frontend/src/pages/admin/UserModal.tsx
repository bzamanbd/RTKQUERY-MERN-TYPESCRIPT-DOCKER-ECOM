import { FC } from 'react';
import { Modal, ModalHeader,ModalBody,ModalFooter, useDisclosure, ModalContent, Table,TableHeader, TableColumn, TableBody, TableRow, TableCell, Button} from '@nextui-org/react';
import { useDeleteOrderByIdMutation } from '../../services/redux/api/orderApi';
import {Image} from "@nextui-org/react";
import toast from 'react-hot-toast';
import { server } from '../../services/redux/store';
import { useFetchUserByIdQuery } from '../../services/redux/api/userApi';

interface UserModalProps{
  userId: string;
  isOpen: boolean;
  onClose: () => void;
  
}

const UserModal: FC<UserModalProps> = ({userId, isOpen, onClose}) => {  
    const {onOpenChange} = useDisclosure();
    const {data} = useFetchUserByIdQuery(userId || "");
    const [deletedOrder, { isLoading: isDeleting }] = useDeleteOrderByIdMutation();
    if(!data?.data.user)return;
    const user = data.data.user;
    const date = new Date(user.createdAt); 
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short', // 'long' for full month name
      year: 'numeric',
    });

    
    const handleStatusChange = () => {};

    const handleDeleteClick = async (orderId:string) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this order?");
        if (isConfirmed) {
          try {
            await deletedOrder(orderId).unwrap();
            onClose();
            toast.success('Order deleted successfully!');
          } catch (error) {
            console.log(error);
            toast.success('Error deleting the order');
          }
        }
    };
         
  return (
    <Modal onClose={onClose}
    backdrop="blur" 
    isOpen={isOpen} 
    onOpenChange={onOpenChange}
    classNames={{
      backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-40"
    }}>
        <ModalContent> 
            <ModalHeader className="flex flex-col gap-1 items-center justify-center">
              User Details: {user._id.slice(0, 8)}
            </ModalHeader>
            <ModalBody>
              <div className='flex items-center justify-between'>
                <span>{`User Date: ${formattedDate}`}</span>
                <span className={`px-2 py-1 rounded-full text-white 
                  ${ user.isBanned === false ? 'bg-green-500' :  'bg-orange-500'}`}>
                  {user.isBanned}
                </span>
              </div> 
              <div>
              return <div 
                  className='flex items-start justify-start gap-2 rounded-sm shadow-md mb-6 px-4'>
                    <Image isZoomed src={`${server}/${user.avatar}`} alt="avatar" width={200}/> 
                    <Table shadow='none' radius='none'> 
                      <TableHeader>
                        <TableColumn>Name</TableColumn>
                        <TableColumn>Phone</TableColumn>
                        <TableColumn>Email</TableColumn>
                      </TableHeader>
                      <TableBody> 
                        <TableRow> 
                          <TableCell><span>{user.name}</span></TableCell>
                          <TableCell><span>{user.phone}</span></TableCell>
                          <TableCell><span>{user.email}</span></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
              </div> 
              <div className='flex justify-between items-start gap-4'>
                <div className='flex flex-col'> 
                  <span>Shipping Address</span>
                </div>

                <div>  
                  <span>Summary</span>
                  <div className='flex justify-between items-center text-sm gap-4'>
                    <span>Subtotal:</span>
                   
                  </div>
                
                  <div className='flex justify-between items-center text-sm gap-4'>
                    <span>Shipping Charges:</span>
                   
                  </div>

                  <div className='flex justify-between items-center text-sm gap-4'>
                    <span>Tax:</span>
                    
                  </div>

                  <div className='flex justify-between items-center text-sm gap-4'>
                    <span>Discount:</span>
                    
                  </div>

                  <div className='flex justify-between items-center text-sm gap-4 font-bold'>
                    <span>Total:</span>
                    
                  </div>
                </div>  
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex flex-col'>
                  <span>Customer Info</span>
            
                </div> 
                {/* <img src={`${server}/${order.qrCode}`} alt="Order QRCode" width={80}/> */}
              </div>
            </ModalBody>
            <ModalFooter className='flex justify-evenly items-center'>
                <Button size="sm" color="primary" className="ml-2" onClick={handleStatusChange}>
                  Updated
                </Button>
                <Button size="sm" color="danger" className="ml-2" 
                onClick={() => handleDeleteClick(userId)}
                isLoading={isDeleting}>
                  {isDeleting ? 'Deleting...' : 'Delete Order'}
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
  );
};

export default UserModal;


