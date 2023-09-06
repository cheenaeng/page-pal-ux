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
      tippyOptions={{ duration: 100, maxWidth: "none" }}
    >
      <HStack shadow={"md"}>
        <Menu>
          <MenuButton
            _hover={{ bgColor: "gray" }}
            fontStyle={"normal"}
            variant={"unstyled"}
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
              <MenuItem>
                <HStack
                  aria-label="paragraph"
                  onClick={() => editor.chain().focus().setParagraph().run()}
                  className={editor.isActive("paragraph") ? "is-active" : ""}
                >
                  <Icon
                    border={"1px"}
                    borderRadius={"4"}
                    boxSize={"5"}
                    as={BiParagraph}
                  />
                  <Text> Paragraph </Text>
                </HStack>
              </MenuItem>
              {/* h1 heading */}
              <MenuItem>
                <HStack
                  aria-label="heading-h1"
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                  className={
                    editor.isActive("heading", { level: 1 }) ? "is-active" : ""
                  }
                >
                  <Text
                    border={"1px"}
                    borderRadius={"4"}
                    boxSize={"5"}
                    fontSize={"sm"}
                  >
                    H1
                  </Text>
                  <Text> Heading 1 </Text>
                </HStack>
              </MenuItem>
              {/* h2 heading */}
              <MenuItem>
                <HStack
                  aria-label="heading-h2"
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                  className={
                    editor.isActive("heading", { level: 2 }) ? "is-active" : ""
                  }
                >
                  <Text
                    border={"1px"}
                    borderRadius={"4"}
                    boxSize={"5"}
                    fontSize={"sm"}
                  >
                    H2
                  </Text>
                  <Text> Heading 2 </Text>
                </HStack>
              </MenuItem>
              {/* h3 heading */}
              <MenuItem>
                <HStack
                  aria-label="heading-h3"
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                  className={
                    editor.isActive("heading", { level: 3 }) ? "is-active" : ""
                  }
                >
                  <Text
                    border={"1px"}
                    borderRadius={"4"}
                    boxSize={"5"}
                    fontSize={"sm"}
                  >
                    H3
                  </Text>
                  <Text> Heading 3 </Text>
                </HStack>
              </MenuItem>
              {/* h4 heading */}
              <MenuItem>
                <HStack
                  aria-label="heading-h4"
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                  className={
                    editor.isActive("heading", { level: 4 }) ? "is-active" : ""
                  }
                >
                  <Text
                    border={"1px"}
                    borderRadius={"4"}
                    boxSize={"5"}
                    fontSize={"sm"}
                  >
                    H4
                  </Text>
                  <Text> Heading 4 </Text>
                </HStack>
              </MenuItem>

              {/* quote */}
              <MenuItem>
                <HStack
                  aria-label="quote"
                  onClick={() =>
                    editor.chain().focus().toggleBlockquote().run()
                  }
                  className={editor.isActive("blockquote") ? "is-active" : ""}
                >
                  <Icon
                    border={"1px"}
                    borderRadius={"4"}
                    boxSize={"5"}
                    as={MdFormatQuote}
                  />
                  <Text> Quote</Text>
                </HStack>
              </MenuItem>

              {/* code */}
              <MenuItem>
                <HStack
                  aria-label="code-block"
                  onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                  className={editor.isActive("codeBlock") ? "is-active" : ""}
                >
                  <Icon
                    border={"1px"}
                    borderRadius={"4"}
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
              <MenuItem>
                <HStack
                  aria-label="to-do-list"
                  onClick={() => editor.chain().focus().toggleTaskList().run()}
                  className={editor.isActive("taskList") ? "is-active" : ""}
                >
                  <Icon
                    border={"1px"}
                    borderRadius={"4"}
                    boxSize={"5"}
                    as={AiOutlineCheckSquare}
                  />
                  <Text> To-do list</Text>
                </HStack>
              </MenuItem>
              {/* bullet */}
              <MenuItem>
                <HStack
                  aria-label="bullet"
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  className={editor.isActive("bulletList") ? "is-active" : ""}
                >
                  <Icon
                    border={"1px"}
                    borderRadius={"4"}
                    boxSize={"5"}
                    as={GoListUnordered}
                  />
                  <Text> Bulleted list</Text>
                </HStack>
              </MenuItem>
              {/* numbered */}
              <MenuItem>
                <HStack
                  aria-label="numbered-list"
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  className={editor.isActive("orderedList") ? "is-active" : ""}
                >
                  <Icon
                    border={"1px"}
                    borderRadius={"4"}
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
              <MenuItem>
                <HStack
                  aria-label="divider"
                  onClick={() =>
                    editor.chain().focus().setHorizontalRule().run()
                  }
                >
                  <Icon
                    border={"1px"}
                    borderRadius={"4"}
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
            _hover={{ bgColor: "gray" }}
            variant={"unstyled"}
            px={"2"}
            borderRadius={"0"}
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            <Icon boxSize={"5"} as={MdFormatAlignJustify} />
          </MenuButton>
          <MenuList>
            {/* align left */}
            <MenuItem>
              <HStack
                aria-label="align-left"
                onClick={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
                className={
                  editor.isActive({ textAlign: "left" }) ? "is-active" : ""
                }
              >
                <Icon
                  border={"1px"}
                  borderRadius={"4"}
                  boxSize={"5"}
                  as={MdFormatAlignLeft}
                />
                <Text> Align left</Text>
              </HStack>
            </MenuItem>
            {/* align center */}
            <MenuItem>
              <HStack
                aria-label="align-center"
                onClick={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
                className={
                  editor.isActive({ textAlign: "center" }) ? "is-active" : ""
                }
              >
                <Icon
                  border={"1px"}
                  borderRadius={"4"}
                  boxSize={"5"}
                  as={MdFormatAlignCenter}
                />
                <Text> Align center</Text>
              </HStack>
            </MenuItem>
            {/* align right */}
            <MenuItem>
              <HStack
                aria-label="align-center"
                onClick={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
                className={
                  editor.isActive({ textAlign: "right" }) ? "is-active" : ""
                }
              >
                <Icon
                  border={"1px"}
                  borderRadius={"4"}
                  boxSize={"5"}
                  as={MdFormatAlignRight}
                />
                <Text> Align right</Text>
              </HStack>
            </MenuItem>
            {/* justify */}
            <MenuItem>
              <HStack
                aria-label="justify"
                onClick={() =>
                  editor.chain().focus().setTextAlign("justify").run()
                }
                className={
                  editor.isActive({ textAlign: "justify" }) ? "is-active" : ""
                }
              >
                <Icon
                  border={"1px"}
                  borderRadius={"4"}
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
              _hover={{ bgColor: "#f7f7f7" }}
              justifySelf={"center"}
              justifyContent={"center"}
              justifyItems={"center"}
              variant={"unstyled"}
              borderRadius={"0"}
              aria-label="bold"
              icon={<AiOutlineBold size={18} />}
              name="archive-action"
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "is-active" : ""}
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
