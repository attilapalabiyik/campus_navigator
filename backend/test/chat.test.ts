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
    expect(prompt).toContain('User Query: "What events are happening in room 101?"');
  });

  it("should return a prompt indicating no query was provided when user message is empty", () => {
    const userMessage = "";
    const prompt = generate_prompt(userMessage, mockBuildings);

    // Ensure the correct message is returned when the user query is empty
    expect(prompt).toContain("No user query provided");
  });

  it("should return a prompt with an error message if no building data is provided", () => {
    const userMessage = "What events are happening in room 101?";
    const prompt = generate_prompt(userMessage, []); // Empty buildings array

    // Error when no buildings data is available
    expect(prompt).toContain("No buildings data available");
  });

  it("should generate a prompt indicating no events when the room has no events", () => {
    const userMessage = "What events are happening in room 102?"; // Room 102 has no events
    const buildingsWithoutEvents = [
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
                name: "102",
                attributes: ["Projector", "Whiteboard"],
                events: [], // No events in room 102
              },
            ],
          },
        ],
      },
    ];
    const prompt = generate_prompt(userMessage, buildingsWithoutEvents);

    
    expect(prompt).toContain("No events scheduled");
  });

  it("should return a prompt indicating the room was not found if the room name does not exist", () => {
    const userMessage = "What events are happening in room E99?"; // Room E99 doesn't exist
    const prompt = generate_prompt(userMessage, mockBuildings);

    // Room not found error
    expect(prompt).toContain("Room not found");
  });

  it("should return an error message if the message format is invalid (e.g., non-string input)", () => {
    const userMessage = 12345 as any; // Simulating an invalid message format (non-string)
    const prompt = generate_prompt(userMessage, mockBuildings);

    // Error when invalid message format is provided
    expect(prompt).toContain("Invalid message format");
  });
});
