import React from 'react';
import { styled } from "@mui/material/styles";
import { Switch } from "@mui/material";

const StyledSwitch = styled(Switch)(({ theme }) => ({
    width: 60,
    height: 32,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingTop: 0,
    "& .MuiSwitch-switchBase": {
      opacity: 1,
      margin: 2,
      padding: 0,
      "&.Mui-checked": {
        opacity: 1,
        transform: "translateX(28px)",
        "& .MuiSwitch-thumb": {
          background:
            "linear-gradient(157.51deg, rgba(2, 109, 255, 0.7) 16.75%, rgba(0, 215, 255, 0.7) 85.92%)",
          // border: "1px solid",
          // borderImageSource: "linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, #FFFFFF 100%)",
          boxShadow: "0px 4px 4px 0px #00000040",
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          background:
            "linear-gradient(180deg, rgba(46, 167, 255, 0) 57.41%, rgba(46, 167, 255, 0.1) 100%)",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      background: "linear-gradient(139.18deg, #42528C 19.47%, #21273D 83.88%)",
      // border: "1px solid",
      // borderImageSource: "linear-gradient(135deg, rgba(55, 244, 250, 0.2) 17.19%, rgba(30, 18, 102, 0.2) 87.5%)",
  
      width: 28,
      height: 28,
      borderRadius: 20,
      boxShadow: "0px 4px 10px 0px #0000004D",
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      background:
        "linear-gradient(139.18deg, rgba(49, 58, 91, 0.5) 19.47%, rgba(38, 49, 109, 0.5) 83.88%)",
      // border: 1px solid;
      // border-image-source: linear-gradient(135deg, rgba(134, 113, 236, 0.128) 17.19%, rgba(0, 0, 0, 0.2) 87.5%);
      borderRadius: 20,
    },
  }));

const CustomSwitch = ({onChange, checked}) => {
  return <StyledSwitch onChange={onChange} checked={checked} data-sound-click />
}

export default CustomSwitch