
import { useNavigate } from "react-router-dom";

import { IoMdPeople } from "react-icons/io";



const OrderIcon = () => {
  const navigate = useNavigate();
  return (
    <>
      <button
        className="fixed bottom-20 right-4 mt-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600"
        onClick={() => navigate(`/orders`)}
      >
        <IoMdPeople  />
      </button>
    </>
  );
};

export default OrderIcon;
