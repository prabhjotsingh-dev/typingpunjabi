"use client";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/supabaseServices/AuthProvider";
import { useAllLessons } from "@/supabaseServices/fetchdata/useAllLessons";
import { Sidebar, SidebarProvider } from "@/components/sidebar/Sidebar";
import { Star } from "lucide-react";
import { Database } from "@/comman/database.types";

function Lesson() {
  const { user, loading } = useAuth();
  const [plan, setPlan] = useState<Database["public"]["Tables"]["lessons"]["Row"]["stage"]>("beginner");
  const {
    data: lessonsData,
    isLoading: isLessonsLoading,
    error: lessonsError,
  } = useAllLessons(!loading && !!user);

  function Categorylessons(array: Database["public"]["Tables"]["lessons"]["Row"][] | null) {
    let filteredrows = array
      ?.filter((obj) => obj.stage === plan)
      .map((obj) => obj.group);

    let output = filteredrows?.filter(
      (item, index) => filteredrows.indexOf(item) === index,
    );
    return output ?? [];
  }

  function handlePlanChange(value: string) {
    setPlan(value as Database["public"]["Tables"]["lessons"]["Row"]["stage"]);
  }

  return (
    <SidebarProvider>
      <main className="flex w-full min-h-[calc(100svh-4rem)] bg-background font-sans">
        <Sidebar selectedValue={plan} onValueChange={handlePlanChange} />

        <section className="flex flex-col flex-1 gap-6 p-6 w-full md:p-10 hide-scrollbar">
          {lessonsData && (
            <>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight capitalize md:text-4xl text-foreground">
                  {plan} Lessons
                </h1>
                <p className="mt-2 text-sm text-muted-foreground md:text-base">
                  Master your typing skills with these curated exercises.
                </p>
              </div>

              <div className="flex flex-col gap-10 w-full">
                {(Categorylessons(lessonsData) ?? []).map((groupName) => (
                  <div
                    key={groupName}
                    className="flex flex-col space-y-4 w-full"
                  >
                    <h2 className="ml-2 w-full text-xl font-semibold tracking-tight capitalize text-foreground">
                      {groupName}
                    </h2>

                    <div className="bg-card border border-border shadow-sm rounded-[1.5rem] p-2.5 space-y-2">
                      {lessonsData
                        .filter(
                          (item) =>
                            item.stage === plan && item.group === groupName,
                        )
                        .map((lesson) => {
                          const stars = lesson.lesson_progress?.[0]?.stars ?? 0;
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
                                        : "fill-transparent text-muted"
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
      </main>
    </SidebarProvider>
  );
}

export default Lesson;
