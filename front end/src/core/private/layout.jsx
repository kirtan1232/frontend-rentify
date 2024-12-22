import { Outlet, useNavigate } from "react-router-dom";

function Layout() {

    const navigate=useNavigate()
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ background: "red" }}>topbar</div>

        <div style={{ flexGrow: 1, display: "flex", height: "100vh" }}>
          <div style={{ flexGrow: 1, background: "yellow", height: "100%" }}>
            <ul>
            <li>
                    <button>User</button>
                </li>
            <li>
                    <button>Fustal</button>
                </li>
                <li>
                    <button onClick={()=>navigate("/admin/customer")}>Customer</button>
                </li>
                <li>
                    <button onClick={()=>navigate("/admin/booking")}>Booking</button>
                </li>
            </ul>
          </div>
          <div style={{ flexGrow: 5 }}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
