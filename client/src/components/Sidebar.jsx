import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function Sidebar() {
    return (
        <div className="side-menu bg-dark text-white vh-100">
            <ul className="list-group">
                <li className="list-group-item bg-dark text-white">
                    <a href="/dashboard-user" className="d-flex align-items-center text-white">
                        <i className="las la-home me-2"></i>
                        <small>Dashboard</small>
                    </a>
                </li>
                <li className="list-group-item bg-dark text-white">
                    <a href="#" className="d-flex align-items-center text-white">
                        <i className="las la-user-alt me-2"></i>
                        <small>Profile</small>
                    </a>
                </li>
                <li className="list-group-item bg-dark text-white">
                    <a href="#" className="d-flex align-items-center text-white">
                        <i className="las la-envelope me-2"></i>
                        <small>Mailbox</small>
                    </a>
                </li>
                <li className="list-group-item bg-dark text-white">
                    <a href="/dashboard-user" className="d-flex align-items-center text-white">
                        <i className="las la-clipboard-list me-2"></i>
                        <small>Projects</small>
                    </a>
                </li>
                <li className="list-group-item bg-dark text-white">
                    <a href="#" className="d-flex align-items-center text-white">
                        <i className="las la-shopping-cart me-2"></i>
                        <small>Orders</small>
                    </a>
                </li>
                <li className="list-group-item bg-dark text-white">
                    <a href="#" className="d-flex align-items-center text-white">
                        <i className="las la-tasks me-2"></i>
                        <small>Tasks</small>
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
