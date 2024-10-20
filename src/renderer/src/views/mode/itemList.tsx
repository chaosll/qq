import React, { memo, useState } from 'react';
import { Avatar, Typography, Badge } from 'antd';

const { Text } = Typography;

// TODO: 移动到统一的类型定义文件
interface ItemListProps {
  id?: number;
  name?: string;
  avatar?: string;
  status?: 'online' | 'offline' | 'away';
  unreadCount?: number;
  onClick?: (id: number) => void;
}

/**
 * 列表项组件
 * 用于显示用户或群组的基本信息
 * TODO: 添加更多自定义样式支持
 * TODO: 添加右键菜单功能
 * TODO: 支持拖拽排序
 */
const ItemList: React.FC<ItemListProps> = ({
  id = 0,
  name = '未命名',
  avatar = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  status = 'offline',
  unreadCount = 0,
  onClick
}) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
    onClick?.(id);
  };

  // 根据状态获取显示文本
  const getStatusText = (status: string) => {
    const statusMap = {
      online: '[在线]',
      offline: '[离线]',
      away: '[离开]'
    };
    return statusMap[status] || '[未知]';
  };

  return (
    <div
      onClick={handleClick}
      className={`im-item ${selected ? 'im-item-selected' : ''}`}
    >
      <div className="im-item-l" style={{ width: 35 }}>
        <Badge count={unreadCount}>
          <Avatar size={35} src={avatar} />
        </Badge>
      </div>
      <div className="im-item-r">
        <div className="im-r-t">
          <Text
            style={{ color: "#333" }}
            className="text-l"
            ellipsis
          >
            {name}
          </Text>
        </div>
        <div className="im-r-t">
          <Text
            style={{ color: "#999999", fontSize: 12 }}
            ellipsis
          >
            {getStatusText(status)}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default memo(ItemList);
