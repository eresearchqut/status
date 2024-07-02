import { FunctionComponent } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Checkbox,
  Heading,
  Link,
  ListItem,
  OrderedList,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  UnorderedList,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export interface MarkdownProps {
  markdown: string;
  flattenParagraphs?: boolean;
}

const isExternal = (href: string | undefined): boolean => {
  if (href) {
    try {
      const url = new URL(href);
      return (
        url.protocol === "http:" ||
        url.protocol === "https:" ||
        url.protocol === "mailto:"
      );
    } catch (_) {}
  }
  return false;
};

export const Markdown: FunctionComponent<MarkdownProps> = ({
  markdown,
  flattenParagraphs = true,
}: MarkdownProps) => {
  const defaultBlockProps = {
    mb: flattenParagraphs ? 0 : 2,
  };
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) =>
          flattenParagraphs ? (
            <Text as={"span"}>{children}</Text>
          ) : (
            <Text {...defaultBlockProps}>{children}</Text>
          ),
        a: ({ children, ...props }) => (
          <Link href={props.href} isExternal={isExternal(props.href)}>
            {children}
            {isExternal(props.href) && <ExternalLinkIcon mx={1} />}
          </Link>
        ),
        h1: (props) => (
          <Heading as={"h1"} size="2xl" {...defaultBlockProps} {...props} />
        ),
        h2: (props) => (
          <Heading as={"h2"} size="xl" {...defaultBlockProps} {...props} />
        ),
        h3: (props) => (
          <Heading as={"h3"} size="lg" {...defaultBlockProps} {...props} />
        ),
        h4: (props) => (
          <Heading as={"h4"} size="md" {...defaultBlockProps} {...props} />
        ),
        h5: (props) => (
          <Heading as={"h5"} size="sm" {...defaultBlockProps} {...props} />
        ),
        h6: (props) => (
          <Heading as={"h6"} size="xs" {...defaultBlockProps} {...props} />
        ),
        table: (props) => <Table {...props} />,
        thead: (props) => <Thead {...props} />,
        tbody: (props) => <Tbody {...props} />,
        th: (props) => <Th>{props.children}</Th>,
        tr: (props) => <Tr>{props.children}</Tr>,
        td: (props) => <Td>{props.children}</Td>,
        ul: (props) => (
          <UnorderedList {...defaultBlockProps}>{props.children}</UnorderedList>
        ),
        ol: (props) => (
          <OrderedList {...defaultBlockProps}>{props.children}</OrderedList>
        ),
        li: (props) => <ListItem>{props.children}</ListItem>,
        abbr: (props) => <Text as="abbr">{props.children}</Text>,
        b: (props) => <Text as="b">{props.children}</Text>,
        i: (props) => <Text as="i">{props.children}</Text>,
        u: (props) => <Text as="u">{props.children}</Text>,
        s: (props) => <Text as="s">{props.children}</Text>,
        del: (props) => <Text as="del">{props.children}</Text>,
        cite: (props) => <Text as="cite">{props.children}</Text>,
        em: (props) => <Text as="em">{props.children}</Text>,
        ins: (props) => <Text as="ins">{props.children}</Text>,
        kbd: (props) => <Text as="kbd">{props.children}</Text>,
        mark: (props) => <Text as="mark">{props.children}</Text>,
        samp: (props) => <Text as="samp">{props.children}</Text>,
        sub: (props) => <Text as="sub">{props.children}</Text>,
        sup: (props) => <Text as="sup">{props.children}</Text>,
        input: ({ checked }) => (
          <Checkbox disabled={true} defaultChecked={checked} />
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};

export default Markdown;
