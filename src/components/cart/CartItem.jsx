import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

const CartItem = (props) => {
    const {item, handleRemoveProduct, incrementQuantity,decrementQuantity, setItemsQuantity, itemsQuantity} = props;
    const itemQuantity = itemsQuantity.filter(i => i.itemId === item._id)[0]?.quantity
    return (
        <div key={item.id} className="flex items-center justify-between border-b border-gray-200 py-4">
            <div className="flex items-center">
                <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-500">Price: {item.price} pkr</p>
                    <p className="text-gray-500">Delivery Free: {item.deliveryFee} pkr</p>
                </div>
            </div>
            <div className='flex gap-8 items-center'>
                <p className='w-6 text-center'>{itemQuantity}</p>
                <div className='flex gap-4'>
                    <FaPlus onClick={() => incrementQuantity(item._id)} className='cursor-pointer hover:scale-125' />
                    <FaMinus onClick={() => decrementQuantity(item._id)} className='cursor-pointer hover:scale-125' />
                </div>
                <Button  onClick={() => handleRemoveProduct(item._id)} className=" normal_btn text-red-500">Remove</Button>
            </div>
        </div>
    )
}

export default CartItem