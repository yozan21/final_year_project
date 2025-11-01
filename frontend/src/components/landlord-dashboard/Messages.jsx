import React, { useState } from "react";
import styled from "styled-components";
import {
  FiSearch,
  FiSend,
  FiMoreVertical,
  FiUser,
  FiClock,
  FiMessageSquare,
} from "react-icons/fi";
import { useUI } from "../../context/UIContext";

const MessagesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: calc(100vh - 200px);
  display: flex;
  gap: 1.5rem;
`;

const MessagesSidebar = styled.div`
  width: 350px;
  background: ${({ theme }) => theme.surface};
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.mutedText}20;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
`;

const SidebarHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.mutedText}20;
`;

const SidebarTitle = styled.h2`
  font-family: ${({ theme }) => theme.fontHeading};
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin: 0 0 1rem 0;
`;

const SearchInput = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.mutedText};
  font-size: 1rem;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: border 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.mutedText};
`;

const ConversationList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const ConversationItem = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.mutedText}10;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  gap: 1rem;

  &:hover {
    background: ${({ theme }) => theme.background};
  }

  &.active {
    background: ${({ theme }) => theme.primary}10;
    border-left: 3px solid ${({ theme }) => theme.primary};
  }
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
`;

const ConversationContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const ConversationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
`;

const ConversationName = styled.h4`
  font-family: ${({ theme }) => theme.fontHeading};
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ConversationTime = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.mutedText};
`;

const ConversationPreview = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.mutedText};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UnreadBadge = styled.div`
  background: ${({ theme }) => theme.primary};
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
`;

const ChatArea = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.surface};
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.mutedText}20;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.mutedText}20;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChatHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ChatHeaderRight = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.mutedText};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.background};
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Message = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;

  &.sent {
    flex-direction: row-reverse;
  }
`;

const MessageAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ theme, isSent }) => (isSent ? theme.primary : theme.accent)};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  flex-shrink: 0;
`;

const MessageContent = styled.div`
  max-width: 70%;
`;

const MessageBubble = styled.div`
  background: ${({ theme, isSent }) =>
    isSent ? theme.primary : theme.background};
  color: ${({ theme, isSent }) => (isSent ? "white" : theme.text)};
  padding: 0.75rem 1rem;
  border-radius: 16px;
  font-size: 0.95rem;
  line-height: 1.4;
  word-wrap: break-word;
`;

const MessageTime = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.mutedText};
  margin-top: 0.25rem;
  text-align: ${({ isSent }) => (isSent ? "right" : "left")};
`;

const ChatInput = styled.div`
  padding: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.mutedText}20;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-end;
`;

const MessageInput = styled.textarea`
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.mutedText};
  font-size: 1rem;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  resize: none;
  min-height: 44px;
  max-height: 120px;
  font-family: ${({ theme }) => theme.fontBody};
  transition: border 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
  }
`;

const SendButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 12px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.accent};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.mutedText};
  text-align: center;
  padding: 2rem;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const EmptyTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
`;

const EmptyText = styled.p`
  font-size: 1.1rem;
  margin: 0;
`;

const Messages = () => {
  const { theme } = useUI();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");

  // Mock data - in real app this would come from React Query
  const conversations = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "SJ",
      lastMessage:
        "Hi! I'm interested in your studio apartment. Is it still available?",
      time: "2 min ago",
      unread: 2,
      messages: [
        {
          id: 1,
          text: "Hi! I'm interested in your studio apartment. Is it still available?",
          time: "2:30 PM",
          isSent: false,
        },
        {
          id: 2,
          text: "Yes, it's still available! Would you like to schedule a viewing?",
          time: "2:32 PM",
          isSent: true,
        },
        {
          id: 3,
          text: "That would be great! When are you available?",
          time: "2:35 PM",
          isSent: false,
        },
      ],
    },
    {
      id: 2,
      name: "Mike Chen",
      avatar: "MC",
      lastMessage:
        "Thanks for showing me the apartment yesterday. I'll let you know my decision soon.",
      time: "1 hour ago",
      unread: 0,
      messages: [
        {
          id: 1,
          text: "Thanks for showing me the apartment yesterday. I'll let you know my decision soon.",
          time: "1:15 PM",
          isSent: false,
        },
      ],
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      avatar: "ER",
      lastMessage: "What's the parking situation like?",
      time: "3 hours ago",
      unread: 1,
      messages: [
        {
          id: 1,
          text: "What's the parking situation like?",
          time: "11:30 AM",
          isSent: false,
        },
      ],
    },
  ];

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    // In real app, this would send the message via API
    console.log("Sending message:", newMessage);
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <MessagesContainer>
      <MessagesSidebar theme={theme}>
        <SidebarHeader theme={theme}>
          <SidebarTitle theme={theme}>Messages</SidebarTitle>
          <SearchInput>
            <SearchIcon theme={theme}>
              <FiSearch />
            </SearchIcon>
            <Input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              theme={theme}
            />
          </SearchInput>
        </SidebarHeader>

        <ConversationList>
          {filteredConversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              theme={theme}
              className={
                selectedConversation?.id === conversation.id ? "active" : ""
              }
              onClick={() => setSelectedConversation(conversation)}
            >
              <Avatar theme={theme}>{conversation.avatar}</Avatar>
              <ConversationContent>
                <ConversationHeader>
                  <ConversationName theme={theme}>
                    {conversation.name}
                  </ConversationName>
                  <ConversationTime theme={theme}>
                    {conversation.time}
                  </ConversationTime>
                </ConversationHeader>
                <ConversationPreview theme={theme}>
                  {conversation.lastMessage}
                </ConversationPreview>
              </ConversationContent>
              {conversation.unread > 0 && (
                <UnreadBadge theme={theme}>{conversation.unread}</UnreadBadge>
              )}
            </ConversationItem>
          ))}
        </ConversationList>
      </MessagesSidebar>

      <ChatArea theme={theme}>
        {selectedConversation ? (
          <>
            <ChatHeader theme={theme}>
              <ChatHeaderLeft>
                <Avatar theme={theme}>{selectedConversation.avatar}</Avatar>
                <div>
                  <ConversationName theme={theme}>
                    {selectedConversation.name}
                  </ConversationName>
                  <ConversationTime theme={theme}>Online</ConversationTime>
                </div>
              </ChatHeaderLeft>
              <ChatHeaderRight>
                <IconButton theme={theme}>
                  <FiMoreVertical />
                </IconButton>
              </ChatHeaderRight>
            </ChatHeader>

            <ChatMessages>
              {selectedConversation.messages.map((message) => (
                <Message
                  key={message.id}
                  className={message.isSent ? "sent" : ""}
                >
                  <MessageAvatar theme={theme} isSent={message.isSent}>
                    {message.isSent ? "You" : selectedConversation.avatar}
                  </MessageAvatar>
                  <MessageContent>
                    <MessageBubble theme={theme} isSent={message.isSent}>
                      {message.text}
                    </MessageBubble>
                    <MessageTime theme={theme} isSent={message.isSent}>
                      {message.time}
                    </MessageTime>
                  </MessageContent>
                </Message>
              ))}
            </ChatMessages>

            <ChatInput theme={theme}>
              <InputContainer>
                <MessageInput
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  theme={theme}
                />
                <SendButton
                  theme={theme}
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <FiSend />
                </SendButton>
              </InputContainer>
            </ChatInput>
          </>
        ) : (
          <EmptyState theme={theme}>
            <EmptyIcon>💬</EmptyIcon>
            <EmptyTitle theme={theme}>Select a conversation</EmptyTitle>
            <EmptyText>
              Choose a conversation from the list to start messaging.
            </EmptyText>
          </EmptyState>
        )}
      </ChatArea>
    </MessagesContainer>
  );
};

export default Messages;
