import { Flex, Text, Image, Box } from '@mantine/core';
import logo from "../../assets/logoSkyCross.svg";
import arrowLeft from "../../assets/ArrowLeft.svg";
import "./HeaderStyle.scss";

const Header = () => {
     return (
       <Flex style={{ alignItems: 'center' }} className='BoxHeader'>
           <Box className='boxArrowHeader'>
           <Image src={arrowLeft} alt="Arrow Left" width={12} height={12} />
           </Box>
         <Text className='headerText'>
           Виктория
         </Text>
         <Image src={logo} alt="Logo" width={60} height={43} />
       </Flex>
     );
   };

   export default Header;
   