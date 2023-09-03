import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Tiptap from "../../components/TipTap";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../api/context/authContext";
import { IBookmark, BookmarkStateEnum } from "../../types/saves";
import { useQuery } from "@tanstack/react-query";
import BookmarkAPI from "../../api/BookmarkAPI";
import { EditorCardPreview } from "../../components/EditorCardPreview";

const EditorPage = () => {
  const { id } = useParams();
  const { authToken } = useContext(AuthContext);
  const [bookmarkData, setbookmarkData] = useState<IBookmark>({
    state: BookmarkStateEnum.AVAILABLE,
    id: "",
    link: "",
    domain: "",
    color: "",
    image: "",
    title: "",
  });
  const bearerToken = authToken.accessToken ?? "";

  // get bookmark data
  const { data: fetchedData } = useQuery({
    queryKey: [id],
    queryFn: (): Promise<IBookmark> => {
      return BookmarkAPI.getBookmarkById({
        id: id,
        token: authToken.accessToken ?? "",
      });
    },
    retry: false,
  });

  useEffect(() => {
    if (fetchedData) {
      setbookmarkData(fetchedData);
    }
  }, [fetchedData]);

  return (
    <Box
      mx="auto"
      maxWidth={{
        base: "75%",
        "2xl": "75%",
      }}
    >
      {/* preview */}
      <Box>
        <EditorCardPreview page={bookmarkData} />
      </Box>

      <Box
        my="2"
        border="1px"
        borderColor="gray.200"
        borderRadius={"10"}
        boxShadow="md"
      >
        {/* note */}
        <Tiptap bookmarkId={id} bearerToken={bearerToken} />
      </Box>
    </Box>
  );
};

export default EditorPage;
