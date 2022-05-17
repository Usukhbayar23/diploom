import {
  Text,
  Container,
  Box,
  Button,
  Divider,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  useColorModeValue,
  Grid,
  Image,
  Textarea,
  chakra,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useToast,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { Layout } from "../components/Layout";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { JigsawPuzzle } from "react-jigsaw-puzzle/lib";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";
import { useAuth } from "../contexts/AuthContext";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import { db } from "../utils/init-firebase";
// import objectDetectionSketch from "../components/ObjectDetectionSketch";
// import { ReactP5Wrapper } from "react-p5-wrapper";

export default function Game() {
  const [stage, setStage] = useState(0);
  const [op, setOp] = useState();
  const [selectedFontSize, setSelectedFontSize] = useState(12);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  const [puzzleFinished, setPuzzleFinished] = useState(false);
  const [final, setFinal] = useState(0);
  const [initialAge, setInitialAge] = useState(0);
  const toast = useToast();

  //

  const [color, setColor] = useState();

  var arr = [];
  arr = [
    "#550E1E",
    "#909497",
    "#351576",
    "#16460C",
    "#0B0D1C",
    "#D08A95",
    "#04529A",
    "#E27614",
    "#92071C",
    "#E8AF17",
    "#F0EFF4",
  ];

  //

  // Type

  const [typedWord, setTypedWord] = useState();
  const [isActive2, setIsActive2] = useState(false);
  const [isPaused2, setIsPaused2] = useState(true);
  const [finished2, setFinished2] = useState(false);
  const [time2, setTime2] = useState(0);

  var correctLetters = 0,
    wrongLetters = 0;
  // const [activeWordIndex, setActiveWordIndex] = useState(0);
  const willBeTyped =
    "Боломжгүй зүйл гэж үгүй";
  const letters = useRef("");

  useEffect(() => {
    letters.current = typedWord?.split("").map((letter, index) => {
      if (letter === willBeTyped[index]) {
        correctLetters++;

        return (
          <chakra.p display="inline" color="green">
            {letter}
          </chakra.p>
        );
      } else {
        wrongLetters++;
        return (
          <chakra.p display="inline" color="red">
            {letter}
          </chakra.p>
        );
      }
    });

    if (typedWord?.length === willBeTyped.length) {
      setIsActive2(false);
      setIsPaused2(true);
      setFinished2(true);
    }
  }, [typedWord]);

  useEffect(() => {
    let interval = null;

    if (isActive2 && isPaused2 === false) {
      interval = setInterval(() => {
        setTime2((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive2, isPaused2]);

  const handleStart2 = () => {
    setIsActive2(true);
    setIsPaused2(false);
  };

  const handlePauseResume2 = () => {
    setIsPaused2(!isPaused2);
  };

  const handleReset2 = () => {
    setIsActive2(false);
    setTime2(0);
  };

  // Type tugsgul
  const [final1, setFinal1] = useState(0);
  const [final2, setFinal2] = useState(0);
  const [final3, setFinal3] = useState(0);
  const [final4, setFinal4] = useState(0);
  const [final5, setFinal5] = useState(0);

  console.log(initialAge);

  const HandleStage = () => {
    setStage(stage + 1);
  };

  const HandleStage2 = () => {
    setStage(stage - 1);
  };

  React.useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  const bgColor = useColorModeValue("gray.100", "gray.700");

  const [finalAge, setFinalAge] = useState(0);

  const CalculateResult = () => {
    const final1 = (selectedFontSize * 100) / 48;
    var newTime = Math.floor((time2 / 1000) % 60);
    const final2 = ((willBeTyped.length / newTime) * 100) / 60;
    var final3;
    switch (color) {
      case "#550E1E":
        final3 = 10;
        break;
      case "#909497":
        final3 = 20;
        break;
      case "#351576":
        final3 = 30;
        break;
      case "#16460C":
        final3 = 40;
        break;
      case "#0B0D1C":
        final3 = 50;
        break;
      case "#D08A95":
        final3 = 60;
        break;
      case "#04529A":
        final3 = 70;
        break;
      case "#E27614":
        final3 = 80;
        break;
      case "#92071C":
        final3 = 90;
        break;
      case "#E8AF17":
        final3 = 100;
        break;
      case "#F0EFF4":
        final3 = 110;
        break;
      default:
        final3 = 0;
    }
    var final4;
    if (op === 1) {
      final4 = 25;
    } else if (op === 2) {
      final4 = 50;
    } else if (op === 3) {
      final4 = 75;
    } else if (op === 4) {
      final4 = 100;
    }

    const final5 = Math.floor((time / 1000) % 60);

    const final = (final1 + final2 + final3 + final4 + final5) / 5;

    console.log(final, final1, final2, final3, final4, final5, finalAge);

    setFinal(Math.floor(final));
    setFinal1(Math.floor(final1));
    setFinal2(Math.floor(final2));
    setFinal3(Math.floor(final3));
    setFinal4(Math.floor(final4));
    setFinal5(Math.floor(final5));
  };

  const { currentUser } = useAuth();

  const sendData = () => {
    try {
      setDoc(doc(db, "onoo", currentUser?.uid), {
        initialAge: initialAge,
        final: final,
        final1: final1,
        final2: final2,
        final3: final3,
        final4: final4,
        final5: final5,
        email: currentUser?.email,
      });
      showToast();
    } catch (e) {
      alert(e);
    }
  };

  const showToast = () => {
    toast({
      title: "Амжилттай",
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "left-accent",
      position: "top-right",
    });
  };

  return (
    <Layout>
      <Container
        maxW="container.lg"
        py={4}
        border="2px"
        borderColor="gray.200"
        borderRadius="10"
        display="flex"
        flexDir="column"
        alignItems="center"
      >
        {stage === 0 && (
          <Box>
            <Text>Нас:</Text>
            <Input
              type="number"
              onChange={(e) => setInitialAge(e.target.value)}
            />
          </Box>
        )}
        {stage < 6 && stage !== 0 && (
          <Box w="100%" display="flex" justifyContent="space-evenly">
            <Button
              bg={stage === 1 ? "green.500" : "gray.100"}
              color={stage === 1 ? "white" : "black"}
            >
              1
            </Button>
            <Button
              bg={stage === 2 ? "green.500" : "gray.100"}
              color={stage === 2 ? "white" : "black"}
            >
              2
            </Button>
            <Button
              bg={stage === 3 ? "green.500" : "gray.100"}
              color={stage === 3 ? "white" : "black"}
            >
              3
            </Button>
            <Button
              bg={stage === 4 ? "green.500" : "gray.100"}
              color={stage === 4 ? "white" : "black"}
            >
              4
            </Button>
            <Button
              bg={stage === 5 ? "green.500" : "gray.100"}
              color={stage === 5 ? "white" : "black"}
            >
              5
            </Button>
          </Box>
        )}
        <Divider my="5" w="80%" />
        {stage === 1 && (
          <Box>
            <Text fontSize="xl" fontWeight="bold" mb="10">
            Та доорх үсгийн хэмжээнээс өөрийн харж чадах хамгийн бага хэмжээ дээр тааруулна уу
            </Text>
            <Box w="100%" display="flex">
              <Box flex="1">
                <Slider
                  aria-label="slider-ex-3"
                  defaultValue={12}
                  max={48}
                  min={2}
                  orientation="vertical"
                  minH="64"
                  onChange={setSelectedFontSize}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Box>
              <Box flex="4">
                <Box
                  bg={bgColor}
                  w="90%"
                  fontSize={selectedFontSize}
                  borderRadius="10"
                >
                  <Text p="4">
                    Таны сонгосон үсгийн хэмжээ ингэж харагдаж байна .
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        )}

        {stage === 2 && (
          <Box>
            <Box display="flex" flexDir="column" alignItems="center">
              <Text Text fontSize="xl" fontWeight="bold" mb="5">
                Энэхүү өгүүлбэрийг хамгийн хурданаараа бичнэ үү?
              </Text>
              <Box display="flex">
                <Box
                  p="5"
                  boxShadow="base"
                  borderRadius="10"
                  mb="4"
                  bg={finished2 ? "green" : "white"}
                  color={finished2 ? "white" : "gray.700"}
                >
                  <Text>{Math.floor((time2 / 1000) % 60)}</Text>
                </Box>
              </Box>

              <Box
                p="4"
                bg={bgColor}
                // bg="gray.100"
                w={{ md: "80%", base: "96%" }}
                borderRadius="10"
              >
                {willBeTyped}
                <Divider py="2" />
                {letters.current}
              </Box>

              <Textarea
                value={typedWord}
                // value={letters.current}
                w={{ md: "80%", base: "96%" }}
                mt="5"
                px="4"
                border="2px"
                placeholder="Энд дарж эхлүүл"
                onChange={(e) => setTypedWord(e.target.value)}
                onFocus={handleStart2}
                disabled={finished2}
              />
            </Box>
          </Box>
        )}

        {stage === 3 && (
          <Box>
            <Text fontSize="xl" fontWeight="bold" mb="10">
              Өөрт таатай санагдсан өнгийг сонгоно уу?
            </Text>
            <Box textAlign="center">
              <Box>
                {arr.map((e) => {
                  return (
                    <Button
                      bg={e}
                      m="2"
                      _hover={{ bg: { e } }}
                      onClick={() => setColor(e)}
                    ></Button>
                  );
                })}
              </Box>
              {color && (
                <Box>
                  <Text fontSize="xl" fontWeight="light" mt="4">
                    Таны сонгосон өнгө:{" "}
                  </Text>
                  <Box w="100%" h="20vh" bg={color}></Box>
                </Box>
              )}
            </Box>
          </Box>
        )}

        {stage === 4 && (
          <Box>
            <Text fontSize="xl" fontWeight="bold" mb="10">
              Доорх интерфейсээс ашиглахад тохиромжтой гэж бодсон интерфейсийг
              сонгоно уу?
            </Text>
            <Grid
              templateColumns={{ md: "repeat(2, 1fr)", base: "repeat(1, 1fr)" }}
              gap={6}
            >
              <Box
                onClick={() => {
                  setOp(1);
                }}
                bg={op === 1 ? "green.500" : "transparent"}
                p="1"
              >
                <Image
                  src="https://www.howtogeek.com/wp-content/uploads/2021/10/winxp_hero_3.jpg?height=200p&trim=2,2,2,2"
                  loading="lazy"
                />
              </Box>
              <Box
                onClick={() => {
                  setOp(2);
                  console.log(op);
                }}
                bg={op === 2 ? "green.500" : "transparent"}
                p="1"
              >
                <Image
                  loading="lazy"
                  src="https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc3/Windows_7.png"
                />
              </Box>
              <Box
                onClick={() => {
                  setOp(3);
                  console.log(op);
                }}
                bg={op === 3 ? "green.500" : "transparent"}
                p="1"
              >
                <Image
                  loading="lazy"
                  src="https://cdn.vox-cdn.com/thumbor/9NFahw6OCpbmhhT-jr3fLbU2kvA=/0x0:1920x1080/1200x0/filters:focal(0x0:1920x1080):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/3913062/Screenshot__40_.0.png"
                />
              </Box>
              <Box
                onClick={() => {
                  setOp(4);
                  console.log(op);
                }}
                bg={op === 4 ? "green.500" : "transparent"}
                p="1"
              >
                <Image
                  loading="lazy"
                  src="https://blogs.windows.com/wp-content/uploads/prod/sites/2/2021/06/WIN_Start_GenZ_Light_16x10_en-US-1024x640.png"
                />
              </Box>
            </Grid>
          </Box>
        )}
        {stage === 5 && (
          <Box textAlign="center" w={{ base: "100%", md: "70%" }}>
            <Text fontSize="xl" fontWeight="bold" mb="10">
              Доорх дүрсийг эвлүүлнэ үү:{" "}
              <Text
                color={puzzleFinished ? "green.500" : "black"}
                fontSize={puzzleFinished ? "4xl" : "lg"}
              >
                {Math.floor((time / 1000) % 60)}
              </Text>
            </Text>

            <Box h="100%" w="100%" border="2px" borderColor="green">
              <JigsawPuzzle
                imageSrc="https://images.pexels.com/photos/19677/pexels-photo.jpg?cs=srgb&dl=pexels-miguel-%C3%A1-padri%C3%B1%C3%A1n-19677.jpg&fm=jpg"
                rows={3}
                columns={3}
                onSolved={() => {
                  handlePauseResume();
                  setPuzzleFinished(true);
                }}
                className="jigsaw-puzzle"
              />
            </Box>
          </Box>
        )}
        {stage === 6 && (
          <Box display="flex" flexDir="column" alignItems="center" w="90%">
            <Text fontSize="xl" fontWeight="bold" mb="10">
              Дүн
            </Text>
            <Box
              display="flex"
              w="100%"
              flexDir={{ md: "row", base: "column" }}
            >
              <TableContainer flex="1">
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
              <Box flex="1">
                {final >= 0 && final <= 25 && (
                  <Text fontSize="2xl" fontWeight="bold">
                    Таны интерфейсийн нас:{" "}
                    <Text color="green.500" display="inline">
                      0-12
                    </Text>
                  </Text>
                )}
                {final > 25 && final <= 50 && (
                  <Text fontSize="2xl" fontWeight="bold">
                    Таны интерфейсийн нас:{" "}
                    <Text color="green.500" display="inline">
                      12-30
                    </Text>
                  </Text>
                )}
                {final > 50 && final <= 75 && (
                  <Text fontSize="2xl" fontWeight="bold">
                    Таны интерфейсийн нас:{" "}
                    <Text display="inline" color="green.500">
                      30-60
                    </Text>
                  </Text>
                )}
                {final > 75 && (
                  <Text fontSize="2xl" fontWeight="bold">
                    Таны интерфейсийн нас:{" "}
                    <Text display="inline" color="green.500">
                      60+
                    </Text>
                  </Text>
                )}
                <Button colorScheme="green" m="6" onClick={sendData}>
                  Хадгалах
                </Button>
              </Box>
            </Box>
          </Box>
        )}

        <Box display="flex">
          {stage > 1 && stage < 6 && (
            <Button
              leftIcon={<FaArrowLeft />}
              mt="10"
              onClick={HandleStage2}
              mr="2"
            >
              Өмнөх үе
            </Button>
          )}
          {stage < 5 && (
            <Button
              rightIcon={<FaArrowRight />}
              mt="10"
              colorScheme="green"
              onClick={() => {
                HandleStage();
                stage === 4 && handleStart();
                stage === 2 && handlePauseResume2();
              }}
            >
              Дараагын үе
            </Button>
          )}

          {stage === 5 && (
            <Button
              mt="10"
              colorScheme="green"
              onClick={() => {
                HandleStage();
                CalculateResult();
              }}
            >
              Дуусгах
            </Button>
          )}
        </Box>
      </Container>
    </Layout>
  );
}
