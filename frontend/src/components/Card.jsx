import React, { useState } from 'react';

import { RxAvatar } from "react-icons/rx";
import Button from './Layout/Button';
import Table from './Table';

const Card = ({ title, description, avatars }) => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden  min-w-[40%]">
            <div className="p-4">
                <h3 className="text-lg font-bold text-center">{"This is team title"}</h3>
                <p className="text-gray-500">{"this is team description"}</p>
            </div>
            <div className="flex p-4 my-3 items-center justify-between">
                {/* {avatars?.map((avatar, index) => (
          <img
            key={index}
            src={avatar}
            alt="Avatar"
            className="w-10 h-10 rounded-full border-2 border-white -ml-2"
          />
        ))} */}
                <img
                    src={'https://via.placeholder.com/50'}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full border-2 border-white -ml-2"
                />
                <Button w='30%' handleClick={toggleModal} title={'Team Details'} />
            </div>
            {showModal &&

<div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
<div className="relative w-[80%] mx-auto my-6">
  <div className="bg-white rounded-lg shadow-lg">
            
            <Table />
            <div className="p-4">
               <Button title={'Close'} w='40%' handleClick={toggleModal} />
              </div>
            </div>
          </div>
        </div>

            }
        </div>
    );
};

export default Card;
