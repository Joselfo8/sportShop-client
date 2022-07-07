import { useDispatch } from "react-redux";
import NavBar from "../Navbar/Navbar";

export default function(){
    const dispatch = useDispatch();
    return(
        <div>
            <NavBar/>
        </div>
    );
};