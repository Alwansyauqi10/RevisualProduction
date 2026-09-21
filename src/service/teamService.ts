export interface TeamMember {
  name: {
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}

export const getTeamsService = async (): Promise<TeamMember[]> => {
  const response = await fetch(
    "https://randomuser.me/api/?results=6&inc=name,email,picture"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch team members");
  }

  const data = await response.json();

  return data.results;
};