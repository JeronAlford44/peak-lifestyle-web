
import Chart from "@mindinventory/result-doughnut-chart";
import ProfileImageUpload from "./components/ProfileImageUpload";
import React, { useEffect } from "react";
import { UserProfileContext } from "../../../../Providers/Context/UserProfileContext";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  profileImg: {
    display: 'flex',
    borderRadius: '50%',
    
    width: '110px',
    height: '110px',
    position: 'relative',
  },
}))



export default function ProfileScreen(){
  const { userData, toggleItemState } = React.useContext(UserProfileContext)
  
  
  
  const classes = useStyles()
    return (
      <div>
        {/* <div>Profile</div> */}
        <div>
          <img id='progfileImg'
            className={classes.profileImg}
            src={userData.ProfileImgUrl}
            alt="Profile Image"
            style={{}}
          />
        </div>
        <ProfileImageUpload />
      </div>
    )
}