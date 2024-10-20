import React, { memo, useState } from 'react';
import type { MenuProps } from 'antd';
import { Outlet } from 'react-router';
import UserlTool from '../mode/usetTool';
import ImList from '../mode/imList';
import SoushuoList from '../mode/soushuoList';

// TODO: 将这些常量移动到统一的配置文件中
const ADD_GROUP_MENU_ITEMS: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <div className="but-item">
        <i className="iconfont mt-roundadd" />
        <p>发起群聊</p>
      </div>
    ),
  },
  {
    key: '2',
    label: (
      <div className="but-item">
        <i className="iconfont mt-friendadd" />
        <p>加好友/群</p>
      </div>
    ),
  },
];

interface WindowControlProps {
  onClose: () => void;
  onMaximize: () => void;
  onMinimize: () => void;
}

/**
 * 窗口控制按钮组件
 * TODO: 考虑将此组件提取到公共组件目录
 */
const WindowControls: React.FC<WindowControlProps> = ({ onClose, onMaximize, onMinimize }) => (
  <div className="meun-tool-r">
    <div onClick={onMinimize} className="meun-but">
      <i className="iconfont mt-jianhao" />
    </div>
    <div onClick={onMaximize} className="meun-but">
      <i className="iconfont mt-square" />
    </div>
    <div onClick={onClose} className="meun-but">
      <i className="iconfont mt-guanbi" />
    </div>
  </div>
);

/**
 * 菜单布局组件
 * 包含搜索工具栏、聊天列表和窗口控制
 * TODO: 添加搜索历史记录功能
 * TODO: 实现拖拽调整布局大小
 * TODO: 添加快捷键支持
 */
function MeunLayout() {
  const [show, setShow] = useState(false);
  const [slShow, setSlShow] = useState(false);

  // 窗口控制处理函数
  const handleClose = () => window.electron.ipcRenderer.send('win-closed');
  const handleMaximize = () => window.electron.ipcRenderer.send('window-max');
  const handleMinimize = () => window.electron.ipcRenderer.send('window-min');

  // 搜索相关处理函数
  const handleBlur = () => {
    if (!slShow) {
      setShow(false);
    }
  };

  const handleInputChange = (value: string) => {
    // TODO: 实现搜索防抖
    console.log(value);
  };

  const handleFocus = () => {
    setShow(true);
  };

  const handleOutsideClick = () => {
    setSlShow(false);
    if (show) {
      setShow(false);
    }
  };

  return (
    <div className="base-meun-layout">
      <div className="meun-item-l">
        <div className="meun-t">
          <UserlTool
            blurFun={handleBlur}
            inputChange={handleInputChange}
            FocudFun={handleFocus}
          />
        </div>
        {/* TODO: 添加滚动加载更多功能 */}
        <div onMouseMove={() => setSlShow(true)} className="meun-mian">
          {show ? <SoushuoList /> : <ImList />}
        </div>
      </div>
      <div onClick={handleOutsideClick} className="meun-item-r">
        <div className="meun-t">
          <div className="meun-t-tool">
            <WindowControls
              onClose={handleClose}
              onMaximize={handleMaximize}
              onMinimize={handleMinimize}
            />
          </div>
          <div className="meun-b-box" />
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default memo(MeunLayout);
