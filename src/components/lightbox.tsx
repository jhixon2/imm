"use client";

import Image from "next/image";
import { Photo } from "../types";

type LightboxProps = {
  item: Photo | null;
  onClose: () => void;
};

export default function Lightbox({ item, onClose }: LightboxProps) {
  if (!item) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(57,55,54,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
        <div
            style={{
            backgroundColor: "#e3ddda",
            padding: "1rem",
            maxWidth: "50%",
            maxHeight: "75%",
            overflowY: "auto",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "0px",
            }}
            onClick={(e) => e.stopPropagation()}
        >
        <h2 style={{fontSize: "24px", marginTop: "0px"}}>{item.title}</h2>
        <p style={{fontSize: "18px"}}>{item.description}</p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
          {item.images?.map((img, idx) => (
            <Image
              key={idx}
              src={img.asset?.url || ""}
              alt={item.title + idx}
              width={200}
              height={200}
              style={{ objectFit: "cover" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
        