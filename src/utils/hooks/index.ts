import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { storage } from "../config/firebase";

export const useDialogState = (defaultState = false) => {
  const [open, setOpen] = useState(defaultState);
  const pathname = usePathname();
  const initiaslPathname = useRef(pathname);

  useEffect(() => {
    if (pathname !== initiaslPathname.current) {
      setOpen(false);
      initiaslPathname.current = pathname;
    }
  }, [pathname, open]);

  return [open, setOpen] as const;
}

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false)
  const [percent, setPercent] = useState(0)

  const handleUpload = async (files: any): Promise<string[]> => {
    if (!files?.length) {
      return []
    }

    setUploading(true)

    const uploadTasks = Array.from(files).map((files: any) => {
      console.log("Processing files:", files.name)
      const storageRef = ref(storage, `/files/${files.name}`)
      const uploadTask = uploadBytesResumable(storageRef, files)

      return new Promise<string>((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
            )
            setPercent(percent)
            console.log(`Upload progress: ${percent}%`)
          },
          reject,
          () => {
            console.log("Upload completed, getting download URL")
            getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject)
          },
        )
      })
    })

    try {
      const imageUrls = await Promise.all(uploadTasks)
      console.log("All uploads completed, URLs:", imageUrls)
      setUploading(false)
      return imageUrls
    } catch (err) {
      console.error("Upload failed:", err)
      if (err instanceof Error) {
        console.error("Error message:", err.message)
        console.error("Error stack:", err.stack)
      }
      setUploading(false)
      return []
    }
  }

  return [{ uploading, percent }, handleUpload] as const
}

