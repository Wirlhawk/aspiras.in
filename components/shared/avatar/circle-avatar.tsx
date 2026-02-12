import { Avatar } from "@/components/retroui/Avatar";

export default function CircleAvatar({ name, size }: { name: string, size?: number }) {
    return (
        <Avatar className={`w-${size || 20} h-${size || 20}`}>
            <Avatar.Image src={`https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=${name}`} alt={name} />
            <Avatar.Fallback>{name.slice(0, 2).toUpperCase()}</Avatar.Fallback>
        </Avatar>
    );
}

