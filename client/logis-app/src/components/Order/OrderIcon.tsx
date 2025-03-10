
import { useNavigate } from "react-router-dom";

import { IoMdPeople } from "react-icons/io";

type OrderProps = {
  userId: string;
};

const OrderIcon: React.FC<OrderProps> = ({ userId }) => {
  const navigate = useNavigate();
  return (
    <>
      <button
        className="fixed left-4 mt-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600"
        onClick={() => navigate(`/orders/${userId}`)}
      >
        <IoMdPeople  />
      </button>
    </>
  );
};

export default OrderIcon;
