import { memo, useState } from 'react'
import { Button, Segmented, Collapse } from 'antd'
import type { CollapseProps } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import ItemList from './itemList'
function HaoyouList() {
  type Align = '好友' | '群聊';
  const [alignValue, setAlignValue] = useState<Align>('好友');
  const viewsItem = (id, i) => {
    let im = [1, 2, 3, 4]
    let list = im.map((item, i) => <ItemList></ItemList>)
    return <div>
      {list}
    </div>
  }

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: '我的设备',
      children: viewsItem(1, 1),
      extra: <div className="shuzhi">0/10</div>,
    },
    {
      key: '2',
      label: '特别关心',
      children: viewsItem(1, 1),
      extra: <div className="shuzhi">0/10</div>,

    },
    {
      key: '3',
      label: '我的好友',
      children: viewsItem(1, 1),
      extra: <div className="shuzhi">0/10</div>,

    },
  ];
  const items2: CollapseProps['items'] = [
    {
      key: '1',
      label: '置顶群聊',
      children: <div>11</div>,
      extra: <div className="shuzhi">0</div>,
    },
    {
      key: '2',
      label: '未命名的群聊',
      children: <div>111</div>,
      extra: <div className="shuzhi">0</div>,
    },
    {
      key: '3',
      label: '我创建的群聊',
      children: <div>111</div>,
      extra: <div className="shuzhi">0</div>,
    },
    {
      key: '4',
      label: '我管理的群聊',
      children: <div>111</div>,
      extra: <div className="shuzhi">0</div>,
    },
    {
      key: '5',
      label: '我加入的群聊',
      children: <div>111</div>,
      extra: <div className="shuzhi">0</div>,
    },
  ];

  return <>
    <div className="hy-main">
      <Button className="hy-button">
        <i className="iconfont mt-friendadd"></i>
        好友管理器</Button>
    </div>
    <div className="listBox">
      <div className="item-list">
        <div className="item-text">好友通知</div>
        <div className="iconfont "><RightOutlined style={{ fontSize: "14px", color: "#bbbbbb" }} /></div>
      </div>
      <div className="item-list">
        <div className="item-text">群通知</div>
        <div className="iconfont "><RightOutlined style={{ fontSize: "14px", color: "#bbbbbb" }} /></div>
      </div>
    </div>
    <div className="tab-main">
      <Segmented
        defaultValue="好友"
        style={{ marginBottom: 8, width: 100 + "%", marginTop: 15, padding: 5 }}
        onChange={(value) => setAlignValue(value as Align)}
        options={['好友', '群聊']}
        block
      />
      <Collapse
        defaultActiveKey={['1']}
        ghost
        size="small"
        items={alignValue === '好友' ? items : items2}
      />


    </div>

  </>
}

export default memo(HaoyouList)
