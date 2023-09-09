import { useState, useContext } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useBreakpointValue,
  Flex,
  Spacer,
  Tooltip,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Link } from "react-router-dom";
import InputSave from "./common/Form/InputSave";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { AuthContext } from "../api/context/authContext";
import { useNavigate } from "react-router-dom";
import { ProfileManagementIcon } from "./ProfileManagementIcon";

const NavLinks = [
  {
    requireAuth: true,
    name: "Home",
    path: "/home",
  },
  {
    requireAuth: true,
    name: "Saves",
    path: "/saves",
  },
  {
    requireAuth: true,
    name: "Archives",
    path: "/archives",
  },
  // {
  // requireAuth: true,
  //   name: "My Stats",
  //   path: "/stats",
  // },
];

export const Navbar = () => {
  const { authToken } = useContext(AuthContext);
  const [showUrlInput, setShowUrlInput] = useState(false);

  const toggleUrlInput = () => {
    setShowUrlInput(!showUrlInput);
  };

  const isDesktop = useBreakpointValue({
    base: false,
    sm: false,
    md: false,
    lg: true,
    xl: true,
  });

  return (
    <Box as="nav" py={{ base: "1", md: "1" }} boxShadow="sm">
      {/* Desktop View */}
      {isDesktop ? (
        <Flex width="90%" mx="auto">
          {/* First button group: Menus */}
          <ButtonGroup
            variant="text"
            spacing={{
              base: 2,
              lg: 2,
              xl: 4,
              "2xl": 8,
            }}
          >
            {/* hide nav menus if they require auth and user is not logged in */}
            {NavLinks.map((item) =>
              item.requireAuth && !authToken.accessToken ? (
                <></>
              ) : (
                <Button
                  fontSize="md"
                  fontWeight="bold"
                  key={item.name}
                  as={Link}
                  to={item.path}
                  variant="ghost"
                >
                  {item.name}
                </Button>
              )
            )}
          </ButtonGroup>

          <Spacer />

          {/* Second button group: add url/ log in buttons */}
          <ButtonGroup variant="text" spacing={"4"}>
            {/* add url input bar */}
            {authToken.accessToken && (
              <Box>
                {showUrlInput ? (
                  <HStack>
                    <InputSave setShowUrlInput={setShowUrlInput} />
                    <IconButton
                      variant="ghost"
                      sx={{
                        borderRadius: "50%",
                      }}
                      aria-label="hide url input"
                      onClick={toggleUrlInput}
                      icon={<CloseIcon />}
                    />
                  </HStack>
                ) : (
                  <Box>
                    <Button
                      onClick={toggleUrlInput}
                      variant="fancy"
                      rightIcon={<AddIcon />}
                    >
                      Add url
                    </Button>
                  </Box>
                )}
              </Box>
            )}

            {/* Sign in/ out */}

            <ProfileManagementIcon />

            {/* Light/dark mode */}
            <ColorModeSwitcher />
          </ButtonGroup>
        </Flex>
      ) : (
        // Mobile View
        <HStack>
          <Menu>
            <MenuButton
              as={IconButton}
              variant="tertiary"
              icon={<FiMenu fontSize="1.25rem" />}
              aria-label="Open Menu"
            />
            <MenuList>
              <MenuItem minH="48px" as={Link} to="/home">
                Home
              </MenuItem>
              <MenuItem minH="48px" as={Link} to="/saves">
                Saves
              </MenuItem>
              <MenuItem minH="48px" as={Link} to="/archives">
                Archives
              </MenuItem>
              <MenuItem minH="48px">Login/Logout</MenuItem>
            </MenuList>
          </Menu>
          <HStack justifyContent="flex-end">
            <Popover>
              <PopoverTrigger>
                <Button
                  onClick={toggleUrlInput}
                  variant="fancy"
                  rightIcon={<AddIcon />}
                >
                  Add url
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <InputSave setShowUrlInput={setShowUrlInput} />
              </PopoverContent>
            </Popover>
          </HStack>
        </HStack>
      )}
    </Box>
  );
};
