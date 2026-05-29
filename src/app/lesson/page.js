"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/supabaseServices/AuthProvider";
import {
  Sidebar,
  SidebarProvider,
} from "@/components/sidebar/Sidebar";

function Lesson() {
  const { user, loading } = useAuth();
  const [lessonsData, setLessonsData] = useState(null);
  const [plan, setPlan] = useState("beginner");

  useEffect(() => {
    if (loading || !user) return;

    async function fechdata() {
      try {
        const res = await fetch("/api/all");
        const result = await res.json();
        if (result && result.data) {
          setLessonsData(result.data);
        } else {
          console.error("Failed to load lessons:", result);
          setLessonsData([]);
        }
      } catch (err) {
        console.error("Error fetching lessons:", err);
        setLessonsData([]);
      }
    }
    fechdata();
  }, [loading, user]);

  function Categorylessons(array) {
    let filteredrows = array
      ?.filter((obj) => obj.stage === plan)
      .map((obj) => obj.group);

    let output = filteredrows?.filter(
      (item, index) => filteredrows.indexOf(item) === index
    );
    return output ?? [];
  }

  function handlePlanChange(value) {
    setPlan(value);
  }

  return (
    <SidebarProvider>
      <main className="flex w-full min-h-[calc(100vh-4rem)]">
        <Sidebar selectedValue={plan} onValueChange={handlePlanChange} />

        <section className="flex overflow-y-auto flex-col flex-1 p-4 md:p-6 hide-scrollbar">
          <div className="mx-auto space-y-6 w-full max-w-4xl">
            {!lessonsData ? (
              <>
                <div className="animate-pulse">
                  <div className="mb-4 w-48 h-8 rounded-lg bg-glass-bg/80"></div>
                  <div className="p-4 space-y-3 rounded-2xl border backdrop-blur-sm bg-glass-bg/80 border-glass-border">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="h-16 rounded-xl animate-pulse bg-glass-hover"
                        style={{ animationDelay: `${i * 100}ms` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              (Categorylessons(lessonsData) ?? []).map((group) => (
                <div key={group}>
                  <h2 className="px-1 mb-3 text-lg font-semibold text-text">
                    {group} Lessons
                  </h2>
                  <div className="overflow-hidden rounded-2xl border-2 border-black backdrop-blur-sm bg-slate-300">
                    <div className="divide-y divide-glass-border/50">
                      {lessonsData
                        .filter(
                          (item) => item.stage === plan && item.group === group
                        )
                        .map((lesson) => {
                          const stars = lesson.lesson_progress?.[0]?.stars ?? 0;
                          return (
                            <Link
                              key={lesson.id}
                              href={`/lesson/${lesson.id}`}
                              className={`flex items-center justify-between p-4 transition-all duration-200 hover:bg-glass-hover group ${
                                stars > 0
                                  ? "bg-success/5"
                                  : "bg-slate-200"
                              }`}
                            >
                              <div className="flex gap-3 items-center">
                                <div
                                  className={`w-2 h-2 border-2 border-black rounded-full ${
                                    stars > 0
                                      ? "bg-success"
                                      : "bg-text-muted/30"
                                  }`}
                                ></div>
                                <p className="text-base font-medium transition-colors text-text group-hover:text-primary-dark">
                                  {lesson.title}
                                </p>
                              </div>
                              <div className="flex gap-1 items-center">
                                {[1, 2, 3].map((star) => (
                                  <span
                                    key={star}
                                    className={`text-xl transition-transform group-hover:scale-110 ${
                                      stars >= star
                                        ? "text-warning"
                                        : "text-text-muted/30"
                                    }`}
                                  >
                                    {stars >= star ? "\u2605" : "\u2606"}
                                  </span>
                                ))}
                              </div>
                            </Link>
                          );
                        })}
                    </div>
                  </div>
                </div>
              ))
            )}

            {lessonsData && Categorylessons(lessonsData).length === 0 && (
              <div className="py-12 text-center">
                <p className="text-text-muted">
                  No lessons available for this category yet.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </SidebarProvider>
  );
}

export default Lesson;
