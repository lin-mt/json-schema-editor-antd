import React, { ReactNode } from 'react';
import { Button, Tooltip } from '@arco-design/web-react';
import { ButtonProps } from '@arco-design/web-react/es/Button';

/**
 * @title TooltipButton
 */
export interface TooltipButtonProps {
  children?: any;
  /**
   * @zh 按钮的标题
   * @defaultValue `Hello Arco`
   * @version 1.0.0
   */
  title?: ReactNode;
  /**
   * @zh 按钮的提示
   */
  btnProps?: ButtonProps;
}

const TooltipButton = (props: TooltipButtonProps) => {
  const { children, title = 'Hello Arco', btnProps } = props;
  return (
    <div className="arco-rc-tooltip-button">
      {title ? (
        <Tooltip content={title}>
          <Button {...btnProps}>{children}</Button>
        </Tooltip>
      ) : (
        <Button {...btnProps}>{children}</Button>
      )}
    </div>
  );
};

export default TooltipButton;
