import React, { PropsWithChildren, useRef } from "react";
import { createPortal } from "react-dom";

import styles from "./Modal.module.css";
import { useClickOutside } from "hooks/useClickOutside/useClickOutside";
import { useKeyDown } from "hooks/useKeyDown/useKeyDown";

type Props = {
  isOpen: boolean;
  handleClose: VoidFunction;
};

export const Modal = (props: PropsWithChildren<Props>) => {
  const { isOpen, handleClose, children } = props;

  const contentRef = useRef<HTMLDivElement>(null);

  useClickOutside(handleClose, contentRef);
  useKeyDown(["Escape"], handleClose);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className={styles.modal} data-testid="modal-overlay">
      <div className={styles.content} ref={contentRef} data-testid="modal-content">
        {children}
        <button className={styles.close} type="button" onClick={handleClose} data-testid="modal-close">
          X
        </button>
      </div>
    </div>,
    document.getElementById("portal")!,
  );
};
