import {
  CloudUploadOutlined,
  DownloadOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import Editor from '@monaco-editor/react';
import { Button, Select, Space, Spin, Typography } from 'antd';
import classnames from 'classnames';
import { debounce } from 'lodash';
import type { editor } from 'monaco-editor';
import { KeyCode, KeyMod } from 'monaco-editor';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import storage from '@/utils/storage';
import { saveFile } from '@/utils';
import CodeBlock from '../CodeBlock';
import ImageUploaderModal from '../ImageUploader/Modal';
import ScreenFull from '../Screenfull';
import styles from './index.module.less';

export enum UEditorLanguage {
  Markdown = 'markdown',
  JavaScript = 'javascript',
  TypeScript = 'typescript',
  Css = 'css',
  Json = 'json',
}

const fileExtMap = new Map([
  [UEditorLanguage.Markdown, 'md'],
  [UEditorLanguage.JavaScript, 'js'],
  [UEditorLanguage.TypeScript, 'ts'],
  [UEditorLanguage.Css, 'css'],
  [UEditorLanguage.Json, 'json'],
]);

const TOOLBAR_HEIGHT = 48;
const SINGLE_LINE_HEIGHT = 24;
const MIN_ROWS = 34;
const MAX_ROWS = 40;

const getEditorCacheStorageKey = (id: string) => {
  return `ueditor-${id}`;
};

const setUEditorCache = debounce((id: string, content: string) => {
  return storage.set(getEditorCacheStorageKey(id), content);
}, 666);

export const getUEditorCache = (id: string) => {
  return storage.get(getEditorCacheStorageKey(id));
};

export interface UniversalEditorProps {
  value?: string;
  onChange?: (value?: string) => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  minRows?: number;
  maxRows?: number;
  // 编辑区域唯一 ID，默认为 window.location.pathname
  cacheID?: string | false;
  /** 是否禁用顶部工具栏 */
  disabledToolbar?: boolean;
  /** 是否禁用编辑器 minimap */
  disabledMinimap?: boolean;
  /** 是否禁用草稿缓存 */
  disabledCacheDraft?: boolean;
  /** 是否在 UI 上响应 Form 状态 */
  formStatus?: boolean;
  language?: UEditorLanguage;
  style?: React.CSSProperties;
  size?: 'small' | 'default';
  uploadPrefix?: string;
  height?: number | string;
}

const timestampToYMD = (timestamp: number) => new Date(timestamp).toLocaleString();

export const UniversalEditor: React.FC<UniversalEditorProps> = ({
  placeholder = '请输入内容',
  value = '',
  onChange,
  disabled,
  disabledMinimap,
  disabledToolbar,
  disabledCacheDraft,
  formStatus,
  style,
  size,
  loading,
  uploadPrefix,
  height = '80vh',
  ...props
}) => {
  const cacheID = props.cacheID || window.location.pathname;
  const [fullscreen, setFullscreen] = useState(false);
  const [isPreview, setPreview] = useState(false);
  const [uploaderModalVisible, setUploaderModalVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [language, setLanguage] = useState(props.language ?? UEditorLanguage.JavaScript);
  const editorRef = useRef<editor.IStandaloneCodeEditor>();

  const handleSaveContent = useCallback(() => {
    const time = timestampToYMD(Date.now());
    const fileExt = fileExtMap.get(language);
    const fileName = `${cacheID}-${time}.${fileExt}`;
    const content = editorRef.current?.getValue() ?? value ?? '';
    saveFile(content, fileName);
  }, [cacheID, language, value]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleResizeWidth = () => {
    const widthRatio = isPreview ? 0.5 : 1;
    const layoutInfo = editorRef.current?.getLayoutInfo();
    if (!layoutInfo) {
      throw new Error('layout is null');
    }
    editorRef.current?.layout({
      width: fullscreen
        ? window.innerWidth * widthRatio
        : containerRef.current!.clientWidth * widthRatio,
      height: layoutInfo.height,
    });
  };

  const handleResizeHeight = useCallback(() => {
    if (!editorRef.current) {
      return false;
    }

    const layoutInfo = editorRef.current.getLayoutInfo()!;
    let targetHeight = 0;

    if (fullscreen) {
      targetHeight = window.innerHeight - TOOLBAR_HEIGHT;
    } else {
      // 非全屏，则计算高度
      const maxHeight = (props.maxRows ?? MAX_ROWS) * SINGLE_LINE_HEIGHT;
      const minHeight = (props.minRows ?? MIN_ROWS) * SINGLE_LINE_HEIGHT;
      const contentHeight = editorRef.current.getContentHeight()!;
      const lineCount = editorRef.current.getModel()?.getLineCount() || 1;
      if (contentHeight) {
        if (contentHeight > maxHeight) {
          targetHeight = maxHeight;
        } else {
          const linesHeight = lineCount * SINGLE_LINE_HEIGHT;
          if (linesHeight < minHeight) {
            targetHeight = minHeight;
          } else {
            targetHeight = linesHeight;
          }
        }
      }
    }

    if (layoutInfo.height !== targetHeight) {
      editorRef.current.layout({
        width: layoutInfo.width,
        height: targetHeight,
      });
    }
  }, [fullscreen, props.maxRows, props.minRows]);

  const handleMount = (editorInstance: editor.IStandaloneCodeEditor) => {
    editorRef.current = editorInstance;
  };

  // 绑定键位 effect
  useEffect(() => {
    if (editorRef.current) {
      // Command + S = save content
      editorRef.current.addCommand(KeyMod.CtrlCmd | KeyCode.KeyS, handleSaveContent);
      // Esc = exit fullscreen
      editorRef.current.addCommand(KeyCode.Escape, () => setFullscreen(false));
      //
      editorRef.current.addCommand(KeyMod.Alt | KeyCode.KeyD, () => {
        editorRef.current?.trigger('anyString', 'editor.action.formatDocument', '');
      });
    }
  }, [handleSaveContent]);

  // 设置缓存 effect
  useEffect(() => {
    if (!disabledCacheDraft) {
      setUEditorCache(cacheID, value);
    }
  }, [disabledCacheDraft, value, cacheID]);

  // resize height effect
  useEffect(() => {
    const sizeDisposer = editorRef.current?.onDidContentSizeChange(handleResizeHeight);

    return () => {
      sizeDisposer?.dispose();
    };
  }, [handleResizeHeight, value]);

  // preview change effect
  useEffect(() => {
    handleResizeWidth();
  }, [handleResizeWidth, fullscreen, isPreview]);

  return (
    <div
      style={style}
      className={classnames(
        styles.universalEditor,
        formStatus && styles.formStatus,
        fullscreen && styles.fullScreen,
        size === 'small' && styles.small
      )}
    >
      {!disabledToolbar && (
        <div className={styles.toolbar}>
          <Space className={styles.left}>
            <Typography.Text type='secondary' strong className={styles.logo}>
              UEditor
            </Typography.Text>
            <Button
              size='small'
              disabled={disabled}
              icon={<DownloadOutlined />}
              onClick={handleSaveContent}
            />
          </Space>
          <Space className={styles.right}>
            {language === UEditorLanguage.Markdown && (
              <>
                <ImageUploaderModal
                  prefix={uploadPrefix ?? 'article'}
                  visible={uploaderModalVisible}
                  onClose={() => setUploaderModalVisible(false)}
                />
                <Button
                  size='small'
                  icon={<CloudUploadOutlined />}
                  onClick={() => setUploaderModalVisible(true)}
                />
                <Button
                  size='small'
                  disabled={disabled}
                  icon={isPreview ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                  onClick={() => setPreview(!isPreview)}
                />
              </>
            )}
            <Select
              size='small'
              value={language}
              onChange={setLanguage}
              disabled={disabled}
              className={styles.language}
              options={[
                {
                  label: 'Markdown',
                  value: UEditorLanguage.Markdown,
                },
                {
                  label: 'JavaScript',
                  value: UEditorLanguage.JavaScript,
                },
                {
                  label: 'TypeScript',
                  value: UEditorLanguage.TypeScript,
                },
                {
                  label: 'Css',
                  value: UEditorLanguage.Css,
                },
                {
                  label: 'Json',
                  value: UEditorLanguage.Json,
                },
              ]}
            />
            <ScreenFull value={fullscreen} onChange={setFullscreen} />
          </Space>
        </div>
      )}
      <Spin
        spinning={!!loading}
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
      >
        <div className={styles.container} ref={containerRef}>
          <Editor
            language={language}
            value={value}
            onChange={onChange}
            className={classnames(styles.editor, !value && styles.placeholder)}
            height={fullscreen ? '100vh' : height}
            loading={<Spin />}
            options={{
              automaticLayout: true,
              theme: 'vs',
              tabSize: 2,
              fontSize: 14,
              lineHeight: SINGLE_LINE_HEIGHT,
              smoothScrolling: true,
              readOnly: disabled,
              minimap: {
                enabled: !disabledMinimap,
              },
              // 文件夹
              folding: true,
              // 禁用右键菜单
              contextmenu: false,
              // 选中区域直角
              roundedSelection: false,
              // 底部不留空
              scrollBeyondLastLine: false,
              // 根据已有单词自动提示
              wordBasedSuggestions: true,
              // 回车命中选中词
              acceptSuggestionOnEnter: 'on',
              scrollbar: {
                // MARK: updateOptions 对 scrollbar.alwaysConsumeMouseWheel 暂时是无效的
                // https://github.com/microsoft/vscode/pull/127788
                // 滚动事件可冒泡至外层
                alwaysConsumeMouseWheel: false,
              },
            }}
            overrideServices={{
              placeholder,
            }}
            onMount={handleMount}
          />
          <CSSTransition
            in={isPreview}
            timeout={200}
            unmountOnExit
            classNames='fade-fast'
          >
            <div className={classnames(styles.preview)}>
              <CodeBlock value={value} className={styles.markdown} />
            </div>
          </CSSTransition>
        </div>
      </Spin>
    </div>
  );
};

export default UniversalEditor;
