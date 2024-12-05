import { generate_prompt } from "../src/chat";
import { Building } from "../../models/Building";

describe("Chat Functionality", () => {
  const mockBuildings: Building[] = [
    {
      id: "building-1",
      name: "Engineering Building",
      address: "123 Campus Rd",
      location: { lat: 42.391, lng: -72.528 },
      floors: [
        {
          name: "First Floor",
          rooms: [
            {
              name: "101",
              attributes: ["Projector", "Whiteboard"],
              events: [
                {
                  title: "Math Lecture",
                  start: new Date("2024-12-03T10:00:00Z"),
                  end: new Date("2024-12-03T12:00:00Z"),
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  it("should generate a valid prompt with building data", () => {
    const userMessage = "What events are happening in room 101?";
    const prompt = generate_prompt(userMessage, mockBuildings);

    expect(prompt).toContain("Engineering Building");
    expect(prompt).toContain("Math Lecture");
    expect(prompt).toContain("Projector");
    expect(prompt).toContain(
      'User Query: "What events are happening in room 101?"'
    );
  });
});
