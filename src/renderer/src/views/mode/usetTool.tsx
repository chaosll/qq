import React, { memo, useState } from 'react';
import { Button, Collapse, CollapseProps, Dropdown, Input, MenuProps, Modal } from 'antd';
import ItemList from './itemList';

interface UserToolProps {
  blurFun: (value: boolean) => void;
  inputChange: (value: string) => void;
  FocudFun: (value: boolean) => void;
}

// TODO: 移动到统一的配置文件
const ADD_MENU_ITEMS: MenuProps['items'] = [
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

/**
 * 搜索输入框组件
 */
const SearchInput: React.FC<{
  onFocus: () => void;
  onChange: (value: string) => void;
  onBlur: () => void;
}> = ({ onFocus, onChange, onBlur }) => (
  <Input
    onFocus={onFocus}
    onChange={(e) => onChange(e.currentTarget.value)}
    onBlur={onBlur}
    prefix={<i className="iconfont mt-31sousuo" style={{ color: 'rgba(0,0,0,.25)' }} />}
    size="small"
    allowClear
    placeholder="搜索"
  />
);

/**
 * 创建群聊模态框组件
 */
const CreateGroupModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  // 生成列表项
  const generateItems = () => {
    return Array(4).fill(null).map((_, i) => <ItemList key={i} />);
  };

  // 折叠面板配置
  const collapseItems: CollapseProps['items'] = [
    {
      key: '1',
      label: '我的设备',
      children: <div>{generateItems()}</div>,
      extra: <div className="shuzhi">0/10</div>,
    },
    {
      key: '2',
      label: '特别关心',
      children: <div>{generateItems()}</div>,
      extra: <div className="shuzhi">0/10</div>,
    },
    {
      key: '3',
      label: '我的好友',
      children: <div>{generateItems()}</div>,
      extra: <div className="shuzhi">0/10</div>,
    },
  ];

  return (
    <Modal
      className="meun-Model"
      closable={false}
      footer={null}
      open={isOpen}
      width={560}
      maskClosable={false}
      onCancel={onClose}
    >
      <div className="model-main">
        <div className="model-main-l">
          <div className="model-l-top">
            <SearchInput
              onFocus={() => { }}
              onChange={() => { }}
              onBlur={() => { }}
            />
          </div>
          <div className="model-l-box">
            <Collapse
              defaultActiveKey={['1']}
              ghost
              size="small"
              items={collapseItems}
            />
          </div>
        </div>
        <div className="model-main-r">
          <div className="model-r-text">创建群聊</div>
          <div className="model-r-c" />
          <div className="model-r-b">
            <Button type="primary">确认</Button>
            <Button onClick={onClose}>取消</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

/**
 * 用户工具组件
 * 包含搜索和快捷操作功能
 * TODO: 添加搜索历史记录
 * TODO: 实现群聊创建逻辑
 * TODO: 添加好友/群功能实现
 * TODO: 添加快捷键支持
 */
const UserTool: React.FC<UserToolProps> = ({
  blurFun,
  inputChange,
  FocudFun,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddClick = (key: string) => {
    if (key === '1') {
      setIsModalOpen(true);
    }
    // TODO: 实现其他菜单项的点击处理
  };

  return (
    <>
      <div className="meun-t-tool" />
      <div className="meun-b-box">
        <div className="meun-input-box">
          <div className="meun-input">
            <SearchInput
              onFocus={() => FocudFun(true)}
              onChange={inputChange}
              onBlur={() => blurFun(false)}
            />
          </div>
          <div className="meun-button">
            <Dropdown
              menu={{
                items: ADD_MENU_ITEMS,
                onClick: ({ key }) => handleAddClick(key)
              }}
              trigger={['click']}
              placement="bottomLeft"
            >
              <Button
                size="small"
                className="meun-button-icon"
                icon={<i className="iconfont mt-add" />}
              />
            </Dropdown>
          </div>
        </div>
      </div>

      <CreateGroupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default memo(UserTool);
