import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminOrder: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col p-4 pt-16">
        <button
          className="fixed top-24 left-4 bg-white/10 backdrop-blur-lg text-black p-3 rounded-full shadow-lg hover:bg-white/20 hover:scale-[1.2]"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft size={20} />
        </button>

        {/* tittle */}
        <div>
          <h2 className="text-4xl text-black md:text-5xl font-bold text-center mb-8">
            Orders
          </h2>

          {/* table */}
          
        </div>
      </div>
    </>
  );
};
export default AdminOrder;
