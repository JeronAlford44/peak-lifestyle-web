import { useContext, useEffect } from "react";
import { UserProfileContext } from "../../../Providers/Context/UserProfileContext";

export default function UpdateSignInStreak(){
    const {userData, toggleItemState} = useContext(UserProfileContext)
    
    console.log(userData)
    console.log(userData.LastSignIn.valueOf())
    useEffect(() => {
    if (
      new Date().valueOf() - userData.LastSignIn.valueOf() > 86400000 &&
      new Date().valueOf() - userData.LastSignIn.valueOf() < 86400000 * 2
    ) {
      toggleItemState('SignInStreak', userData.SignInStreak + 1)
    }
    else{
        toggleItemState('SignInStreak', 1)
    }
},[userData.LastSignIn])
    return userData.SignInStreak

}