import {
  Box,
  HStack,
  IconButton,
  Spacer,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import Navlink from "./Navlink";
import { FaSignOutAlt } from "react-icons/fa";

export function Navbar() {
  const { toggleColorMode } = useColorMode();
  const { logout, currentUser } = useAuth();

  return (
    <Box bg={useColorModeValue("gray.100", "gray.700")} mb={4} py={4}>
      <HStack justifyContent="flex-end" maxW="90%" mx="auto" spacing={4}>
        <Navlink to="/" name="Ager App" size="lg" />
        <Spacer />
        {!currentUser && <Navlink to="/login" name="Нэвтрэх" />}
        {!currentUser && <Navlink to="/register" name="Бүртгүүлэх" />}
        {currentUser && <Navlink to="/about" name="Бидний тухай" />}
        {currentUser && <Navlink to="/contact" name="Холбоо барих" />}
        {currentUser && <Navlink to="/profile" name="Профайл" />}
        {currentUser && (
          <Navlink
            to="/logout"
            name={<FaSignOutAlt />}
            onClick={async (e) => {
              e.preventDefault();
              await logout();
            }}
          />
        )}
        <IconButton
          variant="ghost"
          icon={useColorModeValue(<FaSun />, <FaMoon />)}
          onClick={toggleColorMode}
          aria-label="toggle-dark-mode"
        />
      </HStack>
    </Box>
  );
}
