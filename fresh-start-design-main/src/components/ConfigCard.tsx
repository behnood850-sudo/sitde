import { useState } from "react";
import { Copy, QrCode, RefreshCw, Trash2, Check, Wifi, WifiOff } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConfigData } from "@/types/config";
import { QRCodeDialog } from "./QRCodeDialog";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface ConfigCardProps {
  config: ConfigData;
  onDelete: (id: string) => void;
}

export function ConfigCard({ config, onDelete }: ConfigCardProps) {
  const [showQR, setShowQR] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(config.connectionLink);
    setCopied(true);
    toast({
      title: "کپی شد!",
      description: "لینک اتصال کپی شد",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRenew = () => {
    navigate(`/renew/${config.id}`);
  };

  const handleDelete = () => {
    onDelete(config.id);
    setShowDeleteConfirm(false);
    toast({
      title: "حذف شد!",
      description: "کانفیگ با موفقیت حذف شد",
      variant: "destructive",
    });
  };

  return (
    <>
      <Card className="gradient-border bg-card/80 backdrop-blur-sm hover:bg-card/90 transition-all duration-300 animate-fade-in">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">{config.name}</h3>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
              config.status === 'active' 
                ? 'bg-success/20 text-success' 
                : 'bg-destructive/20 text-destructive'
            }`}>
              {config.status === 'active' ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
              {config.status === 'active' ? 'فعال' : 'غیرفعال'}
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <InfoItem label="حجم باقی‌مانده" value={config.remainingVolume} />
            <InfoItem label="روز باقی‌مانده" value={`${config.remainingDays} روز`} />
            <InfoItem label="تاریخ خرید" value={config.purchaseDate} />
            <InfoItem label="تاریخ انقضا" value={config.expiryDate} />
            <InfoItem label="پروتکل" value={config.protocol} />
            <InfoItem label="کد سرویس" value={config.serviceCode} isCode />
          </div>

          {/* Connection Link */}
          <div className="mb-4 p-3 bg-secondary/50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">لینک اتصال:</p>
            <p className="text-sm text-foreground truncate font-mono" dir="ltr">
              {config.connectionLink}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowQR(true)}
              className="flex-1 min-w-[100px]"
            >
              <QrCode className="w-4 h-4 ml-2" />
              نمایش QR
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              className="flex-1 min-w-[100px]"
            >
              {copied ? <Check className="w-4 h-4 ml-2" /> : <Copy className="w-4 h-4 ml-2" />}
              {copied ? 'کپی شد' : 'کپی لینک'}
            </Button>
            <Button
              size="sm"
              onClick={handleRenew}
              className="flex-1 min-w-[100px] gradient-primary hover:opacity-90"
            >
              <RefreshCw className="w-4 h-4 ml-2" />
              تمدید
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowDeleteConfirm(true)}
              className="flex-1 min-w-[100px]"
            >
              <Trash2 className="w-4 h-4 ml-2" />
              حذف
            </Button>
          </div>
        </CardContent>
      </Card>

      <QRCodeDialog
        open={showQR}
        onOpenChange={setShowQR}
        connectionLink={config.connectionLink}
        configName={config.name}
      />

      <DeleteConfirmDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        onConfirm={handleDelete}
        configName={config.name}
      />
    </>
  );
}

function InfoItem({ label, value, isCode }: { label: string; value: string; isCode?: boolean }) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`text-sm text-foreground ${isCode ? 'font-mono' : ''}`} dir={isCode ? 'ltr' : 'rtl'}>
        {value}
      </p>
    </div>
  );
}
