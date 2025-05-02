import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomInput from "./../shared/CustomInput";
import CustomButton from './../shared/CustomButton';

const DeviceInfoModal = ({ isOpen, onClose, deviceId }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{opacity: 0}}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="edit-name-modal"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{direction: "ltr"}}
          >
            <p className="title">آیدی دستگاه</p>
            <CustomInput
              defaultValue={deviceId}
              containerStyle={{ marginBottom: 32, opacity: 0.8, cursor: "not-allowed" }}
              disabled
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DeviceInfoModal;
