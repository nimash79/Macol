import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const DeleteDeviceModal = ({ isOpen, onClose, onSubmit, single = false }) => {
  const {t} = useTranslation();
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
            <p className="title">
              {single ? t("deleteDeviceModal:single") : t("deleteDeviceModal:multiple")}
            </p>
            <div className="modal-buttons">
              <button
                type="button"
                className="modal-submit-button"
                onClick={onSubmit}
              >
                {t("deleteDeviceModal:confirm")}
              </button>
              <button
                type="button"
                className="modal-cancel-button"
                onClick={onClose}
              >
                {t("deleteDeviceModal:cancel")}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DeleteDeviceModal;
