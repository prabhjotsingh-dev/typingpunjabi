"use client";
import Link from "next/link";
import { LessonData, Stage } from "@/comman/types";
import { Star } from "lucide-react";
import { GetStart } from "@/comman/utils";

export default function LessonsPageUI({ lessonsData, stage }: { lessonsData: LessonData[], stage: Stage }) {
  function getLessonsByStage():LessonData[] {
    if (!lessonsData) return [];
    
    const stageLessons = lessonsData
    .filter((obj) => obj.stage === stage)
    .sort((a, b) => a.sequence_number - b.sequence_number);
    return stageLessons; 
  };
  const getLessonsByGroup = (lessons : LessonData[], group : string):LessonData[] => {
    if (!lessons || !group) return [];
    return lessons.filter((lesson) => lesson.group === group);
  }
  const uniqueGroups = lessonsData && [...new Set(getLessonsByStage().map((item) => item.group))];
 

  return (
    <section className="flex flex-col gap-6 p-6 w-full md:p-10">
          {lessonsData && (
            <>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight capitalize md:text-4xl text-foreground">
                  {stage} Lessons
                </h1>
                <p className="mt-2 text-sm text-muted-foreground md:text-base">
                  Master your typing skills with these curated exercises.
                </p>
              </div>

              <div className="flex flex-col gap-10 w-full">
                {uniqueGroups?.map((groupName) => (
                  <div
                    key={groupName}
                    className="flex flex-col space-y-4 w-full"
                  >
                    <h2 className="ml-2 w-full text-xl font-semibold tracking-tight capitalize text-foreground">
                      {groupName}
                    </h2>

                    <div className="bg-card border border-border shadow-sm rounded-[1.5rem] p-2.5 space-y-2">
                      {getLessonsByGroup(getLessonsByStage(), groupName)
                        .map((lesson) => {
                          const stars = GetStart(lesson.highest_accuracy);
                          const isCompleted = stars > 0;

                          return (
                            <Link
                              key={lesson.id}
                              href={`/lesson/${lesson.id}`}
                              className={`
                                flex items-center justify-between px-6 h-[72px] rounded-xl border transition-all duration-200 group
                                ${
                                  isCompleted
                                    ? "bg-success/5 border-success/20 hover:bg-success/10 hover:border-success/40 hover:shadow-sm"
                                    : "bg-background border-border/40 hover:bg-card hover:border-border hover:shadow-sm"
                                }
                              `}
                            >
                              <p
                                className={`text-base font-medium transition-colors ${isCompleted ? "text-success" : "text-foreground"} group-hover:text-primary`}
                              >
                                {lesson.title}
                              </p>

                              <div className="flex gap-1.5 items-center">
                                {[1, 2, 3].map((starIndex) => (
                                  <Star
                                    key={starIndex}
                                    className={`w-5 h-5 transition-all duration-300 ${
                                      stars >= starIndex
                                        ? "fill-warning text-warning scale-[1.15]"
                                        : "fill-transparent text-black"
                                    }`}
                                    strokeWidth={stars >= starIndex ? 0 : 2}
                                  />
                                ))}
                              </div>
                            </Link>
                          );
                        })}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
    </section>
  );
}
