/* eslint-disable import/no-anonymous-default-export */
// tiptap
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Document from '@tiptap/extension-document'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, ReactNodeViewRenderer, useEditor } from '@tiptap/react'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { lowlight } from 'lowlight'
import { useDebounce } from 'use-debounce'
import toast from 'react-hot-toast'
import { Spinner } from '@chakra-ui/react'

// TODO @sb: implement collab with tiptap
// import Collaboration from '@tiptap/extension-collaboration'
// import { HocuspocusProvider } from '@hocuspocus/provider'

// react
import { useEffect, useContext, useState } from 'react'
import { Button, Box, Wrap, Text, Flex, Spacer } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'

// custom
import CodeBlockComponent from './CodeBlockComponent'
import EditorMenuBar from './EditorMenuBar'
import BookmarkAPI from '../api/BookmarkAPI'

// config
const charLimit = 10000

// code block languages (alias)
lowlight.registerLanguage('html', html)
lowlight.registerLanguage('css', css)
lowlight.registerLanguage('javascript', js)
lowlight.registerLanguage('typescript', ts)

export default ({ bookmarkId, bearerToken }) => {
  let editor
  if (bookmarkId) {
    // TODO @sb: Set up the Hocuspocus WebSocket provider
    // const provider = new HocuspocusProvider({
    //   url: 'ws://127.0.0.1:3338',
    //   name: bookmarkId,
    //   token: bearerToken,
    // })

    editor = useEditor({
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
        Placeholder.configure({
          // Use a placeholder:
          placeholder: 'Write something...',
        }),
        CodeBlockLowlight.extend({
          addNodeView() {
            return ReactNodeViewRenderer(CodeBlockComponent)
          },
        }).configure({ lowlight }),

        // TODO @sb: Set up collab
        // Collaboration.configure({
        //   document: provider.document,
        // }),
        // The Collaboration extension comes with its own history handling
        // history: false,
      ],

      // config
      autofocus: true,
      injectCSS: false,
      onUpdate({ editor }) {
        // The content has changed
        setIsSaved(false)
      },
    })
  }

  const { mutate: updateBookmarkNotes } = useMutation(
    BookmarkAPI.updateBookMarkNotes,
  )
  const [debouncedEditor] = useDebounce(editor?.state.doc.content, 5000)
  const [content, setContent] = useState({})
  const [isFetchedDocLoaded, setIsFetchedDocLoaded] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  // call API to retrieve bookmark data when bookmarkId is defined
  useEffect(() => {
    async function fetchAndSetContent() {
      console.log('🚀 fetchAndLoadContent')

      const bookmark = await BookmarkAPI.getBookmarkById({
        id: bookmarkId,
        token: bearerToken,
      })

      // return early if empty string
      if (bookmark.note === '') {
        return
      }

      const content = JSON.parse(bookmark.note)
      setContent(content)
    }

    if (bookmarkId) {
      fetchAndSetContent()
    }
  }, [bookmarkId])

  // load fetched doc into editor
  useEffect(() => {
    if (editor && Object.keys(content).length !== 0) {
      console.log('🚀 load editor content')
      editor?.commands?.setContent(content)
      setIsFetchedDocLoaded(true)
    }
  }, [editor, content])

  // auto-save according to interval defined in useDebounce (i.e. 5 seconds)
  useEffect(() => {
    // TODO @sb: enable writing to local storage for offline usage
    // // save
    // const data = editor.getJSON()
    // localStorage.setItem('tiptap', JSON.stringify(data))
    // // fetch
    // editor?.commands?.setContent(JSON.parse(localStorage.getItem('tiptap')))
    if (editor && isFetchedDocLoaded) {
      saveContent()
    }
  }, [debouncedEditor, isFetchedDocLoaded])

  const saveContent = () => {
    // get content from editor
    const stringifiedContent = JSON.stringify(editor?.getJSON())

    // return early if nil
    // TODO @sb: ignore empty tiptap content too
    if (stringifiedContent === '') {
      return null
    }

    console.log('🚀 saveContent')
    setIsSaving(true)

    // call update API
    updateBookmarkNotes(
      {
        id: bookmarkId,
        token: bearerToken,
        note: stringifiedContent,
      },
      {
        onSuccess: () => {
          setIsSaved(true)
        },
        onError: () => {
          toast.error('Error saving')
          setIsSaved(false)
        },
        onSettled: async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000)) // fake delay of 1s
          setIsSaving(false)
        },
      },
    )
  }

  return (
    <Box padding={'5'}>
      {/* EDITOR */}
      <EditorMenuBar editor={editor} />
      <Box my={'2'}>
        <EditorContent editor={editor} />
      </Box>

      {/* FOOTER */}
      {editor && (
        <Wrap spacing='5'>
          <Flex alignItems={'center'}>
            Characters:{' '}
            <Text ml='2' fontWeight='bold'>
              {editor.storage.characterCount.characters().toLocaleString()} /
              {charLimit.toLocaleString()}
            </Text>
          </Flex>
          <Flex ml='4' alignItems={'center'}>
            Words:{' '}
            <Text ml='2' fontWeight='bold'>
              {editor.storage.characterCount.words().toLocaleString()}{' '}
            </Text>
          </Flex>

          <Spacer />

          {/* when saving */}
          {isSaving ? (
            <Button variant='solid' width={'10%'} cursor='not-allowed'>
              <Spinner color='brand.main' />
            </Button>
          ) : isSaved ? (
            <Button variant='solid' width={'10%'} cursor='not-allowed'>
              Saved
            </Button>
          ) : (
            <Button variant='primary' width={'10%'} onClick={saveContent}>
              Save
            </Button>
          )}
        </Wrap>
      )}
    </Box>
  )
}
