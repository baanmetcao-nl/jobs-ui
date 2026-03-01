"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src?: string;
  alt: string;
  size?: 60;
};

export default function CompanyLogo({ src, alt, size = 60 }: Props) {
  const [imgSrc, setImgSrc] = useState(src || "/logo.png");

  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full overflow-hidden bg-white flex items-center justify-center"
    >
      <Image
        src={imgSrc}
        alt={alt}
        width={size}
        height={size}
        onError={() => setImgSrc("/logo.png")}
        style={{ objectFit: "contain" }}
        className="object-contain"
        unoptimized
      />
    </div>
  );
}
