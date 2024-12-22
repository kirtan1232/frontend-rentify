import { useNavigate } from "react-router-dom"

function CustomerIndex(){
    const navigate=useNavigate()

    return <>
    this is Customer index
    <button onClick={()=>navigate("/admin/customer/form")}>Add new</button>

    </>
}

export default CustomerIndex