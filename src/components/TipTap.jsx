/* eslint-disable import/no-anonymous-default-export */
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Document from '@tiptap/extension-document'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import CharacterCount from '@tiptap/extension-character-count'

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect, useState } from 'react'
import {
  Button,
  Box,
  IconButton,
  Wrap,
  Stack,
  Select,
  Text,
  HStack,
  Tooltip,
} from '@chakra-ui/react'
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineStrikethrough,
  AiOutlineCode,
  AiOutlineLine,
  AiOutlineUnderline,
  AiOutlineCheckSquare,
} from 'react-icons/ai'
import {
  MdFormatAlignLeft,
  MdFormatAlignRight,
  MdFormatAlignCenter,
  MdFormatAlignJustify,
  MdBorderHorizontal,
  MdFormatQuote,
  MdUndo,
  MdRedo,
} from 'react-icons/md'
import { GoListOrdered, GoListUnordered } from 'react-icons/go'
import { BsFileEarmarkBreak } from 'react-icons/bs'
import { HiOutlineCode } from 'react-icons/hi'
import { BiParagraph } from 'react-icons/bi'
import { initialData } from '../data/mock/editorDefault'
import { BiSolidQuoteAltRight, BiCodeBlock } from 'react-icons/bi'

// config
const charLimit = 10000

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <Wrap spacing='1'>
      {/* CHARACTERS STYLING */}
      <Box border='1px' borderColor='gray.200' borderRadius={'10'}>
        {/* bold */}
        <Tooltip label='Bold' placement='bottom' borderRadius={'10'}>
          <IconButton
            variant='ghost'
            aria-label='bold'
            icon={<AiOutlineBold size={18} />}
            name='archive-action'
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
          />
        </Tooltip>
        {/* italic */}
        <Tooltip label='Italic' placement='bottom' borderRadius={'10'}>
          <IconButton
            variant='ghost'
            aria-label='italic'
            icon={<AiOutlineItalic size={18} />}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
          />
        </Tooltip>
        {/* underline */}
        <Tooltip label='Underline' placement='bottom' borderRadius={'10'}>
          <IconButton
            variant='ghost'
            aria-label='italic'
            icon={<AiOutlineUnderline size={18} />}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive('underline') ? 'is-active' : ''}
          />
        </Tooltip>
        {/* strikethrough */}
        <Tooltip label='Strike through' placement='bottom' borderRadius={'10'}>
          <IconButton
            variant='ghost'
            aria-label='italic'
            icon={<AiOutlineStrikethrough size={18} />}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
          />
        </Tooltip>
        {/* code */}
        <Tooltip label='Code' placement='bottom' borderRadius={'10'}>
          <IconButton
            variant='ghost'
            aria-label='code'
            icon={<HiOutlineCode size={18} />}
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            className={editor.isActive('code') ? 'is-active' : ''}
          />
        </Tooltip>
      </Box>

      {/* DIVIDER, LINE BREAK, LIST, CHECKLIST */}
      <Box border='1px' borderColor='gray.200' borderRadius={'10'}>
        {/* divider */}
        <Tooltip label='Divider' placement='bottom' borderRadius={'10'}>
          <IconButton
            variant='ghost'
            aria-label='divider'
            icon={<AiOutlineLine size={18} />}
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          />
        </Tooltip>
        {/* hard break */}
        <Tooltip label='New line' placement='bottom' borderRadius={'10'}>
          <IconButton
            variant='ghost'
            aria-label='hard-break'
            icon={<BsFileEarmarkBreak size={18} />}
            onClick={() => editor.chain().focus().setHardBreak().run()}
          />
        </Tooltip>
        {/* bullet */}
        <Tooltip label='Unordered list' placement='bottom' borderRadius={'10'}>
          <IconButton
            variant='ghost'
            aria-label='bullet'
            icon={<GoListUnordered size={18} />}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
          />
        </Tooltip>
        {/* bullet-ordered */}
        <Tooltip label='Ordered list' placement='bottom' borderRadius={'10'}>
          <IconButton
            variant='ghost'
            aria-label='bullet-ordered'
            icon={<GoListOrdered size={18} />}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'is-active' : ''}
          />
        </Tooltip>
        {/* checklist */}
        <Tooltip label='Checklist' placement='bottom' borderRadius={'10'}>
          <IconButton
            variant='ghost'
            aria-label='checklist'
            icon={<AiOutlineCheckSquare size={18} />}
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            className={editor.isActive('taskList') ? 'is-active' : ''}
          />
        </Tooltip>
      </Box>

      {/* CODEBLOCK, QUOTE */}
      <Box border='1px' borderColor='gray.200' borderRadius={'10'}>
        {/* code block */}
        <Tooltip label='Code block' placement='bottom' borderRadius={'10'}>
          <IconButton
            variant='ghost'
            aria-label='code-block'
            icon={<BiCodeBlock size={18} />}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? 'is-active' : ''}
          />
        </Tooltip>
        {/* quote */}
        <Tooltip label='Quote' placement='bottom' borderRadius={'10'}>
          <IconButton
            variant='ghost'
            aria-label='quote'
            icon={<MdFormatQuote size={18} />}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'is-active' : ''}
          />
        </Tooltip>
      </Box>

      {/* INDENTATION */}
      <Box border='1px' borderColor='gray.200' borderRadius={'10'}>
        {/* align left */}
        <Tooltip label='Align left' placement='bottom' borderRadius={'10'}>
          <IconButton
            variant='ghost'
            aria-label='align-left'
            icon={<MdFormatAlignLeft size={18} />}
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={
              editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''
            }
          />
        </Tooltip>
        {/* align center */}
        <Tooltip label='Align center' placement='bottom' borderRadius={'10'}>
          <IconButton
            variant='ghost'
            aria-label='align-center'
            icon={<MdFormatAlignCenter size={18} />}
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={
              editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''
            }
          />
        </Tooltip>
        {/* align right */}
        <Tooltip label='Align right' placement='bottom' borderRadius={'10'}>
          <IconButton
            variant='ghost'
            aria-label='align-right'
            icon={<MdFormatAlignRight size={18} />}
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={
              editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''
            }
          />
        </Tooltip>
        {/* justify */}
        <Tooltip label='Justify' placement='bottom' borderRadius={'10'}>
          <IconButton
            variant='ghost'
            aria-label='justify'
            icon={<MdFormatAlignJustify size={18} />}
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={
              editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''
            }
          />
        </Tooltip>
      </Box>

      {/* HEADING SIZE */}
      <HStack border='1px' borderColor='gray.200' borderRadius={'10'}>
        {/* paragraph */}
        <Tooltip label='Paragraph' placement='bottom' borderRadius={'10'}>
          <IconButton
            variant='ghost'
            aria-label='paragraph'
            icon={<BiParagraph size={18} />}
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive('paragraph') ? 'is-active' : ''}
          />
        </Tooltip>
        {/* heading1 */}
        <Tooltip label='Heading 1' placement='bottom' borderRadius={'10'}>
          <Button
            width={'1'}
            variant='ghost'
            aria-label='heading1'
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
            }
          >
            <Text fontSize='md' pt='0.5'>
              H1
            </Text>
          </Button>
        </Tooltip>
        {/* heading2*/}
        <Tooltip label='Heading 2' placement='bottom' borderRadius={'10'}>
          <Button
            width={'1'}
            variant='ghost'
            aria-label='heading2'
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
            }
          >
            <Text fontSize='md' pt='0.5'>
              H2
            </Text>
          </Button>
        </Tooltip>
        {/* heading3*/}
        <Tooltip label='Heading 3' placement='bottom' borderRadius={'10'}>
          <Button
            width={'1'}
            variant='ghost'
            aria-label='heading3'
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
            }
          >
            <Text fontSize='md' pt='0.5'>
              H3
            </Text>
          </Button>
        </Tooltip>
        {/* heading4*/}
        <Tooltip label='Heading 4' placement='bottom' borderRadius={'10'}>
          <Button
            width={'1'}
            variant='ghost'
            aria-label='heading4'
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            className={
              editor.isActive('heading', { level: 4 }) ? 'is-active' : ''
            }
          >
            <Text fontSize='md' pt='0.5'>
              H4
            </Text>
          </Button>
        </Tooltip>
        {/* heading5*/}
        <Tooltip label='Heading 5' placement='bottom' borderRadius={'10'}>
          <Button
            width={'1'}
            variant='ghost'
            aria-label='heading5'
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 5 }).run()
            }
            className={
              editor.isActive('heading', { level: 5 }) ? 'is-active' : ''
            }
          >
            <Text fontSize='md' pt='0.5'>
              H5
            </Text>
          </Button>
        </Tooltip>
      </HStack>

      {/* UNDO/ REDO */}
      <Box border='1px' borderColor='gray.200' borderRadius={'10'}>
        {/* undo */}
        <Tooltip label='Undo' placement='bottom' borderRadius={'10'}>
          <IconButton
            variant='ghost'
            aria-label='undo'
            icon={<MdUndo size={18} />}
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
          />
        </Tooltip>
        {/* redo */}
        <Tooltip label='Redo' placement='bottom' borderRadius={'10'}>
          <IconButton
            variant='ghost'
            aria-label='redo'
            icon={<MdRedo size={18} />}
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
          />
        </Tooltip>
      </Box>

      {/* MOCK */}
      <Box border='1px' borderColor='gray.200' borderRadius={'10'}>
        <Tooltip
          label='Insert mock data'
          placement='bottom'
          borderRadius={'10'}
        >
          <Button
            width={'1'}
            variant='ghost'
            aria-label='heading1'
            onClick={() => editor?.commands?.setContent(initialData)}
          >
            Mock
          </Button>
        </Tooltip>
      </Box>

      {/* custom ones */}
      {/* <Button
          onClick={() => editor.chain().focus().setColor('#958DF1').run()}
          className={
            editor.isActive('textStyle', { color: '#958DF1' })
              ? 'is-active'
              : ''
          }
        >
          purple
        </Button> */}
      {/* <Button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </Button>
      <Button onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </Button> */}
    </Wrap>
  )
}

export default () => {
  const editor = useEditor({
    extensions: [
      Document,
      Underline,
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
      CharacterCount.configure({
        limit: charLimit,
      }),
    ],
    injectCSS: false,
    onUpdate: ({ editor }) => {
      const data = editor.getJSON()
      localStorage.setItem('tiptap', JSON.stringify(data))
    },
  })

  useEffect(() => {
    editor?.commands?.setContent(JSON.parse(localStorage.getItem('tiptap')))
  }, [editor])

  return (
    <Box padding={'10'}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} color='red' />
      {editor && (
        <div className='character-count'>
          {editor.storage.characterCount.characters()}/{charLimit} characters
          <br />
          {editor.storage.characterCount.words()} words
        </div>
      )}
    </Box>
  )
}
