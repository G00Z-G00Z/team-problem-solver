import { DataBaseHandler, Member, Team } from "../types/interfaces";
import faker from "faker";
/**
 * Random hex color
 * @returns string
 * @reference https://css-tricks.com/snippets/javascript/random-hex-color/
 */
function randomHexColor() {
	return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

/**
 * Creates a fake member
 * @returns Member
 */
function createRandomPerson(): Member {
	const name = faker.name.firstName(),
		color = randomHexColor(),
		profileSeed = name + color;
	return {
		name,
		color,
		profileSeed,
	};
}
/**
 * creates a fake team with no id
 * @param people Number
 * @returns Team
 */
function createRandomTeam(people: number): Team {
	const members = Array.from(new Array(people), createRandomPerson),
		name = faker.internet.domainWord(),
		color = randomHexColor();

	return {
		name,
		color,
		members,
	};
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
function getRandomInt(min: number, max: number): number {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Creates a mock databse, that erases the previous one
 * @param db DatabaseHandler
 * @param options options for seeds
 */
export async function createTeamSeeds(
	db: DataBaseHandler,
	options: {
		teams: number;
		maxPersonsPerTeam: number;
	}
) {
	await db.deleteAllTeams();

	const { teams: numberOfTeams = 10, maxPersonsPerTeam = 3 } = options;

	const getRandomNumberInRange = () => getRandomInt(1, maxPersonsPerTeam);

	const teams = Array.from(new Array(numberOfTeams), async () => {
		const team = createRandomTeam(getRandomNumberInRange());
		await db.createTeam(team);
	});

	await Promise.all(teams);
}
