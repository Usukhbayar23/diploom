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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React from "react";
import { Layout } from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import { db } from "../utils/init-firebase";
import { collection, query, onSnapshot, doc } from "firebase/firestore";

export default function Profilepage() {
  const { currentUser } = useAuth();
  const [data, setData] = useState();

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

  const finalMap = data?.map((item) => {
    if (item.id === currentUser.uid) {
      return (
        <Box>
          {item.final >= 0 && item.final <= 25 && (
            <Text fontSize="2xl" fontWeight="bold">
              Таны интерфэйсийн нас:{" "}
              <Text color="green.500" display="inline">
                0-12
              </Text>
            </Text>
          )}
          {item.final > 25 && item.final <= 50 && (
            <Text fontSize="2xl" fontWeight="bold">
              Таны интерфэйсийн нас:{" "}
              <Text color="green.500" display="inline">
                12-30
              </Text>
            </Text>
          )}
          {item.final > 50 && item.final <= 75 && (
            <Text fontSize="2xl" fontWeight="bold">
              Таны интерфэйсийн нас:{" "}
              <Text display="inline" color="green.500">
                30-60
              </Text>
            </Text>
          )}
          {item.final > 75 && (
            <Text fontSize="2xl" fontWeight="bold">
              Таны интерфэйсийн нас:{" "}
              <Text display="inline" color="green.500">
                60+
              </Text>
            </Text>
          )}
        </Box>
      );
    }
  });

  const tables = data?.map((item) => {
    if (item.id === currentUser.uid) {
      return (
        <Box>
          <Table variant="simple">
            <TableCaption>Онооны задаргаа</TableCaption>
            <Thead>
              <Tr>
                <Th>1-р үе</Th>
                <Th>2-р үе</Th>
                <Th>3-р үе</Th>
                <Th>4-р үе</Th>
                <Th>5-р үе</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{item.final1}</Td>
                <Td>{item.final2}</Td>
                <Td>{item.final3}</Td>
                <Td>{item.final4}</Td>
                <Td>{item.final5}</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      );
    }
  });
  return (
    <Layout>
      <Container maxW="container.lg" py={4}>
        <Text>
          Тавтай морил{" "}
          <Text fontWeight="semibold" display="inline">
            {currentUser?.email}
          </Text>
        </Text>
        {(currentUser?.email === "d.usukhbayar2330@gmail.com") && (
          <Link to="/admin">
            <Button m="2">Админ панел</Button>
          </Link>
        )}
        <Box mt="20">{finalMap}</Box>
        <Box mt="10">{tables}</Box>
      </Container>
    </Layout>
  );
}
