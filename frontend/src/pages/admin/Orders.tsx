import { FC, useState } from 'react';
import { Table, Avatar, Button, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { useAllOrdersQuery, useMarkOrderAsViewedMutation } from '../../services/redux/api/orderApi';
import { server } from '../../services/redux/store';
import OrderModal from './OrderModal';

const AdminOrdersPage: FC = () => {

  const [markOrderAsViewed]= useMarkOrderAsViewedMutation();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const {data} = useAllOrdersQuery();
  if(!data?.data.orders)return;
  const orders = data.data.orders;
  const reversedOrders = orders.slice().reverse();
  const handleViewClick = (orderId: string) => {
    markOrderAsViewed({id: orderId, viewed: true});
    setSelectedOrderId(orderId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedOrderId(null);
  };

  return (
    <div className="p-4  h-auto">
      <h1 className='mb-4 ml-2 text-gray-700'>All Orders</h1>
      <Table
        aria-label="Order Summary Table"
        className='h-auto min-w-full'
      >
        <TableHeader>
        <TableColumn>Order Id</TableColumn>
          <TableColumn>Photo</TableColumn>
          <TableColumn>Item's Name</TableColumn>
          <TableColumn>Delivery Charge</TableColumn>
          <TableColumn>Discount(Tk)</TableColumn>
          <TableColumn>Tax(Tk)</TableColumn>
          <TableColumn>Total(Tk)</TableColumn>
          <TableColumn>Ordered Date</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {reversedOrders.map((order) => { 
            const shortOrderId = order._id.slice(0, 8);
            const date = new Date(order.createdAt); 
            const formattedDate = date.toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short', // 'long' for full month name
              year: 'numeric',
            });
            return (
              <TableRow key={order._id} className={order.viewed == false? 'bg-gray-200' : 'bg-white'} >
                 <TableCell>{shortOrderId}</TableCell>
                <TableCell>
                  <Avatar src={`${server}/${order.items[0].photo}`} alt={order._id} isBordered radius="sm" />
                </TableCell>
                <TableCell>{order.items[0].name}</TableCell>
                <TableCell>{order.shippingCharges}</TableCell>
                <TableCell>{order.discount}</TableCell>
                <TableCell>{order.tax}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>{formattedDate}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-white ${
                      order.status === 'Delivered' ? 'bg-green-500' :  order.status === 'Shipped' ? 'bg-orange-500': 'bg-yellow-500' }`}>
                    {order.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Button size="sm" color={order.viewed == false? 'danger' : 'primary'} onClick={() => handleViewClick(order._id)} >
                    {order.viewed == false? "New" : "View"}
                  </Button>
                </TableCell>
              </TableRow>
            )
          }
          
          )}
        </TableBody>
      </Table>

      {selectedOrderId && (
        <OrderModal
          orderId={selectedOrderId}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
      
    </div>
  );

  
};

export default AdminOrdersPage;
