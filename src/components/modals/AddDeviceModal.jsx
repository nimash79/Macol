import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomInput from "../shared/CustomInput";
import CustomButton from "../shared/CustomButton";

const AddDeviceModal = ({ isOpen, onClose, onSubmit }) => {
    const [count, setCount] = useState();
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
          >
            <p className="title">افزودن دستگاه</p>
            <CustomInput
              placeholder="تعداد دستگاه را وارد کنید"
              containerStyle={{ marginBottom: 32 }}
              type="number"
              onChange={(e) => setCount(e.target.value)}
            />
            <CustomButton text={"تایید"} style={{marginBottom: 52}} onClick={() => onSubmit(count)} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddDeviceModal;
