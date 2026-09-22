export interface TeamMember {
  name: {
    first: string;
    last: string;
  };

  email: string;

  picture: {
    large: string;
  };

  role: string;
  bio: string;
}

const profiles = [
  {
    role: "Creative Director",
    bio: "Develops visual concepts and guides every production with a strong creative direction.",
  },
  {
    role: "Photographer",
    bio: "Captures authentic expressions, candid moments, and details that make every story memorable.",
  },
  {
    role: "Videographer",
    bio: "Turns meaningful moments into dynamic visual stories through cinematic storytelling.",
  },
  {
    role: "Event Producer",
    bio: "Coordinates production needs and makes sure every part of an event runs smoothly.",
  },
  {
    role: "Editor",
    bio: "Transforms raw photos and footage into polished visual stories with a consistent visual style.",
  },
  {
    role: "Creative Producer",
    bio: "Turns creative ideas into practical concepts and brings them to life through production.",
  },
];

export const getTeamsService = async (): Promise<TeamMember[]> => {
  const response = await fetch(
    "https://randomuser.me/api/?results=6&inc=name,email,picture"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch team members");
  }

  const data = await response.json();

  return data.results.map((member: any, index: number) => ({
    ...member,
    role: profiles[index].role,
    bio: profiles[index].bio,
  }));
};