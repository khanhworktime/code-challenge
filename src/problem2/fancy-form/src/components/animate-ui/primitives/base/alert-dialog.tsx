import * as React from "react";
import { AlertDialog as AlertDialogPrimitive } from "@base-ui-components/react/alert-dialog";
import { AnimatePresence, motion, type HTMLMotionProps } from "motion/react";

import { useControlledState } from "@/hooks/use-controlled-state";
import { getStrictContext } from "@/lib/get-strict-context";
import { cn } from "@/lib/utils";

type AlertDialogContextType = {
  isOpen: boolean;
  setIsOpen: AlertDialogProps["onOpenChange"];
};

const [AlertDialogProvider, useAlertDialog] =
  getStrictContext<AlertDialogContextType>("AlertDialogContext");

type AlertDialogProps = React.ComponentProps<typeof AlertDialogPrimitive.Root>;

function AlertDialog(props: AlertDialogProps) {
  const [isOpen, setIsOpen] = useControlledState({
    value: props?.open,
    defaultValue: props?.defaultOpen,
    onChange: props?.onOpenChange,
  });

  return (
    <AlertDialogProvider value={{ isOpen, setIsOpen }}>
      <AlertDialogPrimitive.Root
        data-slot="alert-dialog"
        {...props}
        onOpenChange={setIsOpen}
      />
    </AlertDialogProvider>
  );
}

type AlertDialogTriggerProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Trigger
>;

function AlertDialogTrigger(props: AlertDialogTriggerProps) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  );
}

type AlertDialogPortalProps = Omit<
  React.ComponentProps<typeof AlertDialogPrimitive.Portal>,
  "keepMounted"
>;

function AlertDialogPortal(props: AlertDialogPortalProps) {
  const { isOpen } = useAlertDialog();

  return (
    <AnimatePresence>
      {isOpen && (
        <AlertDialogPrimitive.Portal
          data-slot="alert-dialog-portal"
          keepMounted
          {...props}
        />
      )}
    </AnimatePresence>
  );
}

type AlertDialogBackdropProps = Omit<
  React.ComponentProps<typeof AlertDialogPrimitive.Backdrop>,
  "render"
> &
  HTMLMotionProps<"div">;

function AlertDialogBackdrop({
  className,
  transition = { duration: 0.2, ease: "easeInOut" },
  ...props
}: AlertDialogBackdropProps) {
  return (
    <AlertDialogPrimitive.Backdrop
      data-slot="alert-dialog-backdrop"
      render={
        <motion.div
          key="alert-dialog-backdrop"
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(4px)" }}
          transition={transition}
          className={cn(
            "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
            className,
          )}
          {...props}
        />
      }
    />
  );
}

type AlertDialogFlipDirection = "top" | "bottom" | "left" | "right";

type AlertDialogPopupProps = Omit<
  React.ComponentProps<typeof AlertDialogPrimitive.Popup>,
  "render"
> &
  HTMLMotionProps<"div"> & {
    from?: AlertDialogFlipDirection;
  };

function AlertDialogPopup({
  className,
  from = "top",
  initialFocus,
  finalFocus,
  transition = { type: "spring", stiffness: 150, damping: 25 },
  ...props
}: AlertDialogPopupProps) {
  const initialRotation =
    from === "bottom" || from === "left" ? "20deg" : "-20deg";
  const isVertical = from === "top" || from === "bottom";
  const rotateAxis = isVertical ? "rotateX" : "rotateY";

  return (
    <AlertDialogPrimitive.Popup
      initialFocus={initialFocus}
      finalFocus={finalFocus}
      render={
        <motion.div
          key="alert-dialog-popup"
          data-slot="alert-dialog-popup"
          initial={{
            opacity: 0,
            filter: "blur(4px)",
            transform: `perspective(500px) ${rotateAxis}(${initialRotation}) scale(0.8)`,
          }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
            transform: `perspective(500px) ${rotateAxis}(0deg) scale(1)`,
          }}
          exit={{
            opacity: 0,
            filter: "blur(4px)",
            transform: `perspective(500px) ${rotateAxis}(${initialRotation}) scale(0.8)`,
          }}
          transition={transition}
          className={cn(
            "fixed left-1/2 top-1/2 z-50 grid w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 gap-4 rounded-md border bg-popover p-6 text-popover-foreground shadow-lg outline-none",
            className,
          )}
          {...props}
        />
      }
    />
  );
}

type AlertDialogCloseProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Close
>;

function AlertDialogClose(props: AlertDialogCloseProps) {
  return (
    <AlertDialogPrimitive.Close data-slot="alert-dialog-close" {...props} />
  );
}

type AlertDialogHeaderProps = React.ComponentProps<"div">;

function AlertDialogHeader({ className, ...props }: AlertDialogHeaderProps) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

type AlertDialogFooterProps = React.ComponentProps<"div">;

function AlertDialogFooter({ className, ...props }: AlertDialogFooterProps) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

type AlertDialogTitleProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Title
>;

function AlertDialogTitle({ className, ...props }: AlertDialogTitleProps) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn("text-lg font-semibold text-popover-foreground", className)}
      {...props}
    />
  );
}

type AlertDialogDescriptionProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Description
>;

function AlertDialogDescription({
  className,
  ...props
}: AlertDialogDescriptionProps) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogBackdrop,
  AlertDialogClose,
  AlertDialogTrigger,
  AlertDialogPopup,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  useAlertDialog,
  type AlertDialogProps,
  type AlertDialogTriggerProps,
  type AlertDialogPortalProps,
  type AlertDialogCloseProps,
  type AlertDialogBackdropProps,
  type AlertDialogPopupProps,
  type AlertDialogHeaderProps,
  type AlertDialogFooterProps,
  type AlertDialogTitleProps,
  type AlertDialogDescriptionProps,
  type AlertDialogContextType,
  type AlertDialogFlipDirection,
};
