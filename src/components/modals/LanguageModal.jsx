import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomInput from "../shared/CustomInput";
import CustomButton from "../shared/CustomButton";
import { useTranslation } from "react-i18next";

const LanguageModal = ({
  isOpen,
  onClose,
  onSubmit,
  language,
  setLanguage,
}) => {
  const [count, setCount] = useState();
  const { t } = useTranslation();
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
            <p className="title">{t("languageModal:title")}</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <CustomButton
                text={t("languageModal:persian")}
                onClick={() => setLanguage("fa")}
                style={
                  language == "fa"
                    ? { flex: 0.45, backgroundColor: "#19f469" }
                    : {
                        flex: 0.45,
                        backgroundColor: "transparent",
                        borderColor: "#19f469",
                        color: "#19f469",
                        borderWidth: 1,
                        borderStyle: "solid"
                      }
                }
              />
              <CustomButton
                text={t("languageModal:english")}
                onClick={() => setLanguage("en")}
                style={
                  language == "en"
                    ? { flex: 0.45, backgroundColor: "#19f469" }
                    : {
                        flex: 0.45,
                        backgroundColor: "transparent",
                        borderColor: "#19f469",
                        color: "#19f469",
                        borderWidth: 1,
                        borderStyle: "solid"
                      }
                }
              />
            </div>
            <CustomButton
              text={t("languageModal:confirm")}
              style={{ marginBottom: 24 }}
              onClick={onSubmit}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LanguageModal;
