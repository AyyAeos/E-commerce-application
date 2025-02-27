
import { Link, useNavigate } from "react-router-dom";

const AdminPage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="flex bg-primary text-primary-foreground min-h-screen">
            {/* Sidebar Navigation */}
            {/* block ensure it stay with nav */}

            {/* md+ (hidden on large screen ,relatuive)
            <md visible on small screens
            md+ only on big screen */}
           <nav className="border-l-4 border-blue-600 p-10 bg-white min-h-screen w-1/4">
            <Link to="/admins/inventory" className="block py-4 hover:text-red-600 underline">Check Inventory</Link>
            <Link to="/admins/transaction" className="block py-4 hover:text-red-600 underline">Check Transaction</Link>
            <Link to="/logins" className="block py-4 hover:text-red-600 underline">Check User</Link>
            <Link to="/logins/admin" className="block py-4 hover:text-red-600 underline">Check Employees</Link>
            <Link to="/logins/admin" className="block py-4 hover:text-red-600 underline">Check Department</Link>
        </nav>
            
            {/* Main Content */}
            {/* flex1 take remaining screen */}
            <div className="flex-1 flex flex-col justify-center items-center space-y-6">
                <h1 className="text-4xl  ">Welcome</h1>
                <p className="text-2xl">Admin DashBoard.</p>
                <p className="text-2xl">Please Select Your Action on Left.</p>
            </div>
        </div>
    );

};

export default AdminPage;

