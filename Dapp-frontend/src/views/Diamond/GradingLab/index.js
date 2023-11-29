import React from "react";
import StyledContainer from "../components/StyledContainer";
import { useState, useEffect } from "react";
import {
  Flex,
  Image,
  useToast,
  Table,
  Button,
  Input,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box
} from "@chakra-ui/react";

// assets
import gradingbg from '../../../assets/img/process/crave.png';
import diamondImage from "assets/img/DiamondType/cut.png";

export default function CuttingCompany() {
  const [diamonds, setDiamonds] = useState([]);
  const [selectedDiamond, setSelectedDiamond] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {

    // fetch("YOUR_SPRING_BOOT_URL/diamonds")
    fetch("/diamond.json")
      .then((response) => response.json())
      .then((data) => {
        const cutDiamonds = data.filter((diamond) => diamond.status === "cut");
        setDiamonds(cutDiamonds);
      })
      .catch((error) => console.error("获取数据时出错:", error));
  }, []);


  const handleCarvedClick = (diamond) => {
    updateDiamondStatus(diamond.UniqueId, "carved");
    setIsModalOpen(true);
    toast({
      title: "Carving Successful",
      description: "The diamond status has been updated to cut.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const updateDiamondStatus = (uniqueId, newStatus) => {
    // 直接更新钻石的状态
    setDiamonds((prevDiamonds) =>
      prevDiamonds.filter((d) => d.UniqueId !== uniqueId)
    );
  };
  return (
    <StyledContainer backgroundImage={gradingbg} pt="10%">
      <Table variant="simple" >
        <Thead>
          <Tr>
            <Th>cut Diamond</Th>
            <Th>Unique ID</Th>
            <Th>Company Number</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {diamonds.map((diamond) => (
            <Tr key={diamond.UniqueId}>
              <Td style={{ textAlign: 'center' }}>
                <Image src={diamondImage} boxSize="50px" objectFit="cover" />
              </Td>
              <Td style={{ textAlign: 'center' }}>{diamond.ProductId}</Td>
              <Td style={{ textAlign: 'center' }}>{diamond.UniqueId}</Td>
              <Td >
                <Button
                  colorScheme="teal"
                  size="sm"
                  onClick={() => handleCarvedClick(diamond)}
                >
                  Carved
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      </StyledContainer>

  );
}
