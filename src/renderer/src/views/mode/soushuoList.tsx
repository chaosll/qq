import React, { memo, useState } from 'react'
import { Avatar, Typography, Divider } from 'antd'
const { Text } = Typography;

// TODO: 移动到统一的类型定义文件
interface SearchSuggestion {
  id: number;
  avatar?: string;
  title: string;
  description: string;
  type: 'user' | 'group' | 'search';
}

interface SearchListProps {
  suggestions?: SearchSuggestion[];
  onSelect?: (suggestion: SearchSuggestion) => void;
  onTagClick?: (tag: string) => void;
}

/**
 * 搜索建议标签组件
 */
const SearchTags: React.FC<{ onTagClick: (tag: string) => void }> = ({ onTagClick }) => (
  <div className="ss-head-t-box">
    {['@我', '特别关心'].map(tag => (
      <div key={tag} onClick={() => onTagClick(tag)}>
        {tag}
      </div>
    ))}
  </div>
);

/**
 * 搜索结果项组件
 * TODO: 添加高亮匹配文本功能
 */
const SearchItem: React.FC<{
  item: SearchSuggestion;
  isSelected: boolean;
  onClick: () => void;
}> = ({ item, isSelected, onClick }) => {
  const textColor = isSelected ? '#fff' : '#333';
  const subTextColor = isSelected ? '#fff' : '#999999';

  return (
    <div className="im-item" onClick={onClick}>
      <div className="im-item-l">
        {item.type === 'search' ? (
          <div className="yuanxing">
            <i className="iconfont mt-31sousuo" />
          </div>
        ) : (
          <Avatar size={45} src={item.avatar} />
        )}
      </div>
      <div className="im-item-r">
        <div className="im-r-t">
          <Text
            style={{ color: textColor }}
            className="text-l"
            ellipsis
          >
            {item.title}
          </Text>
        </div>
        <div className="im-r-t">
          <Text
            style={{ color: subTextColor }}
            ellipsis
          >
            {item.description}
          </Text>
        </div>
      </div>
    </div>
  );
};

/**
 * 搜索列表组件
 * 显示搜索建议和结果
 * TODO: 添加搜索历史记录功能
 * TODO: 实现搜索结果分类展示
 * TODO: 添加无结果时的提示
 * TODO: 实现搜索结果的分页加载
 * TODO: 添加搜索结果排序功能
 * TODO: 支持键盘快捷操作
 */
const SoushuoList: React.FC<SearchListProps> = ({
  suggestions = DEFAULT_SUGGESTIONS,
  onSelect,
  onTagClick = () => { }
}) => {
  const [selectedId, setSelectedId] = useState<number>(-1);

  const handleSelect = (suggestion: SearchSuggestion) => {
    setSelectedId(suggestion.id);
    onSelect?.(suggestion);
  };

  return <>

    <div className="ss-head">
      <div className="ss-head-title">搜索建议</div>
      <SearchTags onTagClick={onTagClick} />
    </div>
    <div className="ss-list-mian">
      {suggestions.map(suggestion => (
        <SearchItem
          key={suggestion.id}
          item={suggestion}
          isSelected={selectedId === suggestion.id}
          onClick={() => handleSelect(suggestion)}
        />
      ))}
      <Divider />
      <SearchItem
        item={{
          id: -1,
          type: 'search',
          title: '进入搜索全部',
          description: '查找用户、群聊等'
        }}
        isSelected={false}
        onClick={() => {/* TODO: 实现全局搜索功能 */ }}
      />
    </div>

  </>
}

// TODO: 从API获取搜索建议
const DEFAULT_SUGGESTIONS: SearchSuggestion[] = Array(10).fill(null).map((_, index) => ({
  id: index,
  type: 'user',
  avatar: 'https://cn.bing.com/images/search?view=detailV2&ccid=sJQa4EnP&id=2FC9F047F3075AEF5606B2D1FE54DBABB753684E&thid=OIP.sJQa4EnP4SQrh17g6nIiNgHaE9&mediaurl=https%3a%2f%2fts1.tc.mm.bing.net%2fth%2fid%2fR-C.b0941ae049cfe1242b875ee0ea722236%3frik%3dTmhTt6vbVP7Rsg%26riu%3dhttp%253a%252f%252fwww.lionleaf.com%252fwp-content%252fuploads%252f2014%252f11%252f1415275_22821821.jpg%26ehk%3d7bK0H1iqq%252fkS48m0bbON6BfPoegjSZFfXu%252bC3ztcrvI%253d%26risl%3d%26pid%3dImgRaw%26r%3d0&exph=2592&expw=3872&q=image&simid=607996842765802699&FORM=IRPRST&ck=849EE8D68BFCFF1BC8B6A24923863079&selectedIndex=48&itb=0',
  title: '进入搜索全部',
  description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.'
}));

export default memo(SoushuoList);
