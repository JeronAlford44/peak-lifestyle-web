import { useContext } from "react";
import { UserProfileContext } from "../../../Providers/Context/UserProfileContext";


export default function UpdateLastSignIn(){
    const {userData, toggleItemState} = useContext(UserProfileContext)
    toggleItemState('LastSignIn', new Date())
    
}