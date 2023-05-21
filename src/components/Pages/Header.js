import { BorderRight } from "@mui/icons-material";
import React from "react";

const Header = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            borderRadius: '10px',
            backgroundColor: '#FFF44F',
            width: '80vw',
            minheight: '50px',
            marginTop: '30px',
            marginBottom: '10px',
            fontSize: '32px',
            padding: '20px 0px 20px 0px',
            fontWeight: 'bold'
        }}>
            PH Online Weather Search
        </div>
    )
}

export default Header;