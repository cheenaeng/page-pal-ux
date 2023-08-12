export const initialData = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: {
        textAlign: 'left',
        level: 1,
      },
      content: [
        {
          type: 'text',
          marks: [
            {
              type: 'underline',
            },
          ],
          text: 'Welcome to TipTap',
        },
        {
          type: 'text',
          text: ' !!!',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        textAlign: 'left',
        level: 1,
      },
      content: [
        {
          type: 'text',
          text: 'Header1',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        textAlign: 'left',
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: 'Header2',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        textAlign: 'left',
        level: 3,
      },
      content: [
        {
          type: 'text',
          text: 'Header3',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        textAlign: 'left',
        level: 4,
      },
      content: [
        {
          type: 'text',
          text: 'Header4',
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          type: 'text',
          text: 'Header5',
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'left',
      },
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          type: 'text',
          marks: [
            {
              type: 'bold',
            },
          ],
          text: 'Bold',
        },
        {
          type: 'text',
          text: ' ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'italic',
            },
          ],
          text: 'Italic',
        },
        {
          type: 'text',
          text: ' ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'underline',
            },
          ],
          text: 'Underline',
        },
        {
          type: 'text',
          text: ' ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'strike',
            },
          ],
          text: 'Strikethrough',
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          type: 'text',
          marks: [
            {
              type: 'underline',
            },
          ],
          text: 'Unordered list',
        },
      ],
    },
    {
      type: 'bulletList',
      content: [
        {
          type: 'listItem',
          attrs: {
            color: null,
          },
          content: [
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  text: 'item1',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          attrs: {
            color: null,
          },
          content: [
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  text: 'item2',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          type: 'text',
          marks: [
            {
              type: 'underline',
            },
          ],
          text: 'Ordered list',
        },
      ],
    },
    {
      type: 'orderedList',
      attrs: {
        start: 1,
      },
      content: [
        {
          type: 'listItem',
          attrs: {
            color: null,
          },
          content: [
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  text: 'item1',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          attrs: {
            color: null,
          },
          content: [
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  text: 'item2',
                },
              ],
            },
            {
              type: 'orderedList',
              attrs: {
                start: 1,
              },
              content: [
                {
                  type: 'listItem',
                  attrs: {
                    color: null,
                  },
                  content: [
                    {
                      type: 'paragraph',
                      attrs: {
                        textAlign: 'left',
                      },
                      content: [
                        {
                          type: 'text',
                          text: 'item 2a',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          type: 'text',
          marks: [
            {
              type: 'underline',
            },
          ],
          text: 'Checklist',
        },
      ],
    },
    {
      type: 'taskList',
      content: [
        {
          type: 'taskItem',
          attrs: {
            checked: false,
          },
          content: [
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  text: 'item 1',
                },
              ],
            },
          ],
        },
        {
          type: 'taskItem',
          attrs: {
            checked: false,
          },
          content: [
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  text: 'item 2',
                },
              ],
            },
            {
              type: 'taskList',
              content: [
                {
                  type: 'taskItem',
                  attrs: {
                    checked: false,
                  },
                  content: [
                    {
                      type: 'paragraph',
                      attrs: {
                        textAlign: 'left',
                      },
                      content: [
                        {
                          type: 'text',
                          text: 'nested item',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'left',
      },
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          type: 'text',
          marks: [
            {
              type: 'underline',
            },
            {
              type: 'italic',
            },
          ],
          text: 'This is a paragraph.',
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          type: 'text',
          marks: [
            {
              type: 'bold',
            },
          ],
          text: 'Lorem Ipsum ',
        },
        {
          type: 'text',
          text: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'left',
      },
    },
    {
      type: 'blockquote',
      content: [
        {
          type: 'heading',
          attrs: {
            textAlign: 'left',
            level: 2,
          },
          content: [
            {
              type: 'text',
              text: 'Some important quote',
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'left',
      },
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          type: 'text',
          marks: [
            {
              type: 'bold',
            },
          ],
          text: 'Markdown Code',
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          type: 'text',
          marks: [
            {
              type: 'code',
            },
          ],
          text: 'This is code',
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'left',
      },
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          type: 'text',
          marks: [
            {
              type: 'bold',
            },
          ],
          text: 'CodeBlock',
        },
      ],
    },
    {
      type: 'codeBlock',
      attrs: {
        language: 'null',
      },
      content: [
        {
          type: 'text',
          text: 'This is some code block',
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'left',
      },
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          type: 'text',
          marks: [
            {
              type: 'bold',
            },
          ],
          text: 'CodeBlock with language support',
        },
      ],
    },
    {
      type: 'codeBlock',
      attrs: {
        language: 'typescript',
      },
      content: [
        {
          type: 'text',
          text: '// comments\nfor (var i=1; i <= 20; i++)\n{\n  if (i % 15 == 0)\n    console.log("FizzBuzz");\n  else if (i % 3 == 0)\n    console.log("Fizz");\n  else if (i % 5 == 0)\n    console.log("Buzz");\n  else\n    console.log(i);\n}',
        },
      ],
    },
    {
      type: 'codeBlock',
      attrs: {
        language: 'go',
      },
      content: [
        {
          type: 'text',
          text: '\ntype RedisCache struct {\n\tAddr        string   `mapstructure:"addr"`\n\tSentinels   []string `mapstructure:"sentinels"`\n\tClusterName string   `mapstructure:"cluster_name"`\n\tAuthKey     string   `mapstructure:"auth_key"`\n\tPoolSize    int      `mapstructure:"pool_size"`\n\tDB          int      `mapstructure:"db"`\n}',
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'left',
      },
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'left',
      },
    },
  ],
}
