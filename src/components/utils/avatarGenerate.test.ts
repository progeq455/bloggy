import { generateAvatar } from "./avatarGenerate"

test("Avatar Generate function working correctly", () => {
    expect(generateAvatar(0)).toBe("linear-gradient(180deg, #31C48D 0%, #84E1BC 100%)");
    expect(generateAvatar(1)).toBe("#66B2FF");
    expect(generateAvatar(2)).toBe("#FFB266");
    expect(generateAvatar(3)).toBe("#FF66B2");
    expect(generateAvatar(4)).toBe("#FFFF66");
});