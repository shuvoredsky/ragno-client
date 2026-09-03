export interface BusinessHoursProps {
  weekdayHours?: string;
  saturdayHours?: string;
  sundayHours?: string;
}

export function BusinessHoursCard({
  weekdayHours = "9:00 AM – 6:00 PM",
  saturdayHours = "10:00 AM – 4:00 PM",
  sundayHours = "Closed",
}: BusinessHoursProps) {
  const schedule = [
    { day: "Monday – Friday", hours: weekdayHours },
    { day: "Saturday", hours: saturdayHours },
    { day: "Sunday", hours: sundayHours },
  ];

  return (
    <div className="rounded-2xl sm:rounded-3xl bg-zinc-950/70 border border-white/10 p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
        Hours
      </h3>

      <div className="space-y-3.5 text-xs sm:text-sm divide-y divide-white/10">
        {schedule.map((item, idx) => (
          <div
            key={item.day}
            className="flex items-center justify-between pt-3 first:pt-0"
          >
            <span className="text-zinc-400 font-medium">{item.day}</span>
            <span
              className={`font-semibold ${
                item.hours === "Closed" ? "text-zinc-500" : "text-white"
              }`}
            >
              {item.hours}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
