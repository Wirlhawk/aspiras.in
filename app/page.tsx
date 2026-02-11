import { Button } from "@/components/retroui/Button";
import { db } from "@/lib/db";
import { aspirationCategories } from "@/lib/db/schema";

export default async function Home() {
  const categories = await db.query.schoolClasses.findMany();
  return (
    <div className="p-3">
      {categories.map((category) => (
        <div key={category.id}>{category.name}</div>
      ))}
      <Button variant="default">B shadcneraq</Button>
    </div>
  );
}
