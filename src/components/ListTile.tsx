import {
  Card,
  CardBody,
  CardFooter,
  HStack,
  IconButton,
  useDisclosure,
  Tooltip,
  Center,
  Flex,
  CardHeader,
  Heading,
} from "@chakra-ui/react";
import { Image, VStack, Text, Box, Link } from "@chakra-ui/react";
import { BookmarkStateEnum, IBookmark } from "../types/saves";
import { Link as ReactRouterLink } from "react-router-dom";
import {
  AiOutlineDelete,
  AiOutlineFolderOpen,
  AiOutlineUndo,
  AiOutlineForm,
} from "react-icons/ai";
import { CgNotes } from "react-icons/cg";
import { MdContentCopy } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";
import copy from "copy-text-to-clipboard";
import DeleteModal from "./views/saves/DeleteModal";
import ArchiveModal from "./views/saves/ArchiveModal";
import BookmarkAPI from "../api/BookmarkAPI";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../api/context/authContext";
import toast from "react-hot-toast";
import { BookmarkChangeContext } from "../api/context/bookmarkChangeContext";
import { formatAMPM } from "../helpers/utils";

interface PageProps {
  page: IBookmark;
}

// this component is being used in both 'save' and 'archive' page
export const ListTile: React.FC<PageProps> = ({ page }: PageProps) => {
  const { bookmarkChange, setBookmarkChange } = useContext(
    BookmarkChangeContext
  );

  const {
    isOpen: isDeleteModalOpen,
    onOpen: openDeleteModal,
    onClose: closeDeleteModal,
  } = useDisclosure();

  const {
    isOpen: isArchiveModalOpen,
    onOpen: openArchiveModal,
    onClose: closeArchiveModal,
  } = useDisclosure();

  const { mutate: deleteBookmark, isLoading: isDeleteModalLoading } =
    useMutation(BookmarkAPI.delBookmark);
  const { mutate: archiveBookmark, isLoading: isArchiveModalLoading } =
    useMutation(BookmarkAPI.archiveBookmark);
  const { mutate: restoreArchivedBookmark } = useMutation(
    BookmarkAPI.restoreArchivedBookmark
  );
  const { authToken } = useContext(AuthContext);

  const handleDelete = () => {
    deleteBookmark(
      {
        id: page.id,
        token: authToken.accessToken ?? "",
      },
      {
        onSuccess: () => {
          closeDeleteModal();
          toast.success("Url deleted!");
          // TODO @sb: propose a more elegant way to resolve this
          setBookmarkChange(!bookmarkChange);
        },
        onError: () => {
          toast.error("Error deleting url!");
        },
      }
    );
  };

  const handleArchive = () => {
    if (page.state === BookmarkStateEnum.ARCHIVED) {
      restoreArchivedBookmark(
        {
          id: page.id,
          token: authToken.accessToken ?? "",
        },
        {
          onSuccess: () => {
            closeArchiveModal();
            toast.success("Restored!");
            setBookmarkChange(!bookmarkChange);
          },
          onError: () => {
            toast.error("Error restoring bookmark!");
          },
        }
      );
    } else {
      archiveBookmark(
        {
          id: page.id,
          token: authToken.accessToken ?? "",
        },
        {
          onSuccess: () => {
            closeArchiveModal();
            toast.success("Archived!");
            setBookmarkChange(!bookmarkChange);
          },
          onError: () => {
            toast.error("Error archiving bookmark!");
          },
        }
      );
    }
  };

  const copyLink = (e: React.MouseEvent<HTMLElement>, link: string) => {
    e.preventDefault();
    copy(link);
    toast.success("Link copied!");
  };

  return (
    <>
      {/* DIALOGS HERE */}
      <DeleteModal
        handleDelete={handleDelete}
        closeModal={closeDeleteModal}
        isModalOpen={isDeleteModalOpen}
        isDeleteModalLoading={isDeleteModalLoading}
      />
      <ArchiveModal
        handleArchive={handleArchive}
        closeModal={closeArchiveModal}
        isModalOpen={isArchiveModalOpen}
        isArchiveModalLoading={isArchiveModalLoading}
        isArticleArchived={page.state === BookmarkStateEnum.ARCHIVED}
      />

      {/* Main component */}
      <Link
        sx={{
          textDecoration: "none",
          _hover: "none",
          _focus: "none",
          _active: "none",
          _visited: "none",
        }}
        href={`${page.link}`}
        isExternal
      >
        <Card
          border={"1px"}
          borderColor={"gray.100"}
          borderRadius="lg"
          boxShadow={"md"}
          width={"2xl"}
          my={"1"}
          _hover={{ bg: "#f7f7f7" }}
          _dark={{ _hover: { bg: "#718096" }, borderColor: "whiteAlpha.600" }}
        >
          {/* title */}
          <Tooltip
            label={page.title}
            borderRadius={4}
            hasArrow
            arrowSize={8}
            openDelay={300} // 0.3s delay
            placement="bottom-start"
          >
            <CardHeader pt={"2"} pb={"0"}>
              <Heading
                as="b"
                overflowWrap={"anywhere"}
                noOfLines={1}
                fontSize={"md"}
                w="90%"
              >
                {page.title}
              </Heading>
            </CardHeader>
          </Tooltip>
          <CardBody py={"1"}>
            {/* link */}
            <Text
              overflowWrap={"anywhere"}
              textOverflow={"ellipsis"}
              noOfLines={1}
              w="90%"
            >
              {page.link}
            </Text>
            {/* date */}
            <Text
              textStyle="cardBody"
              align="start"
              overflowWrap={"anywhere"}
              noOfLines={1}
              fontSize={"md"}
              color="grey"
            >
              {`${new Date(
                page.updatedAt || ""
              ).toLocaleDateString()}, ${formatAMPM(
                new Date(page.updatedAt || "")
              )}`}
            </Text>
          </CardBody>
        </Card>
      </Link>
    </>
  );
};
