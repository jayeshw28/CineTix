import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

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
};
