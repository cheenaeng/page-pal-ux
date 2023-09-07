/* eslint-disable import/no-anonymous-default-export */
// react
import {
  Button,
  Box,
  IconButton,
  Wrap,
  HStack,
  Tooltip,
  Text,
  Select,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Icon,
  Center,
} from "@chakra-ui/react";

// icons
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineStrikethrough,
  AiOutlineLine,
  AiOutlineUnderline,
  AiOutlineCheckSquare,
  AiOutlineLink,
} from "react-icons/ai";
import {
  MdFormatAlignLeft,
  MdFormatAlignRight,
  MdFormatAlignCenter,
  MdFormatAlignJustify,
  MdFormatQuote,
  MdUndo,
  MdRedo,
} from "react-icons/md";
import { GoListOrdered, GoListUnordered } from "react-icons/go";
import { BsFileEarmarkBreak } from "react-icons/bs";
import { HiOutlineCode } from "react-icons/hi";
import { BiParagraph } from "react-icons/bi";
import { BiCodeBlock } from "react-icons/bi";

import { BubbleMenu } from "@tiptap/react";

// custom
import { ChevronDownIcon } from "@chakra-ui/icons";

const EditorBubbleMenu = ({ editor }: any) => {
  if (!editor) {
    return null;
  }

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{
        duration: 100,
        maxWidth: "none",
        theme: "light",
      }}
    >
      <HStack
        shadow={"md"}
        className="menububble"
        border={"1px"}
        borderColor={"gray.100"}
        borderRadius={"4px"}
        _dark={{ borderColor: "whiteAlpha.400" }}
      >
        <Menu autoSelect={false}>
          <MenuButton
            variant="ghost"
            px={"2"}
            borderRadius={"0"}
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            Text
          </MenuButton>
          <MenuList maxHeight={"sm"} overflowY={"scroll"}>
            {/**************
             * TEXT
             ***************/}
            <MenuGroup title="Text">
              {/* paragraph */}
              <MenuItem
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={editor.isActive("paragraph") ? "is-active" : ""}
              >
                <HStack>
                  <Icon
                    border={"1px"}
                    borderTopColor={"gra"}
                    borderColor={"blackAlpha.400"}
                    borderRadius={"3"}
                    boxSize={"5"}
                    as={BiParagraph}
                  />
                  <Text> Paragraph </Text>
                </HStack>
              </MenuItem>
              {/* h1 heading */}
              <MenuItem
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={
                  editor.isActive("heading", { level: 1 }) ? "is-active" : ""
                }
              >
                <HStack>
                  <Text
                    border={"1px"}
                    borderColor={"blackAlpha.400"}
                    borderRadius={"3"}
                    boxSize={"5"}
                    fontSize={"sm"}
                  >
                    H1
                  </Text>
                  <Text> Heading 1 </Text>
                </HStack>
              </MenuItem>
              {/* h2 heading */}
              <MenuItem
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={
                  editor.isActive("heading", { level: 2 }) ? "is-active" : ""
                }
              >
                <HStack>
                  <Text
                    border={"1px"}
                    borderColor={"blackAlpha.400"}
                    borderRadius={"3"}
                    boxSize={"5"}
                    fontSize={"sm"}
                  >
                    H2
                  </Text>
                  <Text> Heading 2 </Text>
                </HStack>
              </MenuItem>
              {/* h3 heading */}
              <MenuItem
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={
                  editor.isActive("heading", { level: 3 }) ? "is-active" : ""
                }
              >
                <HStack>
                  <Text
                    border={"1px"}
                    borderColor={"blackAlpha.400"}
                    borderRadius={"3"}
                    boxSize={"5"}
                    fontSize={"sm"}
                  >
                    H3
                  </Text>
                  <Text> Heading 3 </Text>
                </HStack>
              </MenuItem>
              {/* h4 heading */}
              <MenuItem
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 4 }).run()
                }
                className={
                  editor.isActive("heading", { level: 4 }) ? "is-active" : ""
                }
              >
                <HStack>
                  <Text
                    border={"1px"}
                    borderColor={"blackAlpha.400"}
                    borderRadius={"3"}
                    boxSize={"5"}
                    fontSize={"sm"}
                  >
                    H4
                  </Text>
                  <Text> Heading 4 </Text>
                </HStack>
              </MenuItem>

              {/* quote */}
              <MenuItem
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive("blockquote") ? "is-active" : ""}
              >
                <HStack>
                  <Icon
                    border={"1px"}
                    borderColor={"blackAlpha.400"}
                    borderRadius={"3"}
                    boxSize={"5"}
                    as={MdFormatQuote}
                  />
                  <Text> Quote</Text>
                </HStack>
              </MenuItem>

              {/* code */}
              <MenuItem
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={editor.isActive("codeBlock") ? "is-active" : ""}
              >
                <HStack>
                  <Icon
                    border={"1px"}
                    borderColor={"blackAlpha.400"}
                    borderRadius={"3"}
                    boxSize={"5"}
                    as={BiCodeBlock}
                  />
                  <Text> Code block</Text>
                </HStack>
              </MenuItem>

              {/**************
               * LIST
               ***************/}
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="List">
              {/* to do list */}
              <MenuItem
                onClick={() => editor.chain().focus().toggleTaskList().run()}
                className={editor.isActive("taskList") ? "is-active" : ""}
              >
                <HStack>
                  <Icon
                    border={"1px"}
                    borderColor={"blackAlpha.400"}
                    borderRadius={"3"}
                    boxSize={"5"}
                    as={AiOutlineCheckSquare}
                  />
                  <Text> To-do list</Text>
                </HStack>
              </MenuItem>
              {/* bullet */}
              <MenuItem
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive("bulletList") ? "is-active" : ""}
              >
                <HStack>
                  <Icon
                    border={"1px"}
                    borderColor={"blackAlpha.400"}
                    borderRadius={"3"}
                    boxSize={"5"}
                    as={GoListUnordered}
                  />
                  <Text> Bulleted list</Text>
                </HStack>
              </MenuItem>
              {/* numbered */}
              <MenuItem
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive("orderedList") ? "is-active" : ""}
              >
                <HStack>
                  <Icon
                    border={"1px"}
                    borderColor={"blackAlpha.400"}
                    borderRadius={"3"}
                    boxSize={"5"}
                    as={GoListOrdered}
                  />
                  <Text>Numbered list</Text>
                </HStack>
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="Others">
              {/* divider */}
              <MenuItem
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
              >
                <HStack>
                  <Icon
                    border={"1px"}
                    borderColor={"blackAlpha.400"}
                    borderRadius={"3"}
                    boxSize={"5"}
                    as={AiOutlineLine}
                  />
                  <Text> Divider</Text>
                </HStack>
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
        {/*
         * ALIGNMENT
         */}
        <Menu>
          <MenuButton
            // _hover={{ bgColor: "gray" }}
            // variant={"unstyled"}
            variant="ghost"
            px={"2"}
            borderRadius={"0"}
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            <Icon boxSize={"5"} as={MdFormatAlignJustify} />
          </MenuButton>
          <MenuList>
            {/* align left */}
            <MenuItem
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              className={
                editor.isActive({ textAlign: "left" }) ? "is-active" : ""
              }
            >
              <HStack>
                <Icon
                  border={"1px"}
                  borderColor={"blackAlpha.400"}
                  borderRadius={"3"}
                  boxSize={"5"}
                  as={MdFormatAlignLeft}
                />
                <Text> Align left</Text>
              </HStack>
            </MenuItem>
            {/* align center */}
            <MenuItem
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              className={
                editor.isActive({ textAlign: "center" }) ? "is-active" : ""
              }
            >
              <HStack>
                <Icon
                  border={"1px"}
                  borderColor={"blackAlpha.400"}
                  borderRadius={"3"}
                  boxSize={"5"}
                  as={MdFormatAlignCenter}
                />
                <Text> Align center</Text>
              </HStack>
            </MenuItem>
            {/* align right */}
            <MenuItem
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              className={
                editor.isActive({ textAlign: "right" }) ? "is-active" : ""
              }
            >
              <HStack>
                <Icon
                  border={"1px"}
                  borderColor={"blackAlpha.400"}
                  borderRadius={"3"}
                  boxSize={"5"}
                  as={MdFormatAlignRight}
                />
                <Text> Align right</Text>
              </HStack>
            </MenuItem>
            {/* justify */}
            <MenuItem
              onClick={() =>
                editor.chain().focus().setTextAlign("justify").run()
              }
              className={
                editor.isActive({ textAlign: "justify" }) ? "is-active" : ""
              }
            >
              <HStack>
                <Icon
                  border={"1px"}
                  borderColor={"blackAlpha.400"}
                  borderRadius={"3"}
                  boxSize={"5"}
                  as={MdFormatAlignJustify}
                />
                <Text> Justify</Text>
              </HStack>
            </MenuItem>
          </MenuList>
        </Menu>
        <HStack borderRadius={"0"}>
          {/* <Button
            borderRadius={"0"}
            variant="ghost"
            aria-label="link"
            leftIcon={<AiOutlineLink size={18} />}
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            className={editor.isActive("code") ? "is-active" : ""}
          >
            Link
          </Button> */}
        </HStack>

        {/*
         * STYLE
         */}
        <HStack borderRadius={"0"}>
          {/* bold */}
          <Tooltip label="Bold" placement="bottom">
            <IconButton
              variant="ghost"
              borderRadius={"0"}
              aria-label="bold"
              icon={<AiOutlineBold size={18} />}
              name="archive-action"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "is-active" : ""}
              disabled={!editor.can().chain().focus().toggleBold().run()}
            />
          </Tooltip>
          {/* italic */}
          <Tooltip label="Italic" placement="bottom">
            <IconButton
              borderRadius={"0"}
              variant="ghost"
              aria-label="italic"
              icon={<AiOutlineItalic size={18} />}
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "is-active" : ""}
            />
          </Tooltip>
          {/* underline */}
          <Tooltip label="Underline" placement="bottom">
            <IconButton
              borderRadius={"0"}
              variant="ghost"
              aria-label="italic"
              icon={<AiOutlineUnderline size={18} />}
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={editor.isActive("underline") ? "is-active" : ""}
            />
          </Tooltip>
          {/* strikethrough */}
          <Tooltip label="Strike through" placement="bottom">
            <IconButton
              borderRadius={"0"}
              variant="ghost"
              aria-label="italic"
              icon={<AiOutlineStrikethrough size={18} />}
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={!editor.can().chain().focus().toggleStrike().run()}
              className={editor.isActive("strike") ? "is-active" : ""}
            />
          </Tooltip>
          {/* code */}
          <Tooltip label="Code" placement="bottom">
            <IconButton
              borderRadius={"0"}
              variant="ghost"
              aria-label="code"
              icon={<HiOutlineCode size={18} />}
              onClick={() => editor.chain().focus().toggleCode().run()}
              disabled={!editor.can().chain().focus().toggleCode().run()}
              className={editor.isActive("code") ? "is-active" : ""}
            />
          </Tooltip>
        </HStack>
      </HStack>
    </BubbleMenu>
  );
};

export default EditorBubbleMenu;
