import { ConfigData, RenewalPlan } from "@/types/config";

export const sampleConfigs: ConfigData[] = [
  {
    id: "1",
    name: "کانفیگ اصلی",
    serviceCode: "q5nwlrgw1t",
    remainingVolume: "15.2 GB",
    remainingDays: 23,
    purchaseDate: "1402/09/15",
    expiryDate: "1402/10/15",
    status: "active",
    protocol: "vless + tcp",
    connectionLink: "vless://a1b2c3d4-e5f6-7890-abcd-ef1234567890@server.example.com:443?encryption=none&security=tls&type=tcp#Config-Main"
  },
  {
    id: "2",
    name: "کانفیگ پشتیبان",
    serviceCode: "m8kplxyz2w",
    remainingVolume: "8.5 GB",
    remainingDays: 12,
    purchaseDate: "1402/09/01",
    expiryDate: "1402/10/01",
    status: "active",
    protocol: "vmess + ws",
    connectionLink: "vmess://eyJhZGQiOiJzZXJ2ZXIuZXhhbXBsZS5jb20iLCJwb3J0IjoiNDQzIiwidHlwZSI6Im5vbmUifQ=="
  },
  {
    id: "3",
    name: "کانفیگ تست",
    serviceCode: "jh7rtqwe9p",
    remainingVolume: "0 GB",
    remainingDays: 0,
    purchaseDate: "1402/08/10",
    expiryDate: "1402/09/10",
    status: "inactive",
    protocol: "trojan + grpc",
    connectionLink: "trojan://password123@server.example.com:443?security=tls&type=grpc#Config-Test"
  },
  {
    id: "4",
    name: "کانفیگ ویژه",
    serviceCode: "zx9cvbnm3k",
    remainingVolume: "45.8 GB",
    remainingDays: 58,
    purchaseDate: "1402/09/20",
    expiryDate: "1402/11/20",
    status: "active",
    protocol: "vless + grpc",
    connectionLink: "vless://b2c3d4e5-f6a7-8901-bcde-f23456789012@premium.example.com:443?encryption=none&security=tls&type=grpc#Config-Premium"
  }
];

export const renewalPlans: RenewalPlan[] = [
  {
    id: "1month",
    name: "پلن ۱ ماهه",
    duration: "۱ ماه",
    price: "۵۰,۰۰۰ تومان",
    volume: "30 GB"
  },
  {
    id: "3month",
    name: "پلن ۳ ماهه",
    duration: "۳ ماه",
    price: "۱۳۰,۰۰۰ تومان",
    volume: "100 GB"
  },
  {
    id: "6month",
    name: "پلن ۶ ماهه",
    duration: "۶ ماه",
    price: "۲۴۰,۰۰۰ تومان",
    volume: "200 GB"
  },
  {
    id: "12month",
    name: "پلن ۱ ساله",
    duration: "۱۲ ماه",
    price: "۴۵۰,۰۰۰ تومان",
    volume: "500 GB"
  }
];
