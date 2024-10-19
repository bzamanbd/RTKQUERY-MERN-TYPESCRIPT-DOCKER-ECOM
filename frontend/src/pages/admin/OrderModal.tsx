import { FC } from 'react';
import { Modal, ModalHeader,ModalBody,ModalFooter, useDisclosure, ModalContent, Table,TableHeader, TableColumn, TableBody, TableRow, TableCell, Button} from '@nextui-org/react';
import { useDeleteOrderByIdMutation, useFetchOrderByIdQuery, useUpdateOrderStatusMutation} from '../../services/redux/api/orderApi';
import {Image} from "@nextui-org/react";
import toast from 'react-hot-toast';
import { server } from '../../services/redux/store';

interface OrderModalProps{
  orderId: string;
  isOpen: boolean;
  onClose: () => void;
  
}

const OrderModal: FC<OrderModalProps> = ({orderId, isOpen, onClose}) => {
    const [updateOrderStatus,{isLoading: isUpdating}] = useUpdateOrderStatusMutation();
    
    const {onOpenChange} = useDisclosure();
    const {data} = useFetchOrderByIdQuery(orderId || "");
    const [deletedOrder, { isLoading: isDeleting }] = useDeleteOrderByIdMutation();
    if(!data?.data.order)return;
    const order = data.data.order;
    const date = new Date(order.createdAt); 
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short', // 'long' for full month name
      year: 'numeric',
    });

    const currentStatus = order.status;
    const handleStatusChange = () => {
      
      const statusSequence = ["Processing", "Shipped", "Delivered"];
      const currentIndex = statusSequence.indexOf(currentStatus);
      const nextStatus = statusSequence[(currentIndex + 1) % statusSequence.length];
      updateOrderStatus({ id: orderId, status: nextStatus });
    };

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
              Order Details: {order._id.slice(0, 8)}
            </ModalHeader>
            <ModalBody>
              <div className='flex items-center justify-between'>
                <span>{`Order Date: ${formattedDate}`}</span>
                <span className={`px-2 py-1 rounded-full text-white 
                  ${ order.status === 'Delivered' ? 'bg-green-500' : order.status === 'Shipped' ? 'bg-orange-500': 'bg-yellow-500'}`}>
                  {order.status}
                </span>
              </div> 
              <div> 
                { order.items.map((item, idx)=>{ 
                  return <div key={idx} 
                  className='flex items-start justify-start gap-2 rounded-sm shadow-md mb-6 px-4'>
                    <Image isZoomed src={`${server}/${item.photo}`} alt="" width={200}/> 
                    <Table shadow='none' radius='none'> 
                      <TableHeader>
                        <TableColumn>Name</TableColumn>
                        <TableColumn>Quantity</TableColumn>
                        <TableColumn>Price</TableColumn>
                      </TableHeader>
                      <TableBody> 
                        <TableRow> 
                          <TableCell><span>{item.name}</span></TableCell>
                          <TableCell><span>{item.quantity}</span></TableCell>
                          <TableCell><span>{item.price}</span></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  })
                }
              </div> 
              <div className='flex justify-between items-start gap-4'>

                <div className='flex flex-col'> 
                  <span>Shipping Address</span>
                  <span className='text-sm'>{order.shippingAddress.address}</span>
                  <span className='text-sm'>{order.shippingAddress.city}</span>
                  <span className='text-sm'>{order.shippingAddress.country}</span>
                  <span className='text-sm'>{order.shippingAddress.postCode}</span>
                </div>

                <div>  
                  <span>Summary</span>
                  <div className='flex justify-between items-center text-sm gap-4'>
                    <span>Subtotal:</span>
                    <span>{order.subtotal.toFixed(2)}</span>
                  </div>
                
                  <div className='flex justify-between items-center text-sm gap-4'>
                    <span>Shipping Charges:</span>
                    <span>{order.shippingCharges.toFixed(2)}</span>
                  </div>

                  <div className='flex justify-between items-center text-sm gap-4'>
                    <span>Tax:</span>
                    <span>{order.tax.toFixed(2)}</span>
                  </div>

                  <div className='flex justify-between items-center text-sm gap-4'>
                    <span>Discount:</span>
                    <span>{order.discount.toFixed(2)}</span>
                  </div>

                  <div className='flex justify-between items-center text-sm gap-4 font-bold'>
                    <span>Total:</span>
                    <span>{order.total.toFixed(2)}</span>
                  </div>
                </div>  
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex flex-col'>
                  <span>Customer Info</span>
                  <span className='text-sm'>{order.customer?.name}</span>
                  <span className='text-sm'>{order.customer?.email}</span>
                  <span className='text-sm'>{order.customer?.phone}</span>
                  <span className='text-sm'>{order.customer?.address}</span>
                </div> 
                <img src={`${server}/${order.qrCode}`} alt="Order QRCode" width={80}/>
              </div>
            </ModalBody>
            <ModalFooter className='flex justify-evenly items-center'>
                <Button size="sm" color="primary" className="ml-2" onClick={handleStatusChange} isDisabled= {isUpdating || currentStatus === "Delivered"} isLoading={isUpdating}>
                  {isUpdating? "Updating..." : currentStatus==="Delivered"? "Already delivered" : "Change Status" }
                </Button>
                <Button size="sm" color="danger" className="ml-2" 
                onClick={() => handleDeleteClick(orderId)}
                isLoading={isDeleting}>
                  {isDeleting ? 'Deleting...' : 'Delete Order'}
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
  );
};

export default OrderModal;


