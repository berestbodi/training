import { Container } from "inversify";
import { PostStore } from "./store/postStore";
import { TYPES } from "./types/types";

const container = new Container();

container.bind<PostStore>(TYPES.PostStore).to(PostStore).inSingletonScope();

export { container };

export function useService<T>(identifier: symbol): T {
  return container.get<T>(identifier);
}
