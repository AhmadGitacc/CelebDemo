
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import GlassCard from '@/components/ui-custom/GlassCard';
import { Send, User, Clock, Check, CheckCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: Date;
  read: boolean;
}

interface ChatContact {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: number;
}

// Mock chat data
const MOCK_CONTACTS: ChatContact[] = [
  {
    id: '2',
    name: 'John Legend',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    role: 'celebrity',
    lastMessage: 'Looking forward to our event next week!',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 30),
    unreadCount: 2
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    role: 'client',
    lastMessage: 'Thanks for the quick response!',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
    unreadCount: 0
  },
  {
    id: '4',
    name: 'Emma Watson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    role: 'celebrity',
    lastMessage: 'I have some time available in July for your event.',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24),
    unreadCount: 0
  }
];

const MOCK_MESSAGES: Record<string, Message[]> = {
  '2': [
    {
      id: '1',
      senderId: '3',
      receiverId: '2',
      text: 'Hi John, I\'m interested in booking you for my corporate event next month.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      read: true
    },
    {
      id: '2',
      senderId: '2',
      receiverId: '3',
      text: 'Hello! I\'d be happy to discuss this further. What date were you thinking?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1.5),
      read: true
    },
    {
      id: '3',
      senderId: '3',
      receiverId: '2',
      text: 'We\'re looking at June 15th. Would that work for you?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      read: true
    },
    {
      id: '4',
      senderId: '2',
      receiverId: '3',
      text: 'Yes, June 15th should work. Let me check my schedule and get back to you with details.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
      read: true
    },
    {
      id: '5',
      senderId: '2',
      receiverId: '3',
      text: 'I\'ve confirmed that June 15th works for me. What specific time were you thinking, and what type of performance would you like?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      read: true
    },
    {
      id: '6',
      senderId: '2',
      receiverId: '3',
      text: 'Looking forward to our event next week!',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      read: false
    }
  ]
};

interface ChatSystemProps {
  className?: string;
}

const ChatSystem: React.FC<ChatSystemProps> = ({ className }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [contacts, setContacts] = useState<ChatContact[]>(MOCK_CONTACTS);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedContact) {
      const contactMessages = MOCK_MESSAGES[selectedContact.id] || [];
      setMessages(contactMessages);
      
      // Mark messages as read
      if (selectedContact.unreadCount > 0) {
        setContacts(prevContacts => 
          prevContacts.map(contact => 
            contact.id === selectedContact.id 
              ? { ...contact, unreadCount: 0 }
              : contact
          )
        );
      }
    }
  }, [selectedContact]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContact || !user) return;
    
    const newMsg: Message = {
      id: Math.random().toString(36).substring(2, 9),
      senderId: user.id,
      receiverId: selectedContact.id,
      text: newMessage,
      timestamp: new Date(),
      read: false
    };
    
    setMessages(prev => [...prev, newMsg]);
    
    // Update the contact's last message
    setContacts(prevContacts => 
      prevContacts.map(contact => 
        contact.id === selectedContact.id 
          ? { 
              ...contact, 
              lastMessage: newMessage,
              lastMessageTime: new Date()
            }
          : contact
      )
    );
    
    setNewMessage('');
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const day = 24 * 60 * 60 * 1000;
    
    if (diff < 24 * 60 * 60 * 1000) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diff < 7 * day) {
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const filteredContacts = contacts.filter(contact => {
    if (activeTab === 'unread') {
      return contact.unreadCount > 0;
    }
    return true;
  });

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="flex h-full">
        {/* Contacts list */}
        <div className="w-1/3 border-r border-border">
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold mb-3">Messages</h2>
            <Tabs 
              defaultValue={activeTab} 
              onValueChange={(value) => setActiveTab(value as 'all' | 'unread')}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                <TabsTrigger value="unread" className="text-xs">
                  Unread
                  <Badge className="ml-1.5 py-0 h-5 bg-accent text-accent-foreground">
                    {contacts.reduce((sum, contact) => sum + contact.unreadCount, 0)}
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <ScrollArea className="h-[calc(100%-57px)]">
            {filteredContacts.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                No messages found
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filteredContacts.map(contact => (
                  <div 
                    key={contact.id}
                    className={cn(
                      "p-3 hover:bg-muted/50 cursor-pointer transition-colors",
                      selectedContact?.id === contact.id && "bg-muted/50"
                    )}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={contact.avatar} />
                        <AvatarFallback>
                          {contact.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="font-medium truncate">{contact.name}</div>
                          {contact.lastMessageTime && (
                            <div className="text-xs text-muted-foreground">
                              {formatTime(contact.lastMessageTime)}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between mt-1">
                          <div className="text-xs text-muted-foreground truncate">
                            {contact.lastMessage || 'No messages yet'}
                          </div>
                          
                          {contact.unreadCount > 0 && (
                            <Badge className="ml-1.5 py-0 h-5 bg-accent text-accent-foreground">
                              {contact.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
        
        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {selectedContact ? (
            <>
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src={selectedContact.avatar} />
                    <AvatarFallback>
                      {selectedContact.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{selectedContact.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {selectedContact.role === 'celebrity' ? 'Celebrity' : 'Client'}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <User className="h-4 w-4" />
                </Button>
              </div>
              
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map(message => {
                    const isOwn = user?.id === message.senderId;
                    
                    return (
                      <div
                        key={message.id}
                        className={cn(
                          "flex",
                          isOwn ? "justify-end" : "justify-start"
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[75%] rounded-lg px-4 py-2",
                            isOwn ? "bg-accent text-accent-foreground" : "bg-muted"
                          )}
                        >
                          <div className="mb-1">{message.text}</div>
                          <div className="flex items-center justify-end space-x-1 text-xs opacity-70">
                            <span>{formatTime(message.timestamp)}</span>
                            {isOwn && (
                              message.read ? 
                                <CheckCheck className="h-3 w-3" /> : 
                                <Check className="h-3 w-3" />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              <div className="p-4 border-t border-border">
                <form 
                  className="flex items-center gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                >
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1"
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center p-8">
              <div>
                <h3 className="font-medium text-lg mb-2">Select a conversation</h3>
                <p className="text-muted-foreground">
                  Choose a contact from the list to start chatting
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatSystem;
