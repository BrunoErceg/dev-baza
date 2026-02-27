import { useEffect, useRef } from "react";

import { cn } from "@lib/utils";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";

export function OverlayScrollbar({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const osRef = useRef<any>(null);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const osInstance = osRef.current?.osInstance();
      if (osInstance) {
        const { scrollOffsetElement } = osInstance.elements();
        scrollOffsetElement.scrollTo({
          top: scrollOffsetElement.scrollHeight,
          behavior: "instant",
        });
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <OverlayScrollbarsComponent
      ref={osRef}
      defer
      options={{
        scrollbars: {
          autoHide: "leave",
          theme: "os-theme-dark",
        },
      }}
      className={cn("flex p-4", className)}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
}
