
import Chart from "@mindinventory/result-doughnut-chart";
import ProfileImageUpload from "./components/ProfileImageUpload";
import React, { useEffect } from "react";
import { UserProfileContext } from "../../../../Providers/Context/UserProfileContext";
import { Avatar, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  profileImg: {
    display: 'flex',
    borderRadius: '50%',
    width: '110px',
    height: '110px',
  },
  imgUploadContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    
    flexDirection: 'column',
  },
}))



export default function ProfileScreen(){
  const { userData, toggleItemState } = React.useContext(UserProfileContext)
  
  
  
  const classes = useStyles()
    return (
      <div>
        {/* <div>Profile</div> */}
        <div className={classes.imgUploadContainer}>
          <div >
            <Avatar
              alt="Profile Image"
              src={userData.ProfileImgUrl}
              className={classes.profileImg}
            />
          </div>
          <ProfileImageUpload />
        </div>
      </div>
    )
}