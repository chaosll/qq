import React, { memo, useState } from 'react'
import UserlTool from '../mode/usetTool'
import SoushuoList from '../mode/soushuoList'
import HaoyouList from '../mode/haoyouList'
import ImList from '../mode/imList'

// TODO: 创建统一的类型定义文件
interface SearchToolProps {
  blurFun: (e: React.FocusEvent) => void;
  inputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  FocudFun: (e: React.FocusEvent) => void;
}

interface WindowControlProps {
  onClose: () => void;
  onMaximize: () => void;
  onMinimize: () => void;
}

/**
 * 窗口控制按钮组件
 * TODO: 将此组件移动到共享组件目录
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
 * 用户布局组件
 * 包含用户列表和搜索功能
 * TODO: 添加用户分组功能
 * TODO: 实现用户在线状态实时更新
 * TODO: 添加用户备注功能
 */
function UsersLayout() {

  const closeFun = () => {
    window.electron.ipcRenderer.send("win-closed")
  }

  const maxFun = () => {
    window.electron.ipcRenderer.send("window-max")
  }

  const minFun = () => {
    window.electron.ipcRenderer.send("window-min")
  }
  const [show, setShow] = useState(false)
  const [slShow, setSlShow] = useState(false)


  const BlurFun = (e) => {
    if (!slShow) {
      setShow(false)
    }
    console.log(e)
  }
  const inputChange = (e) => {
    console.log(e)
  }
  const FocudFun = (e) => {
    console.log(e)
    setShow(true)
  }
  const out = () => {
    console.log(show, 'show')
    setSlShow(false)
    if (show === true) {
      setShow(false)
    }
  }

  return <>
    <div className="base-meun-layout">
      <div className="meun-item-l">
        <div className="meun-t">
          <UserlTool blurFun={BlurFun}
            inputChange={inputChange}
            FocudFun={FocudFun}
          />
        </div>
        <div onMouseMove={() => setSlShow(true)} className="meun-mian">
          {
            show === true ?
              <SoushuoList />
              :
              <HaoyouList />
          }
        </div>
      </div>
      <div onClick={() => out()} className="meun-item-r">
        <div className="meun-t">
          <div className="meun-t-tool">
            <WindowControls
              onClose={closeFun}
              onMaximize={maxFun}
              onMinimize={minFun}
            />
          </div>
          <div className="meun-b-box"></div>
        </div>



      </div>
    </div>
  </>
}

export default memo(UsersLayout)
