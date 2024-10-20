import React, { memo, useState } from 'react';
import { Avatar, Typography, Badge } from 'antd';

const { Text } = Typography;

// TODO: 移动到统一的类型定义文件
interface ChatMessage {
  id: number;
  avatar: string;
  title: string;
  message: string;
  date: string;
  unreadCount: number;
}

interface ImListProps {
  messages?: ChatMessage[];
  onSelect?: (id: number) => void;
}

/**
 * 聊天列表项组件
 * 用于显示单个聊天记录
 */
const ChatItem: React.FC<{
  message: ChatMessage;
  isSelected: boolean;
  onClick: () => void;
}> = ({ message, isSelected, onClick }) => {
  const textColor = isSelected ? '#fff' : '#333';
  const subTextColor = isSelected ? '#fff' : '#999999';

  return (
    <div
      onClick={onClick}
      className={`im-item ${isSelected ? 'im-selected' : ''}`}
    >
      <div className="im-item-l">
        <Badge count={message.unreadCount}>
          <Avatar size={45} src={message.avatar} />
        </Badge>
      </div>
      <div className="im-item-r">
        <div className="im-r-t">
          <Text
            style={{ color: textColor }}
            className="text-l"
            ellipsis
          >
            {message.title}
          </Text>
          <Text
            style={{ color: subTextColor }}
            className="text-l"
            ellipsis
          >
            {message.date}
          </Text>
        </div>
        <div className="im-r-t">
          <Text
            style={{ color: subTextColor }}
            ellipsis
          >
            {message.message}
          </Text>
        </div>
      </div>
    </div>
  );
};

/**
 * 聊天列表组件
 * 显示所有聊天会话
 * TODO: 添加虚拟滚动优化性能
 * TODO: 添加消息分组功能（按日期、类型等）
 * TODO: 添加消息置顶功能
 * TODO: 实现消息草稿功能
 */
const ImList: React.FC<ImListProps> = ({
  messages = DEFAULT_MESSAGES,
  onSelect
}) => {
  const [selectedId, setSelectedId] = useState<number>(-1);

  const handleSelect = (id: number) => {
    setSelectedId(id);
    onSelect?.(id);
  };

  return (
    <div className="im-list">
      {messages.map(message => (
        <ChatItem
          key={message.id}
          message={message}
          isSelected={selectedId === message.id}
          onClick={() => handleSelect(message.id)}
        />
      ))}
    </div>
  );
};

// TODO: 移动到单独的配置文件或从API获取
const DEFAULT_MESSAGES: ChatMessage[] = [
  {
    id: 0,
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    title: "Ant Design Team",
    message: "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    date: "2024/05/05",
    unreadCount: 0
  },
  {
    id: 1,
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    title: "UI/UX Discussion",
    message: "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    date: "2024/05/05",
    unreadCount: 0
  }
];

export default memo(ImList);
