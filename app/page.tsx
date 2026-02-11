"use client"
import { Button } from "@/components/retroui/Button";
import { toast } from "sonner";

export default function Home() {


  const onClick = () => {
    toast.success("Congrats man 🎉 (Plain)");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button onClick={onClick}>Congratulate Me</Button>;

    </div>
  );
}
