import { SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Input, InputRef } from 'antd';
import type { AutoCompleteProps } from 'antd/es/auto-complete';
import classNames from 'classnames';
import useMergedState from 'rc-util/es/hooks/useMergedState';
import React, { useRef } from 'react';
import styles from './index.module.less';

export type HeaderSearchProps = {
  onSearch?: (value?: string) => void;
  onChange?: (value?: string) => void;
  onVisibleChange?: (b: boolean) => void;
  className?: string;
  placeholder?: string;
  options: AutoCompleteProps['options'];
  defaultVisible?: boolean;
  visible?: boolean;
  defaultValue?: string;
  value?: string;
};

const HeaderSearch: React.FC<HeaderSearchProps> = props => {
  const {
    className,
    defaultValue,
    onVisibleChange,
    placeholder,
    visible,
    defaultVisible,
    value,
    onChange,
    ...restProps
  } = props;

  const inputRef = useRef<InputRef | null>(null);

  const [innerValue, setValue] = useMergedState<string | undefined>(defaultValue, {
    value,
    onChange,
  });

  const [searchMode, setSearchMode] = useMergedState(defaultVisible ?? false, {
    value: visible,
    onChange: onVisibleChange,
  });

  const inputClass = classNames(styles.input, {
    [styles.show]: searchMode,
  });
  return (
    <div
      role='button'
      tabIndex={0}
      className={classNames(className, styles.headerSearch)}
      onClick={() => {
        setSearchMode(true);
        if (searchMode && inputRef.current) {
          inputRef.current.focus();
        }
      }}
      onTransitionEnd={({ propertyName }) => {
        if (propertyName === 'width' && !searchMode) {
          if (onVisibleChange) {
            onVisibleChange(searchMode);
          }
        }
      }}
    >
      <SearchOutlined
        key='Icon'
        style={{
          cursor: 'pointer',
        }}
      />
      <AutoComplete
        key='AutoComplete'
        className={inputClass}
        value={innerValue}
        options={restProps.options}
        onChange={e => {
          setValue(e);
        }}
        dropdownMatchSelectWidth={300}
        filterOption={(inputValue, option) => {
          if (option?.options) {
            return option.options.some((v: any) => v.value.includes(inputValue));
          }
          if (option?.value) {
            return option.value.toString().includes(inputValue);
          }
        }}
      >
        <Input
          size='small'
          ref={inputRef}
          defaultValue={defaultValue}
          aria-label={placeholder}
          placeholder={placeholder}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              if (restProps.onSearch) {
                restProps.onSearch(e.currentTarget.value);
              }
            }
          }}
          onBlur={() => {
            setSearchMode(false);
          }}
        />
      </AutoComplete>
    </div>
  );
};

export default HeaderSearch;
