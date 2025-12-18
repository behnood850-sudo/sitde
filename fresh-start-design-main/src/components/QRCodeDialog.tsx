import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";

interface QRCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  connectionLink: string;
  configName: string;
}

export function QRCodeDialog({ open, onOpenChange, connectionLink, configName }: QRCodeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-center text-foreground">
            QR کد - {configName}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-6">
          <div className="bg-white p-4 rounded-lg">
            <QRCodeSVG
              value={connectionLink}
              size={200}
              level="H"
              includeMargin
            />
          </div>
          <p className="mt-4 text-sm text-muted-foreground text-center">
            این QR کد را با اپلیکیشن خود اسکن کنید
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
