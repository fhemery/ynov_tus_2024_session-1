import { BirthdayNotebook } from "./birthdays";

describe("birthdays", function () {
  let notebook: BirthdayNotebook;

  beforeEach(() => {
    notebook = new BirthdayNotebook();
  });

  it("should return empty array when no birthday is set", () => {
    expect(notebook.getBirthdays(new Date())).toHaveLength(0);
  });

  it('should return empty array if there is no birthday for this date', () => {
    notebook.addBirthday('John', new Date(2020, 0, 1));
    expect(notebook.getBirthdays(new Date(2020, 0, 2))).toHaveLength(0);
  });

  it('should return one record if there is one birthday for this date', () => {
    // ARRANGE
    let name = 'John';
    let birthDate = new Date(2020, 0, 1);
    notebook.addBirthday(name, birthDate);

    // ACT
    let birthdays = notebook.getBirthdays(birthDate);

    // ASSERT
    expect(birthdays).toHaveLength(1);
    expect(birthdays).toContain(name);
  });

  it('should return two records if there are birthdays for this date', () => {
    let john = 'John';
    const johnBirthDate = new Date(2020, 0, 1);
    notebook.addBirthday(john, johnBirthDate);

    let alice = 'Alice'
    const aliceBirthDate = new Date(2018, 0, 1);
    notebook.addBirthday(alice, aliceBirthDate);

    let birthdays = notebook.getBirthdays(new Date(2020, 0, 1));
    expect(birthdays).toHaveLength(2);

    // White box
    expect(birthdays[0]).toBe(john);
    expect(birthdays[1]).toBe(alice);

    // Black box
    expect(birthdays).toContain(john);
    expect(birthdays).toContain(alice);
  });
});
