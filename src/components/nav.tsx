import { React } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  Icon,
  Popover,
  PopoverTrigger
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import NextAuth from './nextAuth';
import { useSession } from 'next-auth/client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

const Links = ['Home', 'Projects',];

const NavLink = ({ children }: { children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('orange.200', 'orange.700'),
    }}
    href={children === "Home" ? "/" : `/${children.toLowerCase()}`}
  >
    {children}
  </Link>
);

const loggedOutIcon = () => {
  return <FontAwesomeIcon icon={faUserCircle} size='2x' />
}

export default function Nav() {
  const [session, loading] = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <nav>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Popover
              placement="bottom"
              closeOnBlur={false}
            >
              <PopoverTrigger>
                <Button
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}>
                  {
                    session ?
                      session.user.image ?
                        <Avatar
                          name={session.user.name}
                          size={'sm'}
                          src={session.user.image}
                        />
                        :
                        <Icon as={loggedOutIcon} />
                      :
                      <Icon as={loggedOutIcon} />
                  }
                </Button>
              </PopoverTrigger>
              <NextAuth />
            </Popover>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </nav>
  );
}