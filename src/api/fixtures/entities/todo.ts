import { faker } from "@faker-js/faker";

import { type Todo } from "#slices/todos/types";

import { getPaginatedTestFixture, getTestFixture, RANDOM_DATA_SEED } from "../utilities";

faker.seed(RANDOM_DATA_SEED);

const createTodoFixture = (todo: Partial<Todo> = {}): Todo => ({
  createdAt: faker.date.recent({ days: 40 }).toISOString(),
  completedAt: faker.helpers.weightedArrayElement([
    { value: null, weight: 1 },
    {
      value: faker.date.recent({ days: 10 }).toISOString(),
      weight: 1,
    },
  ]),
  dueDate: faker.helpers.weightedArrayElement([
    { value: null, weight: 1 },
    {
      value: faker.helpers.arrayElement([
        faker.date.soon({ days: 20 }).toISOString(),
        faker.date.recent({ days: 10 }).toISOString(),
      ]),
      weight: 2,
    },
  ]),
  id: faker.string.uuid(),
  title: faker.lorem.words({ min: 2, max: 4 }),
  ...todo,
});

export const todoList: Todo[] = [...Array(15).keys()].map(() => createTodoFixture());

export const todoFixtureAll = getTestFixture(todoList, "id");

export const todoFixturePaginated = getPaginatedTestFixture(todoList, "id");
