import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const DeleteDeviceModal = ({ isOpen, onClose, onSubmit }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="edit-name-modal"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ direction: "ltr" }}
          >
            <p className="title">آیا از حذف دستگاه مطمئن هستید؟</p>
            <div className="modal-buttons">
              <button type="button" className="modal-submit-button" onClick={onSubmit}>تایید</button>
              <button type="button" className="modal-cancel-button" onClick={onClose}>لغو</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DeleteDeviceModal;
