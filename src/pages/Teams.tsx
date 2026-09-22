import { useEffect, useState } from "react";
import {
  getTeamsService,
  type TeamMember,
} from "../service/teamService";

function Teams() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTeamMembers = async () => {
      try {
        const data = await getTeamsService();

        console.log("TEAM MEMBERS:", data);

        setTeamMembers(data);
      } catch (error) {
        console.error("GAGAL MENGAMBIL TEAM:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getTeamMembers();
  }, []);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F5F7FA] text-[#071A33]">
        Loading...
      </main>
    );
  }

  return (
    <main className="bg-[#F5F7FA] text-[#071A33]">
      <section className="min-h-screen px-6 py-16 lg:py-32">
        <div className="mx-auto max-w-7xl pt-16">
          {/* Header */}
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#071A33]/45">
              Revisual Production
            </p>
            <h1 className="font-display mt-4 text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              THE TEAM.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#071A33]/55 sm:text-lg">
              A group of creative minds working together to turn ideas,
              productions, and moments into visual stories.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <article key={member.email}>
                <div className="aspect-[4/5] overflow-hidden rounded-4xl bg-[#E8F1F8]">
                  <img
                    src={member.picture.large}
                    alt={`${member.name.first} ${member.name.last}`}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>

                <div className="mt-5">
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#071A33]/40">
                    Revisual Production
                  </p>
                  <h2 className="font-display mt-2 text-2xl font-semibold tracking-tight">
                    {member.name.first} {member.name.last}
                  </h2>
                  <p className="mt-2 text-sm font-medium text-[#071A33]/60">
                    {member.role}
                  </p>
                  <p className="mt-4 max-w-md text-sm leading-6 text-[#071A33]/55">
                    {member.bio}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Teams;