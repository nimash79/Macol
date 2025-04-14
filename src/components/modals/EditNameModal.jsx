import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomInput from "./../shared/CustomInput";
import CustomButton from './../shared/CustomButton';

const EditNameModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="modal-backdrop"
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="edit-name-modal"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <p className="title">ویرایش نام دستگاه</p>
            <CustomInput
              defaultValue={"دستگاه اتاق ۱"}
              containerStyle={{ marginBottom: 32 }}
            />
            <CustomButton text={"تایید"} style={{marginBottom: 52}} onClick={onClose} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EditNameModal;
