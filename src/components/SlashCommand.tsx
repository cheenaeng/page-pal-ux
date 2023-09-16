import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Editor, Range, Extension } from "@tiptap/core";
import { ReactRenderer } from "@tiptap/react";
import Suggestion from "@tiptap/suggestion";
import {
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { BiParagraph } from "react-icons/bi";
import tippy from "tippy.js";

interface CommandItemProps {
  title: string;
  description: string;
  icon: ReactNode;
}

interface CommandProps {
  editor: Editor;
  range: Range;
}

const suggestionList = ({ query }: { query: string }) => {
  return [
    {
      title: "Text",
      description: "Just start typing with plain text.",
      searchTerms: ["p", "paragraph"],
      icon: <Icon boxSize={"6"} as={BiParagraph} />,
      command: ({ editor, range }: CommandProps) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleNode("paragraph", "paragraph")
          .run();
      },
    },
    {
      title: "Heading 1",
      description: "Big section heading.",
      searchTerms: ["h1", "heading1"],
      icon: <Text fontSize={"lg"}>H1</Text>,
      command: ({ editor, range }: CommandProps) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 1 })
          .run();
      },
    },
  ].filter((item) => {
    if (typeof query === "string" && query.length > 0) {
      const search = query.toLowerCase();
      return (
        item.title.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search) ||
        (item.searchTerms &&
          item.searchTerms.some((term: string) => term.includes(search)))
      );
    }
    // default return all
    return true;
  });
};

// https://tiptap.dev/experiments/commands
const Command = Extension.create({
  name: "slash-command",
  addOptions() {
    return {
      suggestion: {
        char: "/",
        command: ({
          editor,
          range,
          props,
        }: {
          editor: Editor;
          range: Range;
          props: any;
        }) => {
          props.command({ editor, range });
        },
      },
    };
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

export const updateScrollView = (container: HTMLElement, item: HTMLElement) => {
  const containerHeight = container.offsetHeight;
  const itemHeight = item ? item.offsetHeight : 0;

  const top = item.offsetTop;
  const bottom = top + itemHeight;

  if (top < container.scrollTop) {
    container.scrollTop -= container.scrollTop - top + 5;
  } else if (bottom > containerHeight + container.scrollTop) {
    container.scrollTop += bottom - containerHeight - container.scrollTop + 5;
  }
};

const CommandList = ({
  items,
  command,
  editor,
  range,
}: {
  items: CommandItemProps[];
  command: any;
  editor: any;
  range: any;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // apply command
  const selectItem = useCallback(
    (index: number) => {
      const item = items[index];
      if (item) {
        command(item);
      }
    },
    [command, editor, items]
  );

  // event listener for navigating suggestion using keyboard
  useEffect(() => {
    const navigationKeys = ["ArrowUp", "ArrowDown", "Enter", "ArrowRight"];
    const onKeyDown = (e: KeyboardEvent) => {
      if (navigationKeys.includes(e.key)) {
        console.log("🚀 ~ prevent default");

        e.preventDefault();
        if (e.key === "ArrowUp") {
          setSelectedIndex((selectedIndex + items.length - 1) % items.length);
          return true;
        }
        if (e.key === "ArrowDown") {
          setSelectedIndex((selectedIndex + 1) % items.length);
          return true;
        }
        if (e.key == "ArrowRight" || e.key == "Enter") {
          console.log("🚀 onKeyDown 'enter'");
          e.preventDefault();
          selectItem(selectedIndex);
          return true;
        }
        return false;
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [items, selectedIndex, setSelectedIndex, selectItem]);

  // default selected suggestion
  useEffect(() => {
    setSelectedIndex(0);
  }, [items]);

  const commandListContainer = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = commandListContainer?.current;

    const item = container?.children[selectedIndex] as HTMLElement;

    if (item && container) updateScrollView(container, item);
  }, [selectedIndex]);

  return items.length > 0 ? (
    <Box
      id="slash-command"
      ref={commandListContainer}
      shadow={"md"}
      border={"1px"}
      borderColor={"gray.100"}
      borderRadius={"4px"}
      bg={"white"}
      _dark={{ borderColor: "whiteAlpha.400" }}
      px={"1"}
      py={"1"}
      maxHeight={"sm"}
      overflowY={"scroll"}
    >
      {items.map((item: CommandItemProps, index: number) => {
        return (
          <HStack
            key={index}
            onClick={() => selectItem(index)}
            h="50px"
            borderRadius={"4px"}
            _hover={{ bg: "gray.100" }}
            px={"1"}
            py={"5"}
            className={`${
              index === selectedIndex ? "suggestion-selected" : ""
            }`}
          >
            <Center
              border={"1px"}
              borderColor={"blackAlpha.400"}
              borderRadius={"3"}
              h={"45px"}
              width={"45px"}
            >
              {item.icon}
            </Center>
            <VStack align="flex-start" justify={"center"} py={"3"}>
              <Text as="b">{item.title}</Text>
              <Text> {item.description} </Text>
            </VStack>
          </HStack>
        );
      })}
    </Box>
  ) : null;
};

const renderList = () => {
  let component: ReactRenderer | null = null;
  let popup: any | null = null;

  return {
    onStart: (props: { editor: Editor; clientRect: DOMRect }) => {
      component = new ReactRenderer(CommandList, {
        props,
        editor: props.editor,
      });

      if (!props.clientRect) {
        return;
      }

      // @ts-ignore
      // tooltip
      popup = tippy("body", {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: "manual",
        placement: "bottom-start",
      });
    },

    onUpdate(props: { editor: Editor; clientRect: DOMRect }) {
      component?.updateProps(props);

      if (!props.clientRect) {
        return;
      }

      popup[0].setProps({
        getReferenceClientRect: props.clientRect,
      });
    },

    onKeyDown: (props: { event: KeyboardEvent }) => {
      if (props.event.key === "Escape") {
        popup[0].hide();

        return true;
      }

      // @ts-ignore
      return component?.ref?.onKeyDown(props);
    },

    onExit() {
      popup[0].destroy();
      component?.destroy();
    },
  };
};

const SlashCommand = Command.configure({
  suggestion: {
    items: suggestionList,
    render: renderList,
  },
});

export default SlashCommand;
