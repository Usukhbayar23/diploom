import {
  Text,
  Container,
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  IconButton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React from "react";
import { Layout } from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import { db } from "../utils/init-firebase";
import {
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { Redirect } from "react-router-dom";
import { FaTrash, FaCaretUp, FaCaretDown } from "react-icons/fa";

export default function AdminDashboard() {
  const { currentUser } = useAuth();
  const [data, setData] = useState();
  const [open, setOpen] = useState();

  useEffect(() => {
    const q = query(collection(db, "onoo"));

    const unsub = onSnapshot(q, (querySnapshot) => {
      let tmpArray = [];
      querySnapshot.forEach((doc) => {
        tmpArray.push({ ...doc.data(), id: doc.id });
      });
      setData(tmpArray);
    });

    return () => {
      unsub();
    };
  }, []);

  const handeOpen = () => {
    setOpen(!open);
  };

  const deleteItem = (id) => {
    try {
      deleteDoc(doc(db, "onoo", id));
    } catch (e) {
      alert(e);
    }
  };

  const tables = data?.map((item) => {
    return (
      <Tr>
        <Td>{item.email}</Td>
        <Td>{item.initialAge}</Td>
        <Td>{item.final1}</Td>
        <Td>{item.final2}</Td>
        <Td>{item.final3}</Td>
        <Td>{item.final4}</Td>
        <Td>{item.final5}</Td>
        <Td>{item.final}</Td>
        <Td>
          <IconButton onClick={() => deleteItem(item.id)}>
            <FaTrash />
          </IconButton>
        </Td>
      </Tr>
    );
  });

  console.log(currentUser);

  if (
    currentUser?.email === "zagig35@gmail.com" ||
    currentUser?.email === "d.usukhbayar2330@gmail.com"
  ) {
    return (
      <Layout>
        <Container maxW="container.lg" py={4}>
          <Text fontWeight="bold" fontSize="lg">
            Админ Панел
          </Text>
          <Box mt="20">
            <Box>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>email</Th>
                    <Th>Оруулсан нас</Th>
                    <Th>1-р үе</Th>
                    <Th>2-р үе</Th>
                    <Th>3-р үе</Th>
                    <Th>4-р үе</Th>
                    <Th>5-р үе</Th>
                    <Th>Final</Th>
                    <Th>Устгах</Th>
                  </Tr>
                </Thead>
                <Tbody>{tables}</Tbody>
              </Table>
            </Box>
          </Box>
          <Box>
            <Button
              onClick={handeOpen}
              variant="ghost"
              my="5"
              rightIcon={open ? <FaCaretUp /> : <FaCaretDown />}
            >
              Онооны тайлбар харах
            </Button>
            {open && (
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>№</Th>
                      <Th>Насны ангилал</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>1</Td>
                      <Td>0-12</Td>
                    </Tr>
                    <Tr>
                      <Td>2</Td>
                      <Td>12-30</Td>
                    </Tr>
                    <Tr>
                      <Td>3</Td>
                      <Td>30-60</Td>
                    </Tr>
                    <Tr>
                      <Td>4</Td>
                      <Td>60+</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </Container>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <Container maxW="container.lg" py={4}>
          <Text>Админ биш байна</Text>
        </Container>
      </Layout>
    );
  }
}
