import React, { memo } from 'react'
import { Avatar, Image, Button } from 'antd'

// TODO: 移动到统一的配置文件
const STATUS_COLORS = {
  online: '#49d404',
  offline: '#999999',
  away: '#ff9900'
};

const GENDER_COLORS = {
  male: '#0ae3e3',
  female: '#ff69b4',
  other: '#999999'
};

interface UserInfo {
  avatar: string;
  name: string;
  uid: string;
  status: 'online' | 'offline' | 'away';
  gender: 'male' | 'female' | 'other';
  isVerified: boolean;
  location: string;
  photos: string[];
  introduction: string;
}

interface UserBoxProps {
  userInfo?: UserInfo;
  onEditProfile?: () => void;
  onSendMessage?: () => void;
}

/**
 * 用户信息列表项组件
 */
const UserInfoItem: React.FC<{
  label: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ label, children, style }) => (
  <div className="user-list-1" style={style}>
    <div className="user-l1-text">{label}</div>
    <div className="user-l2-text" style={style}>
      {children}
    </div>
  </div>
);

/**
 * 用户相册组件
 */
const UserPhotos: React.FC<{ photos: string[] }> = ({ photos }) => (
  <div className="user-l2-text" style={{ height: 70 }}>
    {photos.map((photo, index) => (
      <div key={index} className="user-img-box">
        <Image width={60} preview={false} src={photo} />
      </div>
    ))}
  </div>
);

/**
 * 用户信息卡片组件
 * TODO: 添加编辑功能
 * TODO: 添加头像上传功能
 * TODO: 添加相册管理功能
 * TODO: 实现实时状态更新
 */
const UserBox: React.FC<UserBoxProps> = ({
  userInfo = DEFAULT_USER_INFO,
  onEditProfile,
  onSendMessage
}) => {
  return (
    <div className="userBox">
      <div className="user-box-top">
        <div className="ser-box-Avatar">
          <Avatar size={60} src={userInfo.avatar} />
        </div>
        <div className="user-box-con">
          <div className="user-text-t">{userInfo.name}</div>
          <div className="user-text-c">UID:{userInfo.uid}</div>
          <div className="user-text-b">
            <i
              className="iconfont mt-round_record_fill"
              style={{ color: STATUS_COLORS[userInfo.status] }}
            />
            <span style={{ marginLeft: 5, fontSize: 12 }}>
              [ {userInfo.status === 'online' ? '在线' : '离线'} ]
            </span>
          </div>
        </div>
        <div className="user-box-r">
          <i
            className={`iconfont mt-xingbie${userInfo.gender === 'male' ? 'nan' : 'nv'}`}
            style={{ color: GENDER_COLORS[userInfo.gender] }}
          />
        </div>
      </div>

      <UserInfoItem label="认证">
        {userInfo.isVerified && <i className="iconfont mt-yirenzheng-copy" />}
      </UserInfoItem>

      <UserInfoItem label="所在地">
        {userInfo.location}
      </UserInfoItem>

      <UserInfoItem label="相册" style={{ height: 70, marginTop: 4, marginBottom: 1 }}>
        <UserPhotos photos={userInfo.photos} />
      </UserInfoItem>

      <UserInfoItem
        label="简介"
        style={{ height: 80, fontSize: 14, lineHeight: 1.5 }}
      >
        {userInfo.introduction}
      </UserInfoItem>

      <div className="user-list-2">
        <Button className="button" onClick={onEditProfile}>
          编辑详情
        </Button>
        <Button type="primary" className="button" onClick={onSendMessage}>
          发送消息
        </Button>
      </div>
    </div>
  );
};

// TODO: 从API获取用户信息
const DEFAULT_USER_INFO: UserInfo = {
  avatar: "https://tse1-mm.cn.bing.net/th/id/OIP-C.zgiDOfpjSb5jqL9bSPKK8QHaD8?w=295&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
  name: "用户姓名",
  uid: "3392344234",
  status: "online",
  gender: "male",
  isVerified: true,
  location: "成都",
  photos: [
    "https://ts1.tc.mm.bing.net/th/id/R-C.4a10cc5456ddb0170e461fc60b002a98?rik=E49HgzWnOvklZw&riu=http%3a%2f%2fbeddingnewsnow.com%2fwp-content%2fuploads%2f2024%2f06%2fphotos.png&ehk=Ko4PmfmN7jF%2baqhjYS9ihVYeD80x8yXuvld9vSOUIo8%3d&risl=&pid=ImgRaw&r=0",
    "https://ts1.tc.mm.bing.net/th/id/R-C.4a10cc5456ddb0170e461fc60b002a98?rik=E49HgzWnOvklZw&riu=http%3a%2f%2fbeddingnewsnow.com%2fwp-content%2fuploads%2f2024%2f06%2fphotos.png&ehk=Ko4PmfmN7jF%2baqhjYS9ihVYeD80x8yXuvld9vSOUIo8%3d&risl=&pid=ImgRaw&r=0",
    "https://ts1.tc.mm.bing.net/th/id/R-C.4a10cc5456ddb0170e461fc60b002a98?rik=E49HgzWnOvklZw&riu=http%3a%2f%2fbeddingnewsnow.com%2fwp-content%2fuploads%2f2024%2f06%2fphotos.png&ehk=Ko4PmfmN7jF%2baqhjYS9ihVYeD80x8yXuvld9vSOUIo8%3d&risl=&pid=ImgRaw&r=0"
  ],
  introduction: "收到感受感受根深蒂固烧过水帝国时代根深蒂固烧过水当时的是的感受到是的感受到公司"
};

export default memo(UserBox);
