import { FACEBOOK_SQUARE_WHITE, TIKTOK_SQUARE_WHITE, YOUTUBE_SQUARE_WHITE } from "@/@core/lib/image"
import { Contact } from "../../seeds/info"
import { AppBar, Box, IconButton, Toolbar } from "@mui/material"
import { Mail, Phone } from "lucide-react"
import Image from "next/image"
import MenuIcon from '@mui/icons-material/Menu';

const TopBar = () => {
   return (
      <Box sx={{ flexGrow: 1 }}>  
      Hello
         <div className="top-bar-items">
            <div className="top-item font-bold">
            <Phone size={18} className="item-icon"/> {Contact.phone}
            </div> 
            <div className="top-item font-bold">
            <Mail size={18} className="item-icon"/> {Contact.email}
            </div> 
         </div>
         <div className="top-bar-icons">
            <a href={Contact.facebook} target="_blank" rel="noreferrer"> <Image src={FACEBOOK_SQUARE_WHITE} alt="contact-icon"/> </a>
            <a href={Contact.tiktok} target="_blank" rel="noreferrer"> <Image src={TIKTOK_SQUARE_WHITE}  alt="contact-icon"/> </a>
            <a href={Contact.youtube} target="_blank" rel="noreferrer"> <Image src={YOUTUBE_SQUARE_WHITE}  alt="contact-icon"/> </a>
         </div>
      </Box>
   )
}

export default TopBar;