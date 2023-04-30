import { Meal } from "@prisma/client";
import { MealSectionSkelton } from "./components/meal-section";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4">
      {Object.values(Meal).map((meal) => (
        <MealSectionSkelton key={meal} meal={meal} />
      ))}
    </div>
  );
}
