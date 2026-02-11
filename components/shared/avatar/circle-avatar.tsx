import { Avatar } from "@/components/retroui/Avatar";

export default function CircleAvatar({ name }: { name: string }) {
    return (
        <Avatar className="w-20 h-20">
            <Avatar.Image src={`https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=${name}`} alt={name} />
            <Avatar.Fallback>{name.slice(0, 2).toUpperCase()}</Avatar.Fallback>
        </Avatar>
    );
}

