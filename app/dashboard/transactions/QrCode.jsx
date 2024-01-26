"use client";
import React, { createRef } from "react";
import { Modal } from "antd";
import QrCode from "react-qr-code";
import { useScreenshot, createFileName } from "use-react-screenshot";
import CustomButton from "@/app/ui/reusableComponents/CustomButton";

const QrCodeComponent = ({ open, handleClose, url, user }) => {
  const ref = createRef(null);
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });

  const download = (image, { name = "QR Code", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = () => takeScreenShot(ref.current).then(download);

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      title={`Generated QR Code ${user ? "for" : ""} ${user ? user : ""}`}
      centered
      footer
      width={620}
    >
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
        }}
        ref={ref}
      >
        <QrCode value={url} />
      </div>
      <CustomButton
        name={"Take Screenshot"}
        onClick={downloadScreenshot}
        className={
          "bg-[#cb7529] h-[30px] text-[16px] text-white rounded-md p-[6px] mt-2"
        }
      />
    </Modal>
  );
};

export default QrCodeComponent;
