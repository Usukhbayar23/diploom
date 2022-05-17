import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Layout } from "../components/Layout";

export default function About() {
  return (
    <Layout>
      <Box>
        <Text fontSize="3xl" fontWeight="bold" mt="10">
          Бидний тухай
        </Text>
        <Text mt="30" fontWeight="light" fontSize={"2xl"}>
        Мэдээллийн технологи хөтөлбөрийн 4 - р түвшний оюутан Дашням овогтой Өсөхбаяр
миний бие Бакалаврын судалгааны ажлын төлөвлөгөөний дагуу өөрийн сонгож авсан ” User’s age level classification based on their actions
буюу Хэрэглэгчийн интерфейстэй харилцах үйлдлээс хэрэглэгчийн насыг тодорхойлох веб
” ийг 15 долоо хоногийн хугацаанд хийн гүйцэтгэж байгаа бөгөөд энэ хугацаандаа сонгосон
сэдвийнхээ талаарх судалгаа , адил төстэй систем , ашиглагдах технологи ,зохиомж гэх мэт
бүхий л үйл ажиллагааг эхнээс нь хийн гүйцэтгэж байна.

        </Text>
      </Box>
    </Layout>
  );
}
