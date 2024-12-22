import { useNavigate } from "react-router-dom"

function CustomerForm(){

    const navigate=useNavigate()
    return <>
    this is Customer form 
    <button onClick={()=>navigate("/admin/customer")}>back</button>

    </>
}

export default CustomerForm