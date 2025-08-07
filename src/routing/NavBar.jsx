
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LoginOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd'; 
import "./navBar.css";
import Ecom6 from '../assets/Ecom6.jpg';

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePath, setActivePath] = useState("/");

  useEffect(() => { 
    setActivePath(location.pathname);
  }, [location]);

  const handleLogout = () => {
    console.log("Logged out");
    localStorage.removeItem("isLoggedIn");
    navigate("/login"); 
  };

  return (
    <div className="navSection" style={{ 
      display: 'flex', 
      alignItems: 'center', 
      padding: '10px 20px' 
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '20px' 
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px' 
        }}>
          <svg 
            style={{ 
              width: '24px', 
              height: '24px', 
              color: '#3b82f6', 
              marginRight: '10px' 
            }} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
          </svg>
          <h1 style={{ 
            fontSize: '20px', 
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #3b82f6, #10b981)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginRight: '20px',
            position: 'relative',
            left: '-18px',
          }}>
            <img src={Ecom6}  alt="title" style={{
               height: '40px',
               width: '40px',
               position: 'absolute',
               marginLeft:'-40px',
               top:'-5px'
            }}
            />
            ShopEasy
          </h1>
        </div>

        <nav style={{ 
          display: 'flex', 
          alignItems: 'center' 
        }}>
          <ul style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '2px', 
            listStyle: 'none', 
            margin: 0, 
            padding: 0, 
          }}>
            <li>
              <Link 
                to="/" 
                className={`nav-link ${activePath === "/" ? "active" : ""}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/products" 
                className={`nav-link ${activePath === "/products" ? "active" : ""}`}
              >
                Products
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={`nav-link ${activePath === "/about" ? "active" : ""}`}
              >
                About
              </Link>
            </li>
            <li>
              <Link  
                to="/employees" 
                className={`nav-link ${activePath === "/employees" ? "active" : ""}`}
              >
                Employees
              </Link>
            </li>

            <li 
              className="Log nav-link" 
              onClick={handleLogout}
               style={{ 
                 display: 'flex', 
                 alignItems: 'center', 
                 gap: '20px',
                 marginLeft: '37rem'
              }}
             >
             <Tooltip title="Log-out">
               <LoginOutlined style={{ fontSize: '24px', color: 'red'}} /> 
             </Tooltip>
             <span style={{ 
               fontSize: '18px', 
               color: '#888', 
               marginLeft: '-10px' 
               }}
              >
               User : @harsha
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default NavBar;