import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import screenfull from 'screenfull';

type ScreenFullProps = {
  value?: boolean;
  onChange?: (isFullscreen: boolean) => void;
};

const ScreenFull = ({ onChange, value: propValue }: ScreenFullProps) => {
  const [isFullscreen, setIsFullscreen] = useState(propValue);

  const change = useCallback(() => {
    const fullscreen = (screenfull as any).isFullscreen;
    if (fullscreen) {
      document.body.classList.add('fullscreen');
    } else {
      document.body.classList.remove('fullscreen');
    }
    setIsFullscreen(fullscreen);
    onChange?.(fullscreen);
  }, [onChange]);

  useEffect(() => {
    const init = () => {
      if (screenfull.isEnabled) {
        screenfull.on('change', change);
      }
    };

    const destroy = () => {
      if (screenfull.isEnabled) {
        screenfull.off('change', change);
      }
    };
    init();
    return () => destroy();
  }, [change]);

  const handleClick = () => {
    if (!screenfull.isEnabled) {
      message.warn({
        content: 'you browser can not work',
        type: 'warning',
      });
      return false;
    }
    screenfull.toggle();
  };

  return (
    <Button
      size='small'
      icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
      onClick={handleClick}
    />
  );
};

export default ScreenFull;
