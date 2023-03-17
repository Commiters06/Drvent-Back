import { notFoundError } from "@/errors";
import localsRepository from "@/repositories/locals-repository";

async function listLocals() {
  const locals = await localsRepository.getAllLocals()

  if(locals.length === 0) throw notFoundError()

  return locals
}

export default {
  listLocals
};
