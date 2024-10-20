import React, { memo, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { Avatar, Popover } from 'antd';
import UserBox from '../mode/userBox';

// TODO: 将这些常量提取到配置文件中
const DEFAULT_AVATAR = 'https://tse1-mm.cn.bing.net/th/id/OIP-C.zgiDOfpjSb5jqL9bSPKK8QHaD8?w=295&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7';
const MENU_ITEMS = [
  { id: 0, path: '/imPage', iconActive: 'mt-markfill', iconInactive: 'mt-mark' },
  { id: 1, path: '/userPage', iconActive: 'mt-customer-group-fill', iconInactive: 'mt-customer-group' },
  { id: 2, path: '/imPage', iconActive: 'mt-creativefill', iconInactive: 'mt-creative' }
];

interface MenuItemProps {
  isSelected: boolean;
  onClick: () => void;
  activeIcon: string;
  inactiveIcon: string;
}

/**
 * 菜单项组件
 * TODO: 考虑将此组件提取到单独的文件中
 */
const MenuItem: React.FC<MenuItemProps> = ({ isSelected, onClick, activeIcon, inactiveIcon }) => (
  <div onClick={onClick} className={isSelected ? 'meun-item item-xz' : 'meun-item'}>
    <i className={`iconfont ${isSelected ? activeIcon : inactiveIcon}`} />
  </div>
);

/**
 * 主布局组件
 * 包含侧边栏导航和主要内容区域
 * TODO: 添加响应式布局支持
 * TODO: 实现主题切换功能
 */
function Layout() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);

  // 处理头像点击
  const handleAvatarClick = () => {
    navigate('/imPage');
  };

  // 处理路由导航
  const handleNavigation = (index: number, url: string) => {
    setSelected(index);
    navigate(url);
  };

  return (
    <div className="base-layout">
      {/* 左侧导航栏 */}
      <div className="base-layout-l">
        {/* 用户头像区域 */}
        <div className="meun-but-avatar" onClick={handleAvatarClick}>
          <Popover
            placement="rightTop"
            arrow={false}
            trigger="click"
            content={<UserBox />}
          >
            <Avatar size={35} src={DEFAULT_AVATAR} />
          </Popover>
          {/* TODO: 实现未读消息提醒功能 */}
          <div className="badge" />
        </div>

        {/* 主导航菜单 */}
        <div className="meun-but-box">
          {MENU_ITEMS.map((item) => (
            <MenuItem
              key={item.id}
              isSelected={selected === item.id}
              onClick={() => handleNavigation(item.id, item.path)}
              activeIcon={item.iconActive}
              inactiveIcon={item.iconInactive}
            />
          ))}
        </div>

        {/* 底部工具栏 */}
        <div className="meun-but-box2">
          <div className="meun-but-box">
            {/* TODO: 实现这些功能按钮的具体功能 */}
            <div className="meun-item">
              <i className="iconfont mt-email" />
            </div>
            <div className="meun-item">
              <i className="iconfont mt-folder-close" />
            </div>
            <div className="meun-item">
              <i className="iconfont mt-caidan" />
            </div>
          </div>
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="base-layout-r">
        <Outlet />
      </div>
    </div>
  );
}

export default memo(Layout);


