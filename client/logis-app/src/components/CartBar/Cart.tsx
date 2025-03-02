import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom"

const Cart = () => {
    const navigate = useNavigate();
    return (
        <button
          className="fixed mt-4 right-4 bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600"
          onClick={() => navigate("/carts")}
        >
          <ShoppingCart />
        </button>
      );
    };

    export default Cart;
