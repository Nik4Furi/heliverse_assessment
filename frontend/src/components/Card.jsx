import React, { useState } from 'react';

import { RxAvatar } from "react-icons/rx";
import Button from './Layout/Button';
import Table from './Table';

const Card = ({ title, description, members }) => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden  w-[100%] md:w-[45%]">
            <div className="p-4">
                <h3 className="text-lg font-bold text-center text-highlight capitalize">{title}</h3>
                <p className="text-gray-500">{description}</p>
            </div>
            <div className="flex p-4 my-3 items-center justify-between relative">
             <p>  Members: <b>{members?.length}</b></p>
                <Button w='30%' handleClick={toggleModal} title={'Team Details'} />
            </div>
            {showModal &&

                <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none ">
                    <div className="relative w-[80%] mx-auto my-6 ">
                        <div className="bg-white rounded-lg shadow-lg overflow-x-auto">

                            <Table data={members} />
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
