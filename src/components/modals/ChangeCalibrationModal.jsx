import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomInput from "../shared/CustomInput";
import CustomButton from "../shared/CustomButton";

const ChangeCalibrationModal = ({ isOpen, onClose, onSubmit, calibration }) => {
  const calibrationRef = useRef(null);
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
            <p className="title">دمای کالیبراسیون</p>
            <CustomInput
              ref={calibrationRef}
              placeholder="میزان دمای کالیبراسیون را وارد کنید"
              containerStyle={{ marginBottom: 32 }}
              type="number"
              defaultValue={calibration}
            />
            <CustomButton
              text={"تایید"}
              style={{ marginBottom: 52 }}
              onClick={() => onSubmit(calibrationRef.current.value)}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChangeCalibrationModal;
