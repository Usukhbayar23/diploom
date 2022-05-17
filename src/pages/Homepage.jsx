import { Text, Button, Box } from "@chakra-ui/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout } from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";

export default function Homepage() {
  const { currentUser } = useAuth();

  return (
    <Layout>
      <Text
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        fontSize={{ md: "6xl", base: "4xl" }}
        fontWeight="extrabold"
      >
        Бид таны насанд тохирсон тав тухтай үйлчилгээг үзүүлнэ
      </Text>
      {!currentUser && (
        <Button
          as={Link}
          to="/login"
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          mt="10"
        >
          Нэвтрэх
        </Button>
      )}
      {currentUser && (
        <Box
          display="flex"
          flexDir="column"
          alignItems="center"
          mt="10"
          border="2px"
          p="4"
          borderColor="gray.200"
          borderRadius="10"
        >
          <Text fontSize="3xl" fontWeight="black">
            Тоглоомийг эхлүүлэх үү?
          </Text>
          <Text fontSize="lg" fontWeight="light" p="5">
            <Text display="inline" fontWeight="semibold">
              Тоглоомын тайлбар:
            </Text>{" "}
            Энэхүү даалгаварууд нь хүн компьютерийн харилцаандээр тулгуурлан
            бэлтгэгдсэн ба та дараах таван алхам бүхий даалгаврыг биелүүлснээр
            таны насыг тогтоох болно.
          </Text>
          <Link to="/game">
            <Button
              colorScheme="green"
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              Эхлэх
            </Button>
          </Link>
        </Box>
      )}
    </Layout>
  );
}
