import type { CourseDetailsData } from "@/types/content";

export function LessonList({ items, more }: CourseDetailsData["lessons"]) {
  return (
    <div className="flex flex-col gap-3 text-base">
      <ol className="flex flex-col gap-3">
        {items.map((lesson, i) => (
          <li key={lesson.title} className="flex items-start justify-between gap-6">
            <span className="flex gap-2 leading-[1.2] font-medium text-shuttle-gray-950">
              <span className="w-6 shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <span className="max-w-[198px]">{lesson.title}</span>
            </span>
            <span className="shrink-0 leading-[1.6] whitespace-nowrap text-primary">
              {lesson.duration}
            </span>
          </li>
        ))}
      </ol>
      <p className="leading-[1.6] text-shuttle-gray-700">{more}</p>
    </div>
  );
}
